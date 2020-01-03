<template>
  <div class="recommends" v-if="banners.length && recommends.length">
    <div class="recommends-banners">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="banner in banners" :key="banner.imageUrl">
          <img :src="banner.imageUrl" class="banner-item" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <ul class="recommends-entry van-hairline--bottom">
      <li
        class="entry-item"
        v-for="(entry, index) in entries"
        :key="index"
        @click="$router.push(entry.to)"
      >
        <div class="circle">
          <icon :name="entry.icon"></icon>
        </div>
        <p class="text">{{ entry.text }}</p>
      </li>
    </ul>

    <div class="recommends-playlist">
      <div class="title">推荐歌单</div>

      <div class="playlist-wrapper">
        <div
          class="song-item"
          v-for="(recommend, index) in recommends"
          :key="index"
          @click="select(recommend)"
        >
          <img class="pic" v-lazy="recommend.picUrl" />

          <div class="name">
            {{ recommend.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getBanners, getRecommends } from "../../api/recommends";
import storage, { CURRENT_PLAYLIST } from "../../utils/storage";

@Component
export default class extends Vue {
  banners: any = [];
  recommends: any = [];
  entries: any = [
    { text: "私人fm", icon: "fm", to: "/rank" },
    { text: "每日推荐", icon: "calendar", to: "/rank" },
    { text: "歌单", icon: "disc", to: "/rank" },
    { text: "排行榜", icon: "rank", to: "/rank" }
  ];

  async getBanners() {
    const res = await getBanners();

    this.banners = res.data.banners;
  }

  async getRecommends() {
    const res = await getRecommends();

    this.recommends = res.data.result;
  }

  select(item: any) {
    this.$router.push("/playlist/" + item.id);
    storage.setItem(CURRENT_PLAYLIST, item);
  }

  created() {
    this.getBanners();
    this.getRecommends();
  }
}
</script>

<style lang="less" scoped>
.recommends {
  &-banners {
    padding: 7px 0;
    min-height: 145px;
    background: linear-gradient(
      @primary-color,
      @primary-color 70%,
      @white 70%,
      @white
    );

    /deep/.van-swipe-item {
      border-radius: @border-radius-m;
      padding: 0 @padding;
      overflow: hidden;
    }

    /deep/.van-swipe__indicator--active {
      background-color: @primary-color;
    }

    .banner-item {
      display: block;
      border-radius: @border-radius-m;
    }
  }

  &-entry {
    display: flex;
    padding: 8px 0 12px;

    .entry-item {
      flex: 1;
      text-align: center;

      .circle {
        .size(42px, 42px);
        background: linear-gradient(90deg, #fb5a52, @primary-color);
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: @white;

        .icon {
          .size(22px, 22px);
        }
      }
      .text {
        margin-top: 8px;
      }
    }
  }

  &-playlist {
    .title {
      font-size: @font-size-m;
      padding: @padding;
    }

    .playlist-wrapper {
      display: flex;
      padding: 0 @padding;
      flex-wrap: wrap;

      .song-item {
        width: calc(33.33% - 7px);
        margin: 0 @padding @padding-l 0;

        .pic {
          border-radius: @border-radius-m;
          overflow: hidden;

          &:active {
            opacity: 0.85;
          }
        }

        .name {
          font-size: 13px;
          .multi-ellipsis(2);
          min-height: 36px;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
