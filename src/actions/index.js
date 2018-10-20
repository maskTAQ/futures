import { NavigationActions } from "react-navigation";

import store from "../store";

const login = (payload, config, preRouteParamsAction) => {
    return store.dispatch({
        type: "login",
        payload,
        config,
        preRouteParamsAction
    });
};
const getHome = payload => {
    return store.dispatch({ type: "getHome", payload });
};
const getTeam = payload => {
    return store.dispatch({ type: "getTeam", payload });
};
const getOrderSellFlowerList = payload => {
    return store.dispatch({ type: "getOrderSellFlowerList", payload });
};
const getOrderBuyFlowerList = payload => {
    return store.dispatch({ type: "getOrderBuyFlowerList", payload });
};
const getMyWallet = payload => {
    return store.dispatch({ type: "getMyWallet", payload });
};
const getInviteList = payload => {
    return store.dispatch({ type: "getInviteList", payload });
};

const getBanckInfo = payload => {
    return store.dispatch({ type: "getBanckInfo", payload });
};
const getNoticeState = payload => {
    return store.dispatch({ type: "getNoticeState", payload });
};
const logout = () => {
    return store.dispatch({ type: "logout" });
};

const back = () => {
    return store.dispatch(NavigationActions.back());
};

// 路由跳转
const navigate = (...p) => {
    return store.dispatch(NavigationActions.navigate(...p));
};

export {
    login,
    logout,
    back,
    navigate,
    getHome,
    getTeam,
    getOrderSellFlowerList,
    getOrderBuyFlowerList,
    getMyWallet,
    getInviteList,
    getBanckInfo,
    getNoticeState
};
