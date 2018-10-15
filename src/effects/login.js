import { take, fork } from "redux-saga/effects";
import taskWrapper from "./taskWrapper";
//import { NavigationActions } from "react-navigation";

import { login } from "apis";
import { navigate } from "actions";
import { setIsLogin } from "reducers";
import { Storage } from "commons";

export default function*() {
    while (true) {
        //监听登录注销action
        const { type, payload } = yield take(["login"]);

        switch (type) {
            case "login": {
                console.log("登录 taskWrapper");
                yield fork(
                    taskWrapper({
                        module: "user",
                        field: "main",
                        type,
                        saveDataToRedux: (params, config) => {
                            return login(params, config).then(res => {
                                Storage.setJson("userInfo", params);
                                setIsLogin(true);
                                Storage.set("Token", res.access_token);
                                navigate({ routeName: "TabNavigator" });
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
                                return { account: params.account };
                            });
                        },
                        params: payload
                    })
                );
                break;
            }
        }
    }
}
