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
    path: "/playlist/:id",
    component: () =>
      import(
        /* webpackChunkName: "playlist" */ "../views/playlist/PlaylistPage.vue"
      ),
    meta: {
      index: 3
    }
  },
  {
    path: "/singers/:id",
    component: () =>
      import(
        /* webpackChunkName: "playlist" */ "../views/singers/SingersPage.vue"
      ),
    meta: {
      index: 2
    }
  },
  {
    path: "/rank",
    component: () =>
      import(/* webpackChunkName: "rank" */ "../views/rank/RankPage.vue"),
    meta: {
      index: 2
    }
  },
  {
    path: "/playlists",
    component: () =>
      import(
        /* webpackChunkName: "playlists" */ "../views/playlist/Playlists.vue"
      ),
    meta: {
      index: 2
    }
  },
  {
    path: "/new-song",
    component: () =>
      import(/* webpackChunkName: "newSong" */ "../views/home/NewSong.vue"),
    meta: {
      index: 2
    }
  }
];

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  routes
});

export default router;
