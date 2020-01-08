type StoreType = "localStorage" | "sessionStorage";

class Store {
  store: any;

  constructor(type: StoreType) {
    this.store = window[type];
  }

  serialize(val: any) {
    return JSON.stringify(val);
  }

  deserialize(val: any) {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  }

  setItem(key: string, val: any) {
    this.store.setItem(key, this.serialize(val));
  }

  getItem(key: string) {
    return this.deserialize(this.store.getItem(key));
  }

  removeItem(key: string) {
    this.store.removeItem(key);
  }

  clear() {
    this.store.clear();
  }

  getAll() {
    const store = this.store;
    const ret: { [propName: string]: string } = {};

    for (let i = 0; i < this.store.length; i++) {
      const key = store.key(i);
      ret[key] = this.getItem(key);
    }

    return ret;
  }
}

const store = new Store("localStorage");
export const session = new Store("sessionStorage");

export default store;

// constants
export const CURRENT_PLAYLIST = "CURRENT_PLAYLIST";
export const PLAYLIST = "PLAYLIST";
export const CURRENT_INDEX = "CURRENT_INDEX";
export const CURRENT_THEME = "CURRENT_THEME";
export const USER = "USER";
export const PLAY_HISTORY = "PLAY_HISTORY";
export const FAVORITE_LIST = "FAVORITE_LIST";
