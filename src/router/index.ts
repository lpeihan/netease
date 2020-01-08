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
      index: 5
    }
  },
  {
    path: "/singers/:id",
    component: () =>
      import(
        /* webpackChunkName: "singers" */ "../views/singers/SingersDetail.vue"
      ),
    meta: {
      index: 2
    }
  },
  {
    path: "/singers",
    component: () =>
      import(
        /* webpackChunkName: "singers" */ "../views/singers/SingersPage.vue"
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
      import(
        /* webpackChunkName: "newSong" */ "../views/playlist/PlaylistNew.vue"
      ),
    meta: {
      index: 2
    }
  },
  {
    path: "/music/:id/comments",
    name: "comments",
    component: () =>
      import(
        /* webpackChunkName: "comments" */ "../views/comments/Comments.vue"
      ),
    meta: {
      index: 6
    }
  },
  {
    path: "/user/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/Login.vue"),
    meta: {
      index: 3
    }
  },
  {
    path: "/user/history",
    name: "history",
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/user/History.vue"),
    meta: {
      index: 3
    }
  },
  {
    path: "/user/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName: "favorite" */ "../views/user/Favorite.vue"),
    meta: {
      index: 3
    }
  },
  {
    path: "/user/playlists",
    name: "userPlaylists",
    component: () =>
      import(
        /* webpackChunkName: "userPlaylists" */ "../views/user/Playlists.vue"
      ),
    meta: {
      index: 3
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
