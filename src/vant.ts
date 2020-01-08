import Vue from "vue";

import {
  Button,
  Toast,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Image,
  Lazyload,
  Popup,
  Loading,
  Icon,
  Field,
  CellGroup,
  Dialog,
  Notify
} from "vant";

Vue.use(Button);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Image);
Vue.use(Lazyload, {
  loading: require("./assets/images/default.png")
});
Vue.use(Popup);
Vue.use(Loading);
Vue.use(Icon);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Notify);
