import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { home as styles } from "./styles";
import { DataView, Icon, Text, Button, Page } from "components";
import { iconSource, Tip } from "commons";
import { navigate, getHome } from "actions";

@connect(({ data, loading }) => {
    return { home: data.home, loading };
})
export default class ChooseBuyFlower extends PureComponent {
    static propTypes = {
        home: PropTypes.object,
        loading: PropTypes.object
    };

    renderItem = ({ item }) => {
        const { percent, money, state, name, type } = item;
        return (
            <View style={styles.item}>
                <Icon source={iconSource[type]} size={68} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>{name}</Text>
                        <Button
                            style={styles.buyButton}
                            disabled={!state}
                            disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                            disabledTextStyle={{ color: "#999" }}
                            textStyle={styles.buyButtonText}
                            onPress={() => {
                                console.log(this.state);
                                if (this.props.home.bankstate !== "1") {
                                    Tip.fail("请先认证银行卡信息");
                                    navigate({
                                        routeName: "AccountInfo"
                                    });
                                } else {
                                    navigate({
                                        routeName: "Buy",
                                        params: item
                                    });
                                }
                            }}
                        >
                            {state ? "申请种植" : "不可采收"}
                        </Button>
                    </View>
                    <View style={styles.itemCenter}>
                        <Text style={styles.itemTitleText}>{money}</Text>
                    </View>
                    <Text style={styles.itemDetail}>
                        预计每个生长周期收入
                        {percent}
                    </Text>
                </View>
            </View>
        );
    };
    render() {
        const { home = {} } = this.props;
        const { buylist = [] } = home;
        return (
            <Page title="选择购买的花卉">
                <View style={styles.store}>
                    <View style={styles.storeHeader}>
                        <View style={styles.storeTitle}>
                            <Text style={styles.storeTitleText}>购买花卉</Text>
                        </View>
                        <Text style={styles.countDownText}>
                            终止倒计时：
                            <Text style={{ color: "#fa4f75" }}>
                                {home.date_end}
                            </Text>{" "}
                        </Text>
                    </View>
                    <DataView
                        injectData={true}
                        dataSource={buylist}
                        refreshing={false}
                        isLoadingMore={false}
                        getData={getHome}
                        isPulldownLoadMore={false}
                        renderItem={this.renderItem}
                    />
                </View>
            </Page>
        );
    }
}
