<template>
  <div class="playlist">
    <icon name="back" @click="$router.go(-1)"></icon>
    <div class="navbar">
      <div
        class="filter"
        :style="{
          backgroundImage: `url(${playlist.picUrl})`,
          opacity: this.percent
        }"
      ></div>
      <div class="name" :style="{ opacity: this.percent }">
        {{ playlist.name }}
      </div>
    </div>

    <div class="playlist-header">
      <div
        class="filter"
        :style="{ backgroundImage: `url(${playlist.picUrl})` }"
      ></div>
      <img class="left-pic" :src="playlist.picUrl" />
      <div class="right-info">
        <div class="title">{{ playlist.name }}</div>

        <div class="desc">
          <img :src="avatar" class="avatar" />
          <span class="nickname">{{ nickname }}</span>
        </div>
      </div>
    </div>

    <div class="playlist-songs" v-if="songs.length">
      <div class="play-all van-hairline--bottom">
        <icon name="play" />
        播放全部 <span>({{ songs.length }}首)</span>
      </div>

      <ul class="list">
        <li class="item" v-for="(song, index) in songs" :key="index">
          <div class="left-index">{{ index + 1 }}</div>
          <div class="middle-info">
            <div class="name">{{ song.name }}</div>
            <div class="singer">{{ song.singer }} - {{ song.desc }}</div>
          </div>

          <div class="right-more"><icon name="more"></icon></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { getPlaylist } from "../../api/recommends";
import { createSong } from "../../services/song";
import storage from "../../utils/storage";
import { Getter } from "vuex-class";

@Component
export default class extends Vue {
  songs: any[] = [];
  avatar: string = "";
  nickname: string = "";
  percent: number = 0;
  playlist: any = storage.getItem("CURRENT_PLAYLIST") || {};

  @Getter("scrollTop") scrollTop: number;

  @Watch("scrollTop") function(val: number) {
    this.percent = Math.abs(val / (innerWidth * 0.6));
  }

  async getPlaylist() {
    const res = await getPlaylist(this.$route.params.id);
    const playlist = res.data.playlist;

    this.avatar = playlist.creator.avatarUrl;
    this.nickname = playlist.creator.nickname;
    this.songs = playlist.tracks.map((song: any) => {
      return createSong(song);
    });
  }

  created() {
    this.getPlaylist();
  }
}
</script>

<style lang="less" scoped>
.playlist {
  background: @white;

  .icon-back {
    position: fixed;
    top: 14px;
    left: @padding-l;
    width: 28px;
    height: 28px;
    color: @white;
    z-index: 3;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    line-height: 56px;
    align-items: center;
    color: @white;
    font-size: 17px;
    padding: 0 30px 0 50px;
    z-index: 2;
    text-align: center;
    .ellipsis();

    .filter {
      .bg-filter();
    }
  }
  &-header {
    padding: 60px @padding-l 40px;
    display: flex;
    position: relative;
    color: @white;

    .filter {
      .bg-filter(80px);
    }

    .left-pic {
      width: 140px;
      height: 140px;
      border-radius: @border-radius-m;
    }

    .right-info {
      padding-left: 10px;
      .title {
        font-size: 17px;
        margin-bottom: 20px;
      }

      .desc {
        display: flex;
        align-items: center;
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }

  &-songs {
    background: @white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .play-all {
      display: flex;
      padding: @padding-l;
      align-items: center;
      font-size: 15px;

      span {
        color: @text-color-2;
      }

      .icon-play {
        margin-right: 10px;
        color: @text-color-1;
      }
    }
    .list {
      .item {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .left-index {
          width: 50px;
          text-align: center;
          color: @text-color-1;
        }

        .middle-info {
          flex: 1;

          .name {
            margin-bottom: 10px;
          }

          .singer {
            font-size: @font-size-s;
            color: @text-color-2;
          }
        }

        .right-more {
          width: 50px;
          text-align: center;
          color: @text-color-2;
        }
      }
    }
  }
}
</style>
