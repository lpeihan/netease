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

export function getPlaylist(id: string) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}
