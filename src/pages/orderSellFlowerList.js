import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { orderSellFlowerList as styles } from "./styles";
import { DataView, Page, Icon, Button } from "components";
import { getOrderSellFlowerList, navigate } from "actions";
import { iconSource } from "commons";
import { getorderSellFlowerInfo } from "apis";
import ScrollableTabView from "react-native-scrollable-tab-view";

const tabs = [
    { label: "全部", value: "all" },
    { label: "匹配中", value: "0" },
    { label: "待付款", value: "1" },
    { label: "待确认", value: "2" },
    //{ label: '成长值', value: '3' },
    { label: "已完成", value: "4" }
];
const iconMap = {
    0: iconSource.flower,
    1: iconSource.jingtai,
    2: iconSource.dongtai
};
@connect(({ data, loading }) => ({
    orderSellFlowerList: data.orderSellFlowerList,
    loading
}))
export default class OrderSellFlowerList extends PureComponent {
    static propTypes = {
        orderSellFlowerList: PropTypes.object,
        loading: PropTypes.object
    };
    UNSAFE_componentWillMount() {
        if (!this.props.orderSellFlowerList) {
            getOrderSellFlowerList();
        }
    }
    getLabelByValue(value) {
        const label = "";
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].value === value) {
                return tabs[i].label;
            }
        }
        return label;
    }
    renderItem = ({ item: { state, name, money, number, date, type } }) => {
        return (
            <Button
                style={styles.item}
                onPress={() => {
                    getorderSellFlowerInfo({ number }).then(res => {
                        navigate({
                            routeName: "SellOrderDetail",
                            params: { ...res, icon: iconMap[type] }
                        });
                    });
                }}
            >
                <Icon source={iconMap[type]} size={60} />
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
                    </View>
                </View>
            </Button>
        );
    };
    render() {
        const { orderSellFlowerList = { list: [] }, loading } = this.props;
        return (
            <Page title="出售订单">
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
                            const data = (
                                orderSellFlowerList.list || []
                            ).filter(
                                ({ state }) =>
                                    value === state || value === "all"
                            );
                            return (
                                <DataView
                                    key={label}
                                    tabLabel={label + data.length}
                                    getData={getOrderSellFlowerList}
                                    injectData={true}
                                    dataSource={data}
                                    renderItem={this.renderItem}
                                    refreshing={
                                        loading.data.orderSellFlowerList.loading
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
