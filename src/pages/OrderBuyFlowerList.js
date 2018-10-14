import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { orderSellFlowerList as styles } from "./styles";
import { DataView, Page, Icon, Button } from "components";
import { getOrderBuyFlowerList } from "actions";
import { iconSource } from "commons";
import { getorderBuyFlowerInfo } from "apis";
import { navigate } from "actions";

const tabs = [
    { label: "全部", value: "all" },
    { label: "匹配中", value: "0" },
    { label: "代付款", value: "1" },
    { label: "待确认", value: "2" },
    { label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];

@connect(({ data, loading }) => ({
    orderBuyFlowerList: data.orderBuyFlowerList,
    loading
}))
export default class OrderBuyFlowerList extends PureComponent {
    static propTypes = {
        orderBuyFlowerList: PropTypes.object,
        loading: PropTypes.object
    };
    getLabelByValue(value) {
        const label = "";
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].value === value) {
                return tabs[i].label;
            }
        }
        return label;
    }
    renderItem = ({ item: { state, name, money, number, date, percent } }) => {
        return (
            <Button
                style={styles.item}
                onPress={() => {
                    getorderBuyFlowerInfo({ number, state }).then(res => {
                        navigate({ routeName: "BuyOrderDetail", params: res });
                    });
                }}
            >
                <Icon source={iconSource.mudan} style={styles.icon} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>
                            {name}|{money}
                        </Text>
                        <Text style={styles.stateText}>
                            {this.getLabelByValue(state)}
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            采收编号:
                            {number}
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            拍单时间
                            {date}
                        </Text>
                        <Text style={styles.text}>
                            {percent}
                            %成长值
                        </Text>
                    </View>
                </View>
            </Button>
        );
    };
    render() {
        const { orderBuyFlowerList = { list: [] }, loading } = this.props;
        return (
            <Page title="购买订单">
                <View style={styles.container}>
                    <ScrollableTabView
                        tabBarActiveTextColor="#FD4C73"
                        tabBarInactiveTextColor="#7B7B7B"
                        tabBarTextStyle={{ fontSize: 13 }}
                        tabBarUnderlineStyle={{
                            height: 1,
                            backgroundColor: "#FD4C73"
                        }}
                    >
                        {tabs.map(({ label, value }) => {
                            const data = orderBuyFlowerList.list.filter(
                                ({ state }) =>
                                    value === state || value === "all"
                            );
                            return (
                                <DataView
                                    key={label}
                                    tabLabel={label + data.length}
                                    getData={getOrderBuyFlowerList}
                                    injectData={true}
                                    dataSource={data}
                                    renderItem={this.renderItem}
                                    refreshing={
                                        loading.data.orderBuyFlowerList.loading
                                    }
                                    isPulldownLoadMore={false}
                                />
                            );
                        })}
                    </ScrollableTabView>
                </View>
            </Page>
        );
    }
}
