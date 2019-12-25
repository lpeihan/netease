import Vue from "vue";
import Vuex from "vuex";

import { SET_LOADING } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    [SET_LOADING](state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    setLoading({ commit }, loading) {
      commit(SET_LOADING, loading);
    }
  },
  getters: {
    loading: state => state.loading
  },
  modules: {}
});
