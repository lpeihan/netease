import Vue from "vue";
import Vuex from "vuex";

import {
  SET_SCROLL_TOP,
  SET_PLAYLIST,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING
} from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scrollTop: 0,
    playlist: [],
    currentIndex: -1,
    fullScreen: false,
    playing: false
  },
  mutations: {
    [SET_SCROLL_TOP](state, scrollTop) {
      state.scrollTop = scrollTop;
    },
    [SET_PLAYLIST](state, playlist) {
      state.playlist = playlist;
    },
    [SET_CURRENT_INDEX](state, currentIndex) {
      state.currentIndex = currentIndex;
    },
    [SET_FULL_SCREEN](state, fullScreen) {
      state.fullScreen = fullScreen;
    },
    [SET_PLAYING](state, playing) {
      state.playing = playing;
    }
  },
  actions: {
    setScrollTop({ commit }, scrollTop) {
      commit(SET_SCROLL_TOP, scrollTop);
    },
    selectPlay({ commit }, { list, index }) {
      commit(SET_PLAYLIST, list);
      commit(SET_CURRENT_INDEX, index);
      commit(SET_FULL_SCREEN, true);
      commit(SET_PLAYING, true);
    }
  },
  getters: {
    scrollTop: state => state.scrollTop,
    currentSong: state => state.playlist[state.currentIndex] || {},
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    fullScreen: state => state.fullScreen,
    playing: state => state.playing
  },
  modules: {}
});
