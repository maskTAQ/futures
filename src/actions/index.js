import { NavigationActions } from "react-navigation";

import store from "../store";

const login = (payload, preRouteParamsAction) => {
    return store.dispatch({ type: "login", payload, preRouteParamsAction });
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
    getTeam,
    getOrderSellFlowerList,
    getOrderBuyFlowerList,
    getMyWallet
};
