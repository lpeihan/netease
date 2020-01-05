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
    selectPlay({ commit, state }, { list, index }) {
      const originalPlaylist = state.playlist.slice();

      // 删除重复歌曲
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < originalPlaylist.length; j++) {
          if (originalPlaylist[j].id === list[i].id) {
            originalPlaylist.splice(i, 1);
            j--;
          }
        }
      }
      commit(SET_PLAYLIST, list.concat(originalPlaylist));
      commit(SET_CURRENT_INDEX, index);
      commit(SET_FULL_SCREEN, true);
      commit(SET_PLAYING, true);
    },
    setPlaying({ commit }, playing) {
      commit(SET_PLAYING, playing);
    },
    setFullScreen({ commit }, fullScreen) {
      commit(SET_FULL_SCREEN, fullScreen);
    },
    deleteSong({ commit, state }, index) {
      const playlist = state.playlist.slice();

      playlist.splice(index, 1);

      commit(SET_PLAYLIST, playlist);
    },
    nextSong({ commit, state }) {
      let index = ++state.currentIndex;

      if (index >= state.playlist.length) {
        index = 0;
      }

      commit(SET_CURRENT_INDEX, index);
    },
    prevSong({ commit, state }) {
      let index = --state.currentIndex;

      if (index < 0) {
        index = state.playlist.length - 1;
      }

      commit(SET_CURRENT_INDEX, index);
    },
    clearPlaylist({ commit }) {
      commit(SET_FULL_SCREEN, false);
      commit(SET_PLAYLIST, []);
      commit(SET_CURRENT_INDEX, -1);
      commit(SET_PLAYING, false);
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
