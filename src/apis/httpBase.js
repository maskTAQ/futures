import Axios from "axios";
import store from "reduxs/store";

function getBaseURL() {
    return "11";
}

/**
 * 请求拦截器
 * */
Axios.interceptors.request.use(
    config => {
        const user = store.getState().auth.userInfo;
        //在发送请求之前做某事
        if (user) {
            config.headers["token"] = user.token;
        }
        return config;
    },
    error => {
        //请求错误时做些事
        return Promise.reject(error);
    }
);

/**
 * 打印错误信息
 * */
const logError = ({ url, params, error }) => {
    console.log(`
    --     start    --
    url:${url} 
    params:${params}
    error:${JSON.stringify(error)}
    --      end     --
    `);
};

/**
 * 请求
 * */
const requestWrapper = (method, url, param = {}) => {
    const params = method === "post" ? { data: param } : { params: param };
    // const params = method === "post" ? param : { params: param };
    // console.log("request: ", `${baseURL}${url}`);
    // console.log(JSON.stringify(params));
    // console.log(...params);
    return Axios.request({
        baseURL: getBaseURL(),
        url,
        method,
        timeout: 60000,
        ...params
    });
};

const base = (type, url, params, config) => {
    const { handleCatch } = config;
    return new Promise((resolve, reject) => {
        requestWrapper(type, url, params)
            .then(res => {
                const { errorCode, data, message } = res.data;
                if (errorCode === 0) {
                    return resolve(data);
                }
                return reject(message);
            })
            .catch(e => {
                logError({
                    url,
                    params,
                    error: e
                });
                if (handleCatch) {
                    // Tip.fail(`error:${String(e)}`);
                    return resolve("已处理错误");
                }
                return reject(String(e));
            });
    });
};
const post = (
    url,
    params = {},
    { loading = true, handleCatch = true } = {}
) => {
    return base("post", url, params, { loading, handleCatch });
};

const get = (url, params = {}, { loading = true, handleCatch = true } = {}) => {
    return base("get", url, params, { loading, handleCatch });
};

export { post, get };
