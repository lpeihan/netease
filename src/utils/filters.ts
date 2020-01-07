import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("date", (val: number) => {
  return dayjs(val).format("YY-MM-DD");
});
