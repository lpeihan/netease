import request from "../utils/request";

export function getSingers() {
  return request({
    url: "/top/artists?limit=100"
  });
}
