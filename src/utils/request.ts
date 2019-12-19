import axios from "axios";

const CODE_OK = 1;

const request = axios.create({
  timeout: 10000
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(
  res => {
    const { config, data } = res;

    if (data.code == CODE_OK) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default request;
