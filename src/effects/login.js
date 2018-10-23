import { take, fork } from "redux-saga/effects";
import taskWrapper from "./taskWrapper";
//import { NavigationActions } from "react-navigation";

import { login } from "apis";
import { navigate } from "actions";
import { setIsLogin } from "reducers";
import { Storage } from "commons";
import store from "store";

export default function*() {
    while (true) {
        //监听登录注销action
        const { type, payload, config } = yield take(["login", "logout"]);

        switch (type) {
            case "login": {
                yield fork(
                    taskWrapper({
                        module: "user",
                        field: "main",
                        type,
                        saveDataToRedux: (params, config) => {
                            return login(params, config)
                                .then(res => {
                                    Storage.setJson("userInfo", params);
                                    setIsLogin(true);
                                    Storage.set("Token", res.access_token);
                                    navigate({ routeName: "TabNavigator" });

                                    [
                                        "getHome",
                                        "getMyWallet",
                                        "getNoticeState"
                                    ].forEach(type => {
                                        store.dispatch({ type });
                                    });
                                    // if (other.preRouteParamsAction) {
                                    //     setTimeout(() => {
                                    //         // 如果是重定向来的登录页则返回到重定向的页面 否则跳转到tab页
                                    //         store.dispatch(
                                    //             NavigationActions.navigate(
                                    //                 other.preRouteParamsAction
                                    //             )
                                    //         );
                                    //     }, 1000);
                                    // }
                                    return { account: params.account, ...res };
                                })
                                .catch(e => {
                                    Storage.remove("userInfo");
                                    if (e.includes("待推荐人同意")) {
                                        navigate({
                                            routeName: "Exit"
                                        });
                                    } else {
                                        //token失效时返回登录页
                                        const {
                                            nav: { index, routes }
                                        } = store.getState();
                                        if (
                                            routes[index].routeName !== "Login"
                                        ) {
                                            store.dispatch({ type: "logout" });
                                        }
                                    }
                                });
                        },
                        params: payload,
                        config: config
                    })
                );
                break;
            }
            case "logout": {
                Storage.remove("userInfo");
                navigate({ routeName: "Login" });
            }
        }
    }
}
