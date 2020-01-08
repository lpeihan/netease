<template>
  <div class="playlist">
    <icon name="back" @click="$router.go(-1)"></icon>

    <div class="navbar" :style="{ opacity: this.percent }">
      <div class="filter" :style="{ backgroundImage: `url(${image})` }"></div>
      {{ title }}
    </div>

    <div class="playlist-header">
      <div class="filter" :style="{ backgroundImage: `url(${image})` }"></div>
      <img class="left-pic" :src="image" />
      <div class="right-info">
        <div class="title">{{ title }}</div>

        <div class="desc" v-if="avatar">
          <img :src="avatar" class="avatar" />
          <span class="nickname">{{ nickname }}</span>
        </div>
      </div>
    </div>

    <div class="playlist-songs" v-if="songs.length">
      <div class="play-all van-hairline--bottom" @click="playAll">
        <icon name="play" />
        播放全部 <span>({{ songs.length }}首)</span>
      </div>

      <ul class="list">
        <li
          class="item"
          v-for="(song, index) in songs"
          :key="index"
          @click="select(index)"
        >
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
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class extends Vue {
  percent: number = 0;

  @Prop({ default: "" }) image: string;
  @Prop({ default: "" }) title: string;
  @Prop({ default: "" }) avatar: string;
  @Prop({ default: "" }) nickname: string;
  @Prop({ default: (): any[] => [] }) songs: any[];

  @Getter("scrollTop") scrollTop: number;
  @Getter("playlist") playlist: any;

  @Action("selectPlay") selectPlay: (payload: {
    list: any[];
    index?: number;
  }) => {};

  @Watch("scrollTop") function(val: number) {
    this.percent = Math.abs(val / (innerWidth * 0.6));
  }

  select(index: number) {
    this.selectPlay({ list: [this.songs[index]], index: 0 });
  }

  playAll() {
    if (this.songs.length) {
      this.selectPlay({ list: [...this.songs], index: 0 });
    }
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
      width: 132px;
      height: 132px;
      border-radius: @border-radius-m;
    }

    .right-info {
      padding-left: 15px;
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
    overflow: hidden;
    min-height: 500px;

    .play-all {
      display: flex;
      padding: @padding-l;
      align-items: center;
      font-size: 15px;
      .active();

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
        position: relative;
        .active();

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
