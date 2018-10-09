import { post } from "./base";

const login = params => {
    return post("/Api/checkLogin", params);
};

export { login };
