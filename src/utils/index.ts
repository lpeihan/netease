export function leftpad(
  str: string | number,
  len: number,
  ch: string | number = " "
) {
  str = `${str}`;

  for (let i = str.length; i < len; i++) {
    str = ch + str;
  }

  return str;
}

// 获取 query
export function getQueryString(name: string): string {
  const res = location.href.match(new RegExp("[?&]" + name + "=([^&#]+)", "i"));

  if (res == null || res.length < 1) {
    return null;
  }

  return decodeURIComponent(res[1]);
}

// 打乱一个数组
export function shuffle(array: any[]): any[] {
  const items = array.slice();
  let t, r, i;

  for (i = items.length - 1; i > 0; i--) {
    r = Math.round(Math.random() * i);

    t = items[i];
    items[i] = items[r];
    items[r] = t;
  }

  return items;
}

// 把一个对象转换成 url
export function stringify(data: any): string {
  let url = "";
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + encodeURIComponent(value);
  }
  return url ? url.substring(1) : "";
}
