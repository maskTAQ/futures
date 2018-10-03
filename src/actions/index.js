import { NavigationActions } from "react-navigation";
import store from "../store";

const login = (payload, preRouteParamsAction) => {
    return store.dispatch({ type: "login", payload, preRouteParamsAction });
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

export { login, logout, back, navigate };
