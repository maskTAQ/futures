import { Platform } from "react-native";

import app from "src/app.js";
import { post } from "./base";

const login = (params, config) => {
    return post("/Api/checkLogin", params, config);
};
const autoLogin = config => {
    return post("/Api/tokenLogin", null, config);
};
const logout = () => {
    return post("/Api/LogOut");
};

const getNotice = () => {
    return post("/Api/getNotice");
};
const getHome = () => {
    return post("/Api/getHome", null, { loading: false });
};
const getCode = params => {
    return post(`/Api/getSMSCode`, params, { loading: false });
};
const findPassword = params => {
    return post("/Api/findPassword", params);
};
const userReg = params => {
    return post("/Api/userReg", params);
};

const userInfo = () => {
    return post("/Api/userInfo");
};
const getTeamMember = () => {
    return post("/Api/teamMember", null, { loading: false });
};

const getOrderBuyFlowerList = config => {
    return post("/Api/orderBuyFlowerList", null, { loading: false, ...config });
};
const getorderBuyFlowerInfo = params => {
    return post("/Api/orderBuyFlowerInfo", {
        ...params,
        voucher: true
    });
};
const orderBuyUpdateVoucher = params => {
    return post("/Api/orderBuyUpdateVoucher", params, {
        handleCatch: false
    });
};
const orderBuySureCollection = params => {
    return post("/Api/orderBuySureCollection", params);
};
const orderBuyRepetition = params => {
    return post("/Api/orderBuyRepetition", params);
};

const getOrderSellFlowerList = () => {
    return post("/Api/orderSellFlowerList", null, {
        loading: false
    });
};
const getorderSellFlowerInfo = params => {
    return post("/Api/orderSellFlowerInfo", params);
};

const orderSellSureCollection = params => {
    return post("/Api/orderSellSureCollection", params);
};
const orderSellRepetition = params => {
    return post("/Api/orderSellRepetition", params);
};
const orderComplaint = params => {
    return post("/Api/orderComplaint", params);
};

const getMyWallet = params => {
    return post("/Api/myWallet", params);
};

const getJingtaiMoney = params => {
    return post("/Api/jingtaiMoney", params, { loading: false });
};
const getDongtaiMoney = params => {
    return post("/Api/dongtaiMoney", params, { loading: false });
};
//排单币转发(肥料)
const queuingMoney = params => {
    return post("/Api/queuingMoney", params);
};
//邀请名额转发
const inviteMoney = params => {
    return post("/Api/inviteMoney", params);
};
//求助反馈
const myInfo = params => {
    return post("/Api/myInfo", params);
};
//修改密码
const updatePassword = params => {
    return post("/Api/updatePassword", params);
};
//收款信息
const collectionInfo = params => {
    return post("/Api/collectionInfo", params);
};
//邀请列表
const getInviteList = params => {
    return post("/Api/inviteList", params, { loading: false });
};
//邀请码记录列表
const inviteRecord = params => {
    return post("Api/inviteRecord", params, { loading: false });
};
//排单币记录
const queuingRecord = params => {
    return post("Api/queuingRecord", params, { loading: false });
};
//同意邀请
const inviteSure = params => {
    return post("/Api/inviteSure", params, { loading: false });
};

//检查更新
const checkUpdate = config => {
    return post(
        "/Api/checkUpdate",
        {
            model: Platform.select({ ios: "1", android: "2" }),
            version: app.version[Platform.OS]
        },
        config
    );
};
//获取银行账户信息
const getBanckInfo = () => {
    return post("/Api/getCollectionInfo", null);
};
const shareAPP = () => {
    return post("/Api/shareAPP", null);
};
//验证交易密码
const tradePassword = params => {
    return post("/Api/tradePassword", params);
};

const buyFlower = params => {
    return post("/Api/buyFlower", params);
};
const sellFlower = params => {
    return post("/Api/sellFlower", params);
};
//设置推送
const setPush = params => {
    return post("/Api/smsNotice", params);
};

//获取 通知状态
const getNoticeState = () => {
    return post("/Api/smsNoticeState");
};
//设置 通知状态
const setNoticeState = params => {
    return post("/Api/smsNotice", params);
};
export { host } from "./base";
export {
    login,
    autoLogin,
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
    orderBuyRepetition,
    getorderSellFlowerInfo,
    orderSellSureCollection,
    orderSellRepetition,
    orderComplaint,
    getMyWallet,
    getJingtaiMoney,
    getDongtaiMoney,
    queuingMoney,
    inviteMoney,
    myInfo,
    updatePassword,
    collectionInfo,
    getInviteList,
    inviteSure,
    checkUpdate,
    shareAPP,
    tradePassword,
    buyFlower,
    sellFlower,
    logout,
    getBanckInfo,
    setPush,
    getNoticeState,
    setNoticeState,
    inviteRecord,
    queuingRecord
};
