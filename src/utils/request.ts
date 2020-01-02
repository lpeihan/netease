import axios from "axios";
import Vue from "vue";
import loading from "../components/loading";

const CODE_OK = 200;
let loadCount = 0; // 当前请求 loading 的数量

const request = axios.create({
  timeout: 10000,
  baseURL: process.env.apiUrl
});

request.interceptors.request.use(config => {
  loadCount++;
  loading.open();

  return config;
});

request.interceptors.response.use(
  res => {
    loadCount--;

    if (loadCount <= 0) {
      loading.close();
    }

    if (res.data.code == CODE_OK) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    loadCount--;

    if (loadCount <= 0) {
      loading.close();
    }

    Vue.prototype.$toast(err.message);
    return Promise.reject(err);
  }
);

export default request;
