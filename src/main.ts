import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vant";
import VConsole from "vconsole";
import Icon from "./components/Icon.vue";
import "./styles/index.less";
import "./utils/filters";

new VConsole();

Vue.config.productionTip = false;

Vue.component("icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
