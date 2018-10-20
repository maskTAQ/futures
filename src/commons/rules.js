export default {
    removeChinese(strValue) {
        const reg = /[\u4e00-\u9fa5]/g;
        return strValue.replace(reg, "");
    },
    isPassword(v) {
        return v && /^[a-z\d]*$/i.test(v);
    }
};
