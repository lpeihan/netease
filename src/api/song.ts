import request from "../utils/request";

export function getSong(id: number) {
  return request({
    url: "/song/url",
    params: {
      id
    }
  });
}

export function getLyric(id: number) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  });
}

export function getComments(id: number, offset = 0) {
  return request({
    url: "/comment/music",
    params: {
      id,
      offset
    }
  });
}
