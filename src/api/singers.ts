import request from "../utils/request";

export function getSingers() {
  return request({
    url: "/top/artists?limit=100"
  });
}

export function getSingersDetail(id: number) {
  return request({
    url: "/artists",
    params: {
      id
    }
  });
}
