import Vue from "vue";
import Vuex from "vuex";

import { SET_LOADING, SET_SCROLL_TOP } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    scrollTop: 0
  },
  mutations: {
    [SET_LOADING](state, loading) {
      state.loading = loading;
    },
    [SET_SCROLL_TOP](state, scrollTop) {
      state.scrollTop = scrollTop;
    }
  },
  actions: {
    setLoading({ commit }, loading) {
      commit(SET_LOADING, loading);
    },
    setScrollTop({ commit }, scrollTop) {
      commit(SET_SCROLL_TOP, scrollTop);
    }
  },
  getters: {
    loading: state => state.loading,
    scrollTop: state => state.scrollTop
  },
  modules: {}
});
