import { post } from "./base";

const login = params => {
    return post("/Api/checkLogin", params);
};
const register = params => {
    return post("/Api/userReg", params);
};
const getNotice = () => {
    return post("/Api/getNotice");
};
const getHome = () => {
    return post("/Api/getHome");
};
const getCode = () => {
    return post("Api/getCode ");
};
export { host } from "./base";
export { login, register, getNotice, getHome, getCode };
