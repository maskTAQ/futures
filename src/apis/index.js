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

export { login, register, getNotice, getHome };
