import axios from "axios";
import store from "../store";

const CODE_OK = 200;
let loadCount = 0; // 当前请求 loading 的数量

const request = axios.create({
  timeout: 10000,
  baseURL: process.env.apiUrl
});

request.interceptors.request.use(config => {
  loadCount++;
  store.dispatch("setLoading", true);

  return config;
});

request.interceptors.response.use(
  res => {
    loadCount--;

    if (loadCount <= 0) {
      store.dispatch("setLoading", false);
    }

    if (res.data.code == CODE_OK) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    loadCount--;
    return Promise.reject(err);
  }
);

export default request;
