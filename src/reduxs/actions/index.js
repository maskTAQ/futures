import { NavigationActions } from "react-navigation";
import store from "../store";

const fetchStockData = () => {
  return store.dispatch({ type: "stock/fetch" });
};

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

// 自选
const fetchChoiceData = (resubscription = true) =>
  store.dispatch({ type: "choice/fetch", payload: { resubscription } });
// 当日委托
const fetchDayCommission = () =>
  store.dispatch({ type: "dayCommission/fetch" });
// 当日成交
const fetchDayDeal = () => store.dispatch({ type: "dayDeal/fetch" });
// 持仓
const fetchPosition = () => store.dispatch({ type: "position/fetch" });
// 资金
const fetchFundsInfo = () => store.dispatch({ type: "fundsInfo/fetch" });
// 添加自选
const addOptional = payload =>
  store.dispatch({ type: "optional/add", payload });
// 删除自选
const removeOptional = payload =>
  store.dispatch({ type: "optional/remove", payload });
// 添加历史记录
const addHistorySearch = payload =>
  store.dispatch({ type: "stock/addHistorySearch", payload });
// 清除历史记录
const clearHistorySearch = payload =>
  store.dispatch({ type: "stock/clearHistorySearch", payload });
const updateQuotation = payload =>
  store.dispatch({ type: "updateQuotation", payload });
const updateExponent = payload =>
  store.dispatch({ type: "updateExponent", payload });
// 设置服务站点
const setSite = payload => store.dispatch({ type: "setSite", payload });

export {
  login,
  logout,
  back,
  navigate,
  fetchChoiceData,
  fetchStockData,
  fetchDayCommission,
  fetchDayDeal,
  fetchPosition,
  fetchFundsInfo,
  addOptional,
  removeOptional,
  updateQuotation,
  updateExponent,
  addHistorySearch,
  clearHistorySearch,
  setSite

  // tradeBuy,
  // tradeSell,
  // tradeCancel
};
