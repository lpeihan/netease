import axios from "axios";
import Vue from "vue";
import loading from "../components/loading";

const CODE_OK = 200;
let loadCount = 0; // 当前请求 loading 的数量

const request = axios.create({
  timeout: 10000,
  baseURL: process.env.apiUrl,
  _loading: true
});

request.interceptors.request.use(config => {
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
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    if (err.config._loading && --loadCount <= 0) {
      loading.close();
    }

    Vue.prototype.$toast(err.message);
    return Promise.reject(err);
  }
);

export default request;
