import Axios from "axios";
import qs from "qs";
import { Tip, Storage } from "commons";

/**
 * 请求拦截器
 * */
Axios.interceptors.request.use(
    config => {
        //const user = store.getState().auth.userInfo;
        //在发送请求之前做某事
        // console.log(Storage.get('Token'))
        // config.headers["access_token"] = user.token;

        return Storage.get("Token")
            .then(data => {
                if (data) {
                    config.headers["access_token"] = data;
                }
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                console.log(config);
                return config;
            })
            .catch(e => {
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                return config;
            });
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
    const params =
        method === "post" ? { data: qs.stringify(param) } : { params: param };
    return Axios.request({
        baseURL: "http://pig.bateersoft.cc",
        url,
        method,
        timeout: 60000,
        ...params
    });
};

const base = (type, url, params, config) => {
    const { handleCatch } = config;
    Tip.loading();
    return new Promise((resolve, reject) => {
        requestWrapper(type, url, params)
            .then(res => {
                const { code, data, msg } = res.data;
                console.log(res, "[[[");
                Tip.dismiss();
                if (Number(code) === 200) {
                    return resolve(data);
                } else {
                    if (handleCatch) {
                        Tip.fail(msg);
                        return reject("已处理错误");
                    }
                    return reject(msg);
                }
            })
            .catch(e => {
                logError({
                    url,
                    params,
                    error: e
                });
                Tip.dismiss();
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
