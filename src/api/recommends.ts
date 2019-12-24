import request from "../utils/request";

export function getBanners() {
  return request({
    url: "/banner"
  });
}

export function getRecommends() {
  return request({
    url: "/personalized"
  });
}
