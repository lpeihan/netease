import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search/Search.vue"),
    meta: {
      index: 2
    }
  },
  {
    path: "/recommends/:id",
    component: () =>
      import(
        /* webpackChunkName: "recommends" */ "../views/recommends/List.vue"
      ),
    meta: {
      index: 2
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
