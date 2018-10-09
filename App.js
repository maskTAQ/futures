/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  BackHandler,
  View,
  ToastAndroid,
  Platform
} from "react-native";
import { Provider } from "react-redux";
import { Page } from "components";
import { reduxifyNavigator } from "react-navigation-redux-helpers";
import { connect } from "react-redux";


import { iconSource } from 'commons';
import {Tip} from 'components';
import store from "store/index.js";
import { back } from "actions";
import sage from "effects/index.js";

//import Loading from "./loading";
import Router from "./src/Router";
//注册页面返回句柄
Page.registerReturnEventlistener(back);
Page.setLeftIconSource(iconSource.left);
//将state.nav注入路由
const Navigation = reduxifyNavigator(Router, "root");
const mapStateToProps = ({ nav }) => ({ state: nav });
const AppWithNavigationState = connect(mapStateToProps)(Navigation);

/* eslint-disable */
if (!__DEV__) {
  global.console = {
    info: () => { },
    log: () => { },
    warn: () => { },
    debug: () => { },
    error: () => { }
  };
}

export default class App extends Component {
  UNSAFE_componentWillMount() {
    store.runSaga(sage);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }
  }



  handleAppStateChange = nextAppState => {
    switch (nextAppState) {
      case "active":
        console.log("app state will be active");
        break;
      case "inactive":
        console.log("app state will be inactive");
        break;
      case "background":
        console.log("app state will be background");
        break;
      default:
        break;
    }
  };

  lastBack = null;

  handleBack = () => {
    const { nav } = store.getState();
    const routeName = nav.routes[nav.index].routeName;
    if (nav.routes.length > 1 && !["TabNavigator"].includes(routeName)) {
      this.props.dispatch(action.navigate.back());
      return true;
    }
    if (routeName === "TabNavigator") {
      if (this.lastBack && new Date().getTime() - this.lastBack < 2000) {
        this.ws && this.ws.close();
        BackHandler.exitApp();
      } else {
        this.lastBack = new Date().getTime();
        ToastAndroid.show("再按一次返回键退出程序", 2000);
      }
      return true;
    }
    return false;
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <Tip />
        </View>
      </Provider>
    );
  }
}
