import Axios from "axios";
import { Tip } from "commons";

const baseURL = "http://106.14.186.2:8088/";

const token = '';
/**
 * 请求拦截器
 * */
Axios.interceptors.request.use(
  config => {
    if (token) {
      config.headers["token"] = token;
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
const requestWrapper = (method, url, param = {}, hasBaseUrl) => {
  const params = method === "post" ? { data: param } : { params: param };
  return Axios.request({
    method,
    url,
    baseURL: hasBaseUrl ? baseURL : "",
    timeout: 60000,
    ...params
  });
};

const base = (
  type,
  url,
  params = {},
  config = { loading: true, handleCatch: true, showErr: true, hasBaseUrl: true }
) => {
  const {
    loading = true,
    handleCatch = true,
    showErr = true,
    hasBaseUrl = true
  } = config;
  loading && Tip.loading();
  return new Promise((resolve, reject) => {
    requestWrapper(type, url, params, hasBaseUrl)
      .then(res => {
        const { errorCode, data, message } = res.data;
        //errorCode不存在时是为了处理直接请求行情json文件时 返回字段不符合约束条件的情况
        loading && Tip.dismiss();
        if (errorCode === 0 || errorCode === undefined) {
          resolve(errorCode ? data : res.data);
        } else {
          showErr && Tip.fail(message);
          handleCatch
            ? resolve({ message: `已捕获错误:${message}`, error: true })
            : reject(message);
        }
      })
      .catch(e => {
        logError({
          url,
          params,
          error: e
        });
        handleCatch ? resolve({ message: `已捕获错误:${e}` }) : reject(e);
      });
  });
};
const post = (...params) => base("post", ...params);

const get = (...params) => base("get", ...params);

export { post, get };
