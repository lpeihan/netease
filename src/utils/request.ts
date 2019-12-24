import axios from "axios";

const CODE_OK = 200;

const request = axios.create({
  timeout: 10000,
  baseURL: process.env.apiUrl
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(
  res => {
    const { config, data } = res;

    if (data.code == CODE_OK) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default request;
