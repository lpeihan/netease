import request from "../utils/request";

export function getRanks() {
  return request({
    url: "/toplist/detail"
  });
}
