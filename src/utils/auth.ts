import storage, { USER } from "./storage";

export function isLogin() {
  return Boolean(storage.getItem(USER));
}

export function getUid() {
  const user = storage.getItem(USER) || {};
  return user.account.id;
}
