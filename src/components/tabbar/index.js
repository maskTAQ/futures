import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    Image,
    TouchableWithoutFeedback,
    StatusBar
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import styles from "./style";
import { Button, Icon } from "components";
import { Tip } from "commons";

const publishIcon = require("./img/publish.png");
const activePublishIcon = require("./img/active_publish.png");
const rect = require("./img/rect.png");
const list = [
    {
        icon: require("./img/flower.png"),
        label: "申请种植",
        routeName: "ChooseBuyFlower"
    },
    {
        icon: require("./img/repo.png"),
        label: "静态出售",
        routeName: "SellRedPacket",
        params: {
            type: "dongtai",
            title: "出售静态红包",
            hint: ["规则：200元起200的倍数"],
            typeValue: 1
        }
    },
    {
        icon: require("./img/money.png"),
        label: "动态出售",
        routeName: "SellRedPacket",
        params: {
            type: "jingtai",
            typeValue: 2,
            title: "出售动态红包",
            hint: ["规则：500元起500的倍数"]
        }
    }
    // {
    //     icon: require("./img/repeat.png"),
    //     label: "订单复购",
    //     routeName: "Buy",
    //     params: {
    //         money: "2000",
    //         name: "桔柑花",
    //         percent: "20",
    //         queuing_money: "2",
    //         state: "0",
    //         type: "1"
    //     }
    // }
];

@connect(({ data }) => {
    return { home: data.home };
})
export default class Tabbar extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        jumpTo: PropTypes.func,
        activeTintColor: PropTypes.string,
        inactiveTintColor: PropTypes.string,
        renderIcon: PropTypes.func,
        getLabelText: PropTypes.func,
        dispatch: PropTypes.func,
        home: PropTypes.object
    };
    state = {
        isModalVisible: false
    };
    requestModalClose = () => {
        this.setState({
            isModalVisible: false
        });
    };
    renderItem = (route, index) => {
        const {
            navigation,
            jumpTo,
            activeTintColor,
            inactiveTintColor,
            renderIcon,
            getLabelText
        } = this.props;
        const { isModalVisible } = this.state;

        const focused = index === navigation.state.index;
        const color = focused ? activeTintColor : inactiveTintColor;
        const TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        if (index === 1) {
            return [
                <Button
                    key={route.key}
                    style={styles.tabItem}
                    onPress={() => jumpTo(route.key)}
                >
                    {renderIcon(TabScene)}
                    <Text style={{ ...styles.tabItemText, color }}>
                        {getLabelText(TabScene)}
                    </Text>
                </Button>,
                <Button
                    key="item"
                    style={styles.tabItem}
                    onPress={() => {
                        this.setState({
                            isModalVisible: true
                        });
                    }}
                >
                    <Icon
                        source={
                            isModalVisible ? activePublishIcon : publishIcon
                        }
                        size={24}
                    />
                    <Text
                        style={[
                            styles.tabItemText,
                            {
                                color: isModalVisible
                                    ? activeTintColor
                                    : inactiveTintColor
                            }
                        ]}
                    >
                        发布
                    </Text>
                </Button>
            ];
        }
        return (
            <Button
                key={route.key}
                style={styles.tabItem}
                onPress={() => jumpTo(route.key)}
            >
                {renderIcon(TabScene)}
                <Text style={{ ...styles.tabItemText, color }}>
                    {getLabelText(TabScene)}
                </Text>
            </Button>
        );
    };
    render() {
        const { navigation } = this.props;
        const { isModalVisible } = this.state;
        const { routes = [] } = navigation.state;
        return (
            <View style={styles.container}>
                {routes.map((route, index) => this.renderItem(route, index))}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        //alert("Modal has been closed.");
                    }}
                >
                    <StatusBar
                        backgroundColor="rgba(0,0,0,0.3)"
                        translucent={true}
                        barStyle="light-content"
                    />
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                isModalVisible: false
                            });
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.list}>
                                <Image
                                    source={rect}
                                    style={styles.listBg}
                                    resizeMode="stretch"
                                />
                                {list.map(
                                    ({ label, icon, routeName, params }) => {
                                        return (
                                            <Button
                                                onPress={() => {
                                                    this.requestModalClose();
                                                    console.log(
                                                        this.props.home,
                                                        "[[]"
                                                    );
                                                    if (
                                                        this.props.home
                                                            .bankstate !== "1"
                                                    ) {
                                                        Tip.fail(
                                                            "收款信息未认证,请先认证收款信息"
                                                        );
                                                        setTimeout(() => {
                                                            this.props.dispatch(
                                                                NavigationActions.navigate(
                                                                    {
                                                                        routeName:
                                                                            "AccountInfo",
                                                                        params
                                                                    }
                                                                )
                                                            );
                                                        }, 1000);
                                                    } else {
                                                        this.props.dispatch(
                                                            NavigationActions.navigate(
                                                                {
                                                                    routeName,
                                                                    params
                                                                }
                                                            )
                                                        );
                                                    }

                                                    // navigate({routeName})
                                                }}
                                                style={styles.item}
                                                key={label}
                                            >
                                                <Icon size={36} source={icon} />
                                                <Text style={styles.itemText}>
                                                    {label}
                                                </Text>
                                            </Button>
                                        );
                                    }
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}
