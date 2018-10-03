import React from "react";
import PropTypes from "prop-types";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { YellowBox } from "react-native";
import { Icon, TabBar } from "components";

import { Login, Home, Mine, Team } from "pages";

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader",
    "Class RCTCxxModule",
    "Remote"
]);

const homeIcon = require("./tabImg/home.png");
const activeHomeIcon = require("./tabImg/active_home.png");
const walletIcon = require("./tabImg/wallet.png");
const activeWalletIcon = require("./tabImg/active_wallet.png");
const teamIcon = require("./tabImg/team.png");
const activeTeamIcon = require("./tabImg/active_team.png");
const meIcon = require("./tabImg/me.png");
const activeMeIcon = require("./tabImg/active_me.png");
/* eslint-disable */
const TabBarIcon = type => ({ focused }) => {
    switch (true) {
        case type === "Home" && !focused:
            return <Icon size={24} source={homeIcon} />;
        case type === "Home" && focused:
            return <Icon size={24} source={activeHomeIcon} />;
        case type === "Wallet" && !focused:
            return <Icon size={24} source={walletIcon} />;
        case type === "Wallet" && focused:
            return <Icon size={24} source={activeWalletIcon} />;
        case type === "Team" && !focused:
            return <Icon size={24} source={teamIcon} />;
        case type === "Team" && focused:
            return <Icon size={24} source={activeTeamIcon} />;
        case type === "Mine" && !focused:
            return <Icon size={24} source={meIcon} />;
        case type === "Mine" && focused:
            return <Icon size={24} source={activeMeIcon} />;
    }
};
TabBarIcon.propTypes = {
    focused: PropTypes.boolean
};

const tabPageConfig = [
    ["Home", Home, "主页", TabBarIcon("Home")],
    ["Wallet", Home, "钱包", TabBarIcon("Wallet")],
    ["Team", Team, "团队", TabBarIcon("Team")],
    ["Mine", Mine, "个人", TabBarIcon("Mine")]
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
    initialRouteName: "Team",
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
