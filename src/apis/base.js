import Axios from "axios";
import qs from "qs";
import { Tip, Storage } from "commons";

const host = "http://pig.bateersoft.cc"; //http://123.207.84.39/index.php
/**
 * 请求拦截器
 * */
Axios.interceptors.request.use(
    config => {
        return Storage.get("Token")
            .then(data => {
                if (data) {
                    config.headers["access_token"] = data;
                }
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
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
const logError = ({ url, params, res, error }) => {
    console.log(`
    --     start    --
    url:${url} 
    params:${JSON.stringify(params)}
    res:${JSON.stringify(res)}
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
    console.log();
    return Axios.request({
        baseURL: host,
        url,
        method,
        timeout: 60000,
        ...params
    });
};

const base = (type, url, params, config) => {
    const { handleCatch, loading } = config;
    loading && Tip.loading();
    return new Promise((resolve, reject) => {
        requestWrapper(type, url, params)
            .then(res => {
                const { code, data, msg } = res.data;
                console.log(data, url);
                Tip.dismiss();
                if (Number(code) === 200) {
                    return resolve(data);
                } else {
                    if (handleCatch) {
                        logError({
                            url,
                            params,
                            res: res.data
                        });
                        Tip.fail(msg);
                        return reject("已处理错误:" + msg);
                    }
                    return reject(msg);
                }
            })
            .catch(e => {
                console.log(e, url);
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

export { post, get, host };
