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
