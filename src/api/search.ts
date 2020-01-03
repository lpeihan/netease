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

export function searchSongs({
  keywords = "",
  offset = 0,
  limit = 20
}: {
  keywords: string;
  offset: number;
  limit?: number;
}) {
  return request({
    url: "/search",
    params: {
      keywords,
      offset,
      limit
    }
  });
}
