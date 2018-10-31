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
  Platform,
  Linking,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { Provider } from "react-redux";
import { Page, Icon, Text, Button } from "components";
import { reduxifyNavigator } from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import _ from 'lodash';

import { orderDetail as styles, alert as alertStyle } from "./src/pages/styles";
import { iconSource, Storage } from 'commons';
import { Tip, Alert } from 'components';
import store from "store/index.js";
import { back, login, navigate } from "actions";
import sage from "effects/index.js";
import { checkUpdate } from 'apis';
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
  state = {
    alert: {
      visible: false,
      url: '',
      version: '',
      remark: ''
    }
  }
  UNSAFE_componentWillMount() {
    store.runSaga(sage);

  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }
    //自动登录
    Storage.getJson('userInfo')
      .then(userInfo => {
        if (userInfo) {
          login(userInfo, { loading: false })
          // .catch(()=>{
          //   navigate({ routeName: 'Login' })
          // })
        } else {
          setTimeout(() => {
            navigate({ routeName: 'Login' })
          }, 2000);
        }
      })
      .catch(e => {
        setTimeout(() => {
          navigate({ routeName: 'Login' })
        }, 2000);
      })

    setTimeout(() => {
      checkUpdate({ handleCatch: false })
        .then(data => {
          const { url, version, remark } = data;
          const nextState = _.cloneDeep(this.state);
          nextState.alert = {
            visible: true,
            url, version, remark
          };
          this.setState(nextState);
        })
        .catch(e => {
          //
        })
    }, 2000)
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
    if (["TabNavigator", 'Login'].includes(routeName)) {
      if (this.lastBack && new Date().getTime() - this.lastBack < 2000) {
        BackHandler.exitApp();
      } else {
        this.lastBack = new Date().getTime();
        ToastAndroid.show("再按一次返回键退出程序", 2000);
      }
      return true;
    }
    if (nav.routes.length > 1) {
      back();
      return true;
    }
    return false;
  };

  render() {
    const {
      alert: { visible, version, url = 'https://www.baidu.com/' },

    } = this.state;

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <Tip />
          <Alert
            visible={visible}
            showClose={false}
            requestClose={() => {
              this.setState({
                alert: {
                  visible: false,
                  content: ""
                }
              });
              // back();
            }}
          >
            <TouchableWithoutFeedback>

              <View style={alertStyle.container}>
                <StatusBar
                  backgroundColor="rgba(0,0,0,0.3)"
                  translucent={true}
                  barStyle="light-content"
                />
                <View style={styles.alertContainer}>
                  <Icon
                    source={iconSource.success}
                    style={styles.successIcon}
                  />
                  <Text style={styles.successText}>
                    有新版本,请更新
                </Text>
                </View>
                <Button
                  onPress={() => {
                    this.setState({
                      alert: {
                        visible: false,
                      }
                    }, () => {
                      Linking.openURL(url);
                    });
                    // back();
                  }}
                  style={alertStyle.submit}
                  textStyle={[alertStyle.submitText, { fontSize: 16, }]}
                >
                  更新
              </Button>
              </View>
            </TouchableWithoutFeedback>
          </Alert>
        </View>
      </Provider>
    );
  }
}
