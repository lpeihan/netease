import axios from "axios";
import Vue from "vue";
import loading from "../components/loading";
import { AxiosRequestConfig } from "axios";

const CODE_OK = 200;
let loadCount = 0; // 当前请求 loading 的数量
const CACHE_DATA = new Map(); // 将一些接口缓存在内存中，减少请求
const CancelToken = axios.CancelToken;

function getURL(config: AxiosRequestConfig, isRequest?: boolean) {
  let { url, data, params } = config;

  if (isRequest) {
    const api = url[0] === "/" ? url : `/${url}`;
    url = config.baseURL + api;
  }

  params = params ? JSON.stringify(params) : params;
  data = data ? JSON.stringify(data) : data;

  return url + params + data;
}

const request = axios.create({
  timeout: 10000,
  baseURL: process.env.apiUrl,
  _loading: true
});

request.interceptors.request.use(config => {
  const source = CancelToken.source();
  config.cancelToken = source.token;

  const data = CACHE_DATA.get(getURL(config, true));

  if (data) {
    source.cancel(data);
    return config;
  }

  if (config._loading) {
    loadCount++;
    loading.open();
  }

  return config;
});

request.interceptors.response.use(
  res => {
    if (res.config._loading && --loadCount <= 0) {
      loading.close();
    }

    if (res.data.code == CODE_OK) {
      CACHE_DATA.set(getURL(res.config), res);

      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    const { message } = err;

    if (axios.isCancel(err)) {
      return Promise.resolve(message);
    }

    if (err.config._loading && --loadCount <= 0) {
      loading.close();
    }

    Vue.prototype.$toast(err.message);
    return Promise.reject(err);
  }
);

export default request;
