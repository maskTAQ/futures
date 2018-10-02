import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Button, Icon } from "components";

const publishIcon = require("./img/publish.png");
export default class Tabbar extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        jumpTo: PropTypes.func,
        activeTintColor: PropTypes.string,
        inactiveTintColor: PropTypes.string,
        renderIcon: PropTypes.func,
        getLabelText: PropTypes.func
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
                    <Text style={{ ...styles.tabText, color }}>
                        {getLabelText(TabScene)}
                    </Text>
                </Button>,
                <Button
                    key="item"
                    style={styles.tabItem}
                    //onPress={() => jumpTo(route.key)}
                >
                    <Icon source={publishIcon} size={24} />
                    <Text style={{ ...styles.tabText, color }}>发布</Text>
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
                <Text style={{ ...styles.tabText, color }}>
                    {getLabelText(TabScene)}
                </Text>
            </Button>
        );
    };
    render() {
        const { navigation } = this.props;
        const { routes = [] } = navigation.state;
        return (
            <View style={styles.container}>
                {routes.map((route, index) => this.renderItem(route, index))}
            </View>
        );
    }
}
