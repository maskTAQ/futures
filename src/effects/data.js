import { take, fork } from "redux-saga/effects";
import taskWrapper from "./taskWrapper";

import {
    getTeamMember,
    getOrderSellFlowerList,
    getOrderBuyFlowerList,
    getMyWallet
} from "apis";

export default function*() {
    while (true) {
        //监听登录注销action
        const { type, payload } = yield take([
            "getTeam",
            "getOrderSellFlowerList",
            "getOrderBuyFlowerList",
            "getMyWallet"
        ]);
        switch (type) {
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
                console.log(getOrderSellFlowerList, "getOrderSellFlowerList");
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
                        saveDataToRedux: getOrderBuyFlowerList,
                        params: payload
                    })
                );
                break;
            }
            case "getMyWallet": {
                yield fork(
                    taskWrapper({
                        module: "data",
                        field: "Wallet",
                        type,
                        saveDataToRedux: getMyWallet,
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
