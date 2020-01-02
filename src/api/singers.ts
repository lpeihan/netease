import request from "../utils/request";

export function getSingers() {
  return request({
    url: "/top/artists?limit=100"
  });
}

export function getSingersDetail(id: string) {
  return request({
    url: "/artists",
    params: {
      id
    }
  });
}
