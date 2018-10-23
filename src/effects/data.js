import { take, fork } from "redux-saga/effects";
import taskWrapper from "./taskWrapper";
import { Tip } from "commons";

import {
    getTeamMember,
    getOrderSellFlowerList,
    getOrderBuyFlowerList,
    getMyWallet,
    getInviteList,
    getBanckInfo,
    getNoticeState,
    getHome
} from "apis";

export default function*() {
    while (true) {
        //监听登录注销action
        const { type, payload } = yield take([
            "getHome",
            "getTeam",
            "getOrderSellFlowerList",
            "getOrderBuyFlowerList",
            "getMyWallet",
            "getInviteList",
            "getBanckInfo",
            "getNoticeState"
        ]);
        switch (type) {
            case "getHome": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "home",
                        type,
                        saveDataToRedux: getHome,
                        params: payload
                    })
                );
                break;
            }
            case "getTeam": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "team",
                        type,
                        saveDataToRedux: getTeamMember,
                        params: payload
                    })
                );
                break;
            }
            case "getOrderSellFlowerList": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "orderSellFlowerList",
                        type,
                        saveDataToRedux: getOrderSellFlowerList,
                        params: payload
                    })
                );
                break;
            }
            case "getOrderBuyFlowerList": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "orderBuyFlowerList",
                        type,
                        saveDataToRedux: () => {
                            return getOrderBuyFlowerList({
                                handleCatch: false
                            }).catch(e => {
                                Tip.fail(
                                    "更新订单列表失败,请下拉刷新来获取最新的订单的状态"
                                );
                            });
                        },
                        params: payload
                    })
                );
                break;
            }
            case "getMyWallet": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "wallet",
                        type,
                        saveDataToRedux: getMyWallet,
                        params: payload
                    })
                );
                break;
            }

            case "getInviteList": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "inviteList",
                        type,
                        saveDataToRedux: getInviteList,
                        params: payload
                    })
                );
                break;
            }
            case "getBanckInfo": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "bankInfo",
                        type,
                        saveDataToRedux: getBanckInfo,
                        params: payload
                    })
                );
                break;
            }
            case "getNoticeState": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "noticeState",
                        type,
                        saveDataToRedux: getNoticeState,
                        params: payload
                    })
                );
                break;
            }
            default:
                break;
        }
    }
}
