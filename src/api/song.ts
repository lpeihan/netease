import request from "../utils/request";

export function getSong(id: string) {
  return request({
    url: "/song/url",
    params: {
      id
    },
    _loading: false
  });
}

export function getLyric(id: string) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  });
}

export function getComments(id: string, offset = 0) {
  return request({
    url: "/comment/music",
    params: {
      id,
      offset
    }
  });
}
