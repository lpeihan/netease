import request from "../utils/request";

export function getRanks() {
  return request({
    url: "/toplist/detail"
  });
}

export function getRanksDetail(id: number) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}
