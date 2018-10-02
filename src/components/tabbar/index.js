import React, { Component } from "react";
import { View, Text, Modal, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Button, Icon } from "components";

const publishIcon = require("./img/publish.png");
const activePublishIcon = require("./img/active_publish.png");
const rect = require("./img/rect.png");
const list = [
    {
        icon: require("./img/flower.png"),
        label: "购买花卉"
    },
    {
        icon: require("./img/repo.png"),
        label: "转让花园仓库"
    },
    {
        icon: require("./img/money.png"),
        label: "转让奖励仓库"
    },
    {
        icon: require("./img/repeat.png"),
        label: "转让奖励"
    }
];
export default class Tabbar extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        jumpTo: PropTypes.func,
        activeTintColor: PropTypes.string,
        inactiveTintColor: PropTypes.string,
        renderIcon: PropTypes.func,
        getLabelText: PropTypes.func
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
                            {
                                color: isModalVisible
                                    ? activeTintColor
                                    : inactiveTintColor
                            },
                            styles.tabItemText
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
                    <View style={styles.modalContainer}>
                        <View style={styles.list}>
                            <Image
                                source={rect}
                                style={styles.listBg}
                                resizeMode="stretch"
                            />
                            {list.map(({ label, icon }) => {
                                return (
                                    <Button
                                        onPress={this.requestModalClose}
                                        style={styles.item}
                                        key={label}
                                    >
                                        <Icon size={36} source={icon} />
                                        <Text style={styles.itemText}>
                                            {label}
                                        </Text>
                                    </Button>
                                );
                            })}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
