import { combineReducers } from "redux";
import _ from "lodash";
import { NavigationActions } from "react-navigation";
//import { createNavigationReducer } from "react-navigation-redux-helpers";

import AppNavigator from "src/Router";
//import {  } from "apis/base";
const isLogin = true;
//redux中存储的内容
const modules = [
    "auth:fundsInfo.userInfo.siteIndex",
    "stock:allStock.allStockMap.choice.dayCommission.dayDeal.position.positionMap.historySearch",
    "quotation:all.exponent"
];

//redux中存储的内容 逻辑部分
const preloadedStateForLoadong = {};
const preloadedState = {
    loading: preloadedStateForLoadong,
    nav: AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams("Home")
    )
};

//自动处理下一状态的reducers
const autoHandleReducers = (module, fields) => (state, action) => {
    const { payload, field, type } = action;
    //退出清空数据
    if (type === "logout") {
        const nextState = Object.assign({}, state);
        for (const item in nextState) {
            //不清空quotation:exponent、stock.allStock的数据
            if (
                module === "quotation" ||
                (module === "stock" && item === "allStock") ||
                (module === "auth" && item === "siteIndex")
            ) {
                continue;
            }
            nextState[item] = undefined;
        }
        return nextState;
    }
    if (
        fields.includes(field) &&
        // !_.isEqual(state[field], payload) &&
        payload &&
        action.module === module
    ) {
        return { ...state, [field]: payload };
    } else {
        return state || preloadedState[module];
    }
};

//生成loading的数据结构
const createStatusStructure = (module, fields) => {
    preloadedStateForLoadong[module] = {};
    fields.forEach(field => {
        preloadedStateForLoadong[module][field] = {
            loading: false,
            cancle: false,
            updateTime: new Date()
        };
    });
};

//填充数据
const fillData = () => {
    const reducers = {};
    modules.forEach(item => {
        const [module, fields] = item.split(":");
        const f = fields.split(".");
        createStatusStructure(module, f);
        preloadedState[module] = {};
        reducers[module] = autoHandleReducers(module, f);
    });
    return reducers;
};
const reducers = fillData();

// 不需要登录页面
const noAuthRoute = ["Quotation"];
// 判断是否需要重定向到登录页
const isNeedRedirectToLogin = routeName =>
    !isLogin && routeName && !noAuthRoute.includes(routeName);

const reducer = combineReducers({
    ...reducers,
    nav: (state = preloadedState.nav, action) => {
        const { type, routeName, params = {} } = action;
        if (!type.includes("Navigation")) {
            return state;
        }
        let nextState;

        if (isNeedRedirectToLogin(routeName)) {
            nextState = AppNavigator.router.getStateForAction(
                AppNavigator.router.getActionForPathAndParams(
                    "Login",
                    //将重定向的页面的action放入参数有登录之后dispatch
                    NavigationActions.navigate({
                        routeName,
                        params: Object.assign({ isRedirect: true }, params)
                    })
                ),
                state
            );
        } else {
            nextState = AppNavigator.router.getStateForAction(action, state);
            const routes = nextState.routes;
            //如果是登录转向的重定向的页面将路由栈中的登录页移除 实现在重定向页面返回时返回到登录之前的页面
            //并且排除tab相互跳转的情况 路由栈小于俩个页面的情况
            if (
                params.isRedirect &&
                routes.length > 2 &&
                routes[routes.length - 2].routeName === "Login"
            ) {
                routes.splice(1, 1);
                nextState.index -= 1;
            }
        }

        return nextState || state;
    },
    loading(state = preloadedStateForLoadong, action) {
        const { module, field, status } = action;
        switch (true) {
            case status === "request":
                return _.defaultsDeep(
                    {},
                    { [module]: { [field]: { loading: true } } },
                    state
                );
            case status === "success":
                return _.defaultsDeep(
                    {},
                    {
                        [module]: {
                            [field]: { loading: false, updateTime: new Date() }
                        }
                    },
                    state
                );
            case status === "error":
                return _.defaultsDeep(
                    {},
                    { [module]: { [field]: { loading: false } } },
                    state
                );
            case status === "cancel":
                return _.defaultsDeep(
                    {},
                    { [module]: { [field]: { loading: false, cancel: true } } },
                    state
                );

            default:
                return state;
        }
    }
});

export { preloadedState };
export default reducer;
