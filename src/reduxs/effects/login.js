import { take, fork, cancel, put } from "redux-saga/effects";
import taskWrapper, { saveActon } from "./taskWrapper";
import { NavigationActions } from "react-navigation";

import { login, loginOut } from "apis/UserApi";
import { Tip, Storage } from "commons";
// import {
//   fetchChoiceData,
//   fetchFundsInfo,
//   fetchPosition,
//   fetchDayCommission,
//   fetchDayDeal
// } from "reduxs/actions";
const setSerialNum = '1';
import store from "../store";

export default function*() {
  let loginTaskTag, logoutTaskTag;
  while (true) {
    //监听登录注销action
    const { type, payload, preRouteParamsAction } = yield take([
      "login",
      "logout",
      "login/cancel",
      "logout/cancel",
      "setSite"
    ]);
    switch (type) {
      case "login": {
        //撤销注销行为
        if (logoutTaskTag) {
          yield cancel(logoutTaskTag);
        }

       

        //开始登陆
        loginTaskTag = yield fork(
          taskWrapper({
            module: "auth",
            field: "userInfo",
            type,
            saveDataToRedux: (params, config) => {
              return login(params, config).then(res => {
                const { error, token, userName } = res;
                if (error) {
                  return null;
                } else {
                  Tip.success("登录成功", 1000);
                  Storage.setJson("userName", userName);
                  Storage.setJson("userInfo", payload);
                  setSerialNum(token);

                  

                  if (preRouteParamsAction) {
                    setTimeout(() => {
                      // 如果是重定向来的登录页则返回到重定向的页面 否则跳转到tab页
                      store.dispatch(
                        NavigationActions.navigate(preRouteParamsAction)
                      );
                    }, 1000);
                  }

                  return res;
                }
              });
            },
            params: payload
          })
        );
        break;
      }

      case "logout": {
        // 撤销登录行为
        if (loginTaskTag) {
          yield cancel(loginTaskTag);
        }
        // 开始注销
        loginOut()
          .then(() => {
            Tip.success("退出成功", 1000);
            setSerialNum("");
            setTimeout(() => {
              store.dispatch(
                NavigationActions.navigate({ routeName: "Quotation" })
              );
            }, 1000);
          })
          .catch(error => {
            console.log("error", error);
            Tip.fail("退出失败");
          });
        break;
      }

      

      case "login/cancel": {
        // 撤销登录行为
        if (loginTaskTag) {
          yield cancel(loginTaskTag);
        }
        break;
      }

      case "logout/cancel": {
        // 撤销注销行为
        if (logoutTaskTag) {
          yield cancel(logoutTaskTag);
        }
        break;
      }

      default:
        break;
    }
  }
}
