import React from "react";
import PropTypes from "prop-types";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { YellowBox } from "react-native";
import { Icon } from "components";

import {Login,Home} from "pages";


/* eslint-disable */
const TabBarIcon = type => ({ focused }) => {
  
  return <Icon size={24}  />;
};
TabBarIcon.propTypes = {
  focused: PropTypes.boolean
};

const tabPageConfig = [
  ["Choice", Login, "自选", TabBarIcon(0)],
  ["Quotation", Login, "行情", TabBarIcon(1)],
  ["Trade", Login, "交易", TabBarIcon(2)],
  ["Mine", Login, "我的", TabBarIcon(3)]
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
  initialRouteName: "Quotation",
  tabBarOptions: {
    activeTintColor: "#fb0e2d",
    inactiveTintColor: "#919191",
    style: {
      backgroundColor: "#1e1e20",
      height: 50
    },
    labelStyle: {
      fontSize: 12,
      margin: 0,
      padding: 0
    }
  }
});

const AppRouteConfigs = {
  Login,
  Home,
  TabNavigator,
  
};
// 创建一级导航
const StackNavigator = createStackNavigator(AppRouteConfigs, {
  initialRouteName: "TabNavigator",
  mode: "modal",
  headerMode: "none"
});
export default StackNavigator;
export { AppRouteConfigs };
