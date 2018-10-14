import { post } from "./base";

const login = params => {
    return post("/api.php?action=checkLogin", params);
};

const getNotice = () => {
    return post("/api.php?action=getNotice");
};
const getHome = () => {
    return post("/api.php?action=getHome", null, { loading: false });
};
const getCode = params => {
    return post("/api.php?action=getCode ", params, { loading: false });
};
const findPassword = params => {
    return post("/api.php?action=findPassword", params);
};
const userReg = () => {
    return post("/api.php?action=userReg");
};

const userInfo = () => {
    return post("/api.php?action=userInfo");
};
const getTeamMember = () => {
    return post("/api.php?action=teamMember");
};
const getOrderSellFlowerList = () => {
    return post("/api.php?action=orderSellFlowerList", null, {
        loading: false
    });
};
const getOrderBuyFlowerList = () => {
    return post("/api.php?action=orderBuyFlowerList", null, { loading: false });
};
const getorderBuyFlowerInfo = params => {
    return post("/api.php?action=orderBuyFlowerInfo", {
        ...params,
        voucher: true
    });
};
const orderBuyUpdateVoucher = params => {
    return post("/api.php?action=orderBuyUpdateVoucher", params, {
        handleCatch: false
    });
};
const orderBuySureCollection = params => {
    return post("/api.php?action=orderBuySureCollection", params);
};
const orderBuyRepetition = params => {
    return post("/api.php?action=orderBuyRepetition", params);
};
export { host } from "./base";
export {
    login,
    getNotice,
    getHome,
    getCode,
    findPassword,
    userReg,
    userInfo,
    getTeamMember,
    getOrderSellFlowerList,
    getOrderBuyFlowerList,
    getorderBuyFlowerInfo,
    orderBuyUpdateVoucher,
    orderBuySureCollection,
    orderBuyRepetition
};
