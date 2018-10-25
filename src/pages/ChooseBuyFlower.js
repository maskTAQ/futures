import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { home as styles } from "./styles";
import { DataView, Icon, Text, Button, Page } from "components";
import { iconSource, Tip, scale } from "commons";
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
        const { money, state, name, type } = item;
        return (
            <View
                style={[
                    styles.item,
                    { paddingLeft: scale(8), paddingRight: scale(8) }
                ]}
            >
                <Icon source={iconSource[type]} size={68} />
                <View style={styles.itemBox}>
                    <Text style={styles.itemTitleText}>{name}</Text>
                    <Text style={styles.itemTitleText}>{money}</Text>
                    <Button
                        style={styles.buyButton}
                        disabled={!state}
                        disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                        disabledTextStyle={{ color: "#999" }}
                        textStyle={styles.buyButtonText}
                        onPress={() => {
                            if (this.props.home.bankstate !== "1") {
                                Tip.fail("收款信息未认证,请先认证收款信息");
                                setTimeout(() => {
                                    navigate({
                                        routeName: "AccountInfo"
                                    });
                                }, 1000);
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
                            周期剩余时间：
                            <Text style={{ color: "#fa4f75" }}>
                                {home.date_end}
                            </Text>
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
