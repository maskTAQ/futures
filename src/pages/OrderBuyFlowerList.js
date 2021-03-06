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
    { label: "待付款", value: "1" },
    { label: "待确认", value: "2" },
    //{ label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];
const allTabs = [
    { label: "全部", value: "all" },
    { label: "匹配中", value: "0" },
    { label: "待付款", value: "1" },
    { label: "待确认", value: "2" },
    { label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];

@connect(({ data, loading, nav }) => ({
    orderBuyFlowerList: data.orderBuyFlowerList,
    loading,
    nav
}))
export default class OrderBuyFlowerList extends PureComponent {
    static propTypes = {
        orderBuyFlowerList: PropTypes.object,
        loading: PropTypes.object,
        nav: PropTypes.object
    };
    UNSAFE_componentWillMount() {
        getOrderBuyFlowerList();
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     const {index,routes} = this.props.nav;
    //     const {index:nextIndex,routes:nextRoutes} = nextProps.nav;
    //     console.log(routes.length,routes[index].routeName ,nextRoutes[nextIndex].routeName)
    //     if(routes[index].routeName !== nextRoutes[nextIndex].routeName && nextRoutes[nextIndex].routeName === 'OrderBuyFlowerList'){

    //         console.log('更新列表')
    //     }
    // }
    // componentWillUnmount(){
    //     console.log('卸载')
    // }
    getLabelByValue(value) {
        const label = "";
        for (let i = 0; i < allTabs.length; i++) {
            if (allTabs[i].value === value) {
                return allTabs[i].label;
            }
        }
        return label;
    }
    renderItem = ({
        item: { state, name, or_money, number, or_number, date, percent, type }
    }) => {
        return (
            <Button
                style={styles.item}
                onPress={() => {
                    getorderBuyFlowerInfo({ number: or_number, state }).then(
                        res => {
                            navigate({
                                routeName: "BuyOrderDetail",
                                params: res
                            });
                        }
                    );
                }}
            >
                <Icon source={iconSource[type]} style={styles.icon} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>
                            {name} {or_money}
                        </Text>
                        <Text style={styles.stateText}>
                            {this.getLabelByValue(state)}
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            订单编号:
                            {number}
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            申请时间
                            {date}
                        </Text>
                        <Text style={styles.text}>
                            {percent}
                            成长值
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
                            const data = (orderBuyFlowerList.list || []).filter(
                                ({ state }) => {
                                    if (value === "4") {
                                        return state === "3" || state === "4";
                                    } else {
                                        return (
                                            value === state || value === "all"
                                        );
                                    }
                                }
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
