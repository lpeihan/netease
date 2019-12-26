import request from "../utils/request";

export function getHots() {
  return request({
    url: "/search/hot"
  });
}

export function getSuggests(keywords: string) {
  return request({
    url: "/search/suggest",
    params: {
      keywords
    }
  });
}
