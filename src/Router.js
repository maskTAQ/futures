import React from "react";
import PropTypes from "prop-types";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { Icon, TabBar } from "components";

import { Login, Home } from "pages";

/* eslint-disable */
const TabBarIcon = type => ({ focused }) => {
    return <Icon size={24} />;
};
TabBarIcon.propTypes = {
    focused: PropTypes.boolean
};

const homeIcon = require("./tabImg/home.png");
const tabPageConfig = [
    ["Home", Home, "主页", <Icon size={24} source={homeIcon} />],
    ["Quotation", Home, "钱包", TabBarIcon(1)],
    ["Trade", Home, "团队", TabBarIcon(2)],
    ["Mine", Home, "个人", TabBarIcon(3)]
];

const createTabNavigatorParams = () => {
    const result = {};
    tabPageConfig.forEach(
        ([componentName, component, tabBarLabel, tabBarIcon]) => {
            result[componentName] = {
                screen: component,
                navigationOptions: {
                    tabBarLabel,
                    tabBarIcon
                }
            };
        }
    );
    return result;
};
// 创建TAB导航
const TabNavigator = createBottomTabNavigator(createTabNavigatorParams(), {
    initialRouteName: "Home",
    tabBarOptions: {
        activeTintColor: "#fa4f75",
        inactiveTintColor: "#919191",
        style: {
            backgroundColor: "#fff",
            height: 50
        },
        labelStyle: {
            fontSize: 12,
            margin: 0,
            padding: 0
        }
    },
    tabBarComponent: TabBar
});

const AppRouteConfigs = {
    TabNavigator,
    Login,
    Home
};
// 创建一级导航
const StackNavigator = createStackNavigator(AppRouteConfigs, {
    initialRouteName: "TabNavigator",
    mode: "modal",
    headerMode: "none"
});
export default StackNavigator;
export { AppRouteConfigs };
