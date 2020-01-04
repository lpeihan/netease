import request from "../utils/request";

export function getBanners() {
  return request({
    url: "/banner"
  });
}

export function getPersonalized() {
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

export type Cat = "华语" | "古风" | "欧美" | "流行" | "轻音乐" | "民谣";

export function getPlaylists(
  data: {
    cat?: Cat;
    limit?: number;
    before?: number;
  } = { cat: "华语", limit: 30 }
) {
  return request({
    url: "/top/playlist/highquality",
    params: {
      ...data
    },
    _loading: false
  });
}

export function getNewSong() {
  return request({
    url: "/personalized/newsong"
  });
}
