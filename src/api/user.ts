import request from "../utils/request";

export function login({
  phone,
  password
}: {
  phone: string;
  password: string;
}) {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      password
    }
  });
}

export function getUserPlaylist(uid: string | number) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  });
}
