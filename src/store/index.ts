import Vue from "vue";
import Vuex from "vuex";
import storage, {
  PLAYLIST,
  CURRENT_INDEX,
  USER,
  PLAY_HISTORY,
  FAVORITE_LIST
} from "../utils/storage";

import {
  SET_SCROLL_TOP,
  SET_PLAYLIST,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING,
  SET_USER,
  SET_FAVORITE_LIST,
  SET_PLAY_HISTORY
} from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scrollTop: 0,
    playlist: storage.getItem(PLAYLIST) || [],
    currentIndex: storage.getItem(CURRENT_INDEX),
    fullScreen: false,
    playing: false,
    user: storage.getItem(USER) || {},
    favoriteList: storage.getItem(FAVORITE_LIST) || [],
    playHistory: storage.getItem(PLAY_HISTORY) || []
  },
  mutations: {
    [SET_SCROLL_TOP](state, scrollTop) {
      state.scrollTop = scrollTop;
    },
    [SET_PLAYLIST](state, playlist) {
      state.playlist = playlist;
      storage.setItem(PLAYLIST, playlist);
    },
    [SET_CURRENT_INDEX](state, currentIndex) {
      state.currentIndex = currentIndex;
      storage.setItem(CURRENT_INDEX, currentIndex);
    },
    [SET_FULL_SCREEN](state, fullScreen) {
      state.fullScreen = fullScreen;
    },
    [SET_PLAYING](state, playing) {
      state.playing = playing;
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_FAVORITE_LIST](state, list) {
      state.favoriteList = list;
    },
    [SET_PLAY_HISTORY](state, list) {
      state.playHistory = list;
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
            originalPlaylist.splice(j, 1);
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
    },
    setUser({ commit }, user) {
      commit(SET_USER, user);
    },
    logout({ commit }) {
      storage.setItem(USER, {});
      commit(SET_USER, {});
    },
    saveFavoriteList({ commit, state }, song) {
      const favoriteList = state.favoriteList.slice();

      const index = favoriteList.findIndex((item: any) => item.id === song.id);

      if (index > -1) {
        favoriteList.splice(index, 1);
      }

      favoriteList.unshift(song);

      if (favoriteList.length > 100) {
        favoriteList.pop();
      }

      storage.setItem(FAVORITE_LIST, favoriteList);
      commit(SET_FAVORITE_LIST, favoriteList);
    },

    deleteFavoriteList({ commit, state }, song) {
      const favoriteList = state.favoriteList.slice();

      const index = favoriteList.findIndex((item: any) => song.id === item.id);

      favoriteList.splice(index, 1);

      storage.setItem(FAVORITE_LIST, favoriteList);
      commit(SET_FAVORITE_LIST, favoriteList);
    },

    savePlayHistory({ commit, state }, song) {
      const playHistory = state.playHistory.slice();

      const index = playHistory.findIndex((item: any) => item.id === song.id);

      if (index > -1) {
        playHistory.splice(index, 1);
      }

      playHistory.unshift(song);

      if (playHistory.length >= 100) {
        playHistory.length = 100;
      }

      storage.setItem(PLAY_HISTORY, playHistory);
      commit(SET_PLAY_HISTORY, playHistory);
    }
  },
  getters: {
    scrollTop: state => state.scrollTop,
    currentSong: state => state.playlist[state.currentIndex] || {},
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    fullScreen: state => state.fullScreen,
    playing: state => state.playing,
    user: state => state.user,
    isLogin: state => Boolean(state.user.profile),
    playHistory: state => state.playHistory,
    favoriteList: state => state.favoriteList
  },
  modules: {}
});
