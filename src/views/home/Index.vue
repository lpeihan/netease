<template>
  <div class="home">
    <div class="home-header">
      <icon name="menu" @click="openUserDrawer"></icon>

      <div class="header-middle">
        <icon name="logo"></icon>
      </div>

      <icon name="search" @click="$router.push('/search')"></icon>
    </div>

    <div class="home-tabs">
      <van-tabs
        v-model="active"
        :border="false"
        swipeable
        animated
        line-width="1.1rem"
      >
        <van-tab title="推荐">
          <div class="recommends" v-if="banners.length && personalizeds.length">
            <div class="recommends-banners">
              <van-swipe :autoplay="3000">
                <van-swipe-item
                  v-for="banner in banners"
                  :key="banner.imageUrl"
                >
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

            <playlist-grid title="推荐歌单" :list="personalizeds" />
          </div>
        </van-tab>

        <van-tab title="排行"><rank /></van-tab>

        <van-tab title="歌手"><singers /></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Rank from "../rank/Rank.vue";
import Singers from "../singers/Singers.vue";
import UserDrawer from "../user/UserDrawer.vue";
import { getBanners, getPersonalized } from "../../api/playlist";
import PlaylistGrid from "../playlist/PlaylistGrid.vue";
import bus from "../../utils/bus";

@Component({
  name: "home",
  components: {
    Rank,
    Singers,
    UserDrawer,
    PlaylistGrid
  }
})
export default class extends Vue {
  active: number = 0;
  banners: any = [];
  personalizeds: any = [];
  entries: any = [
    { text: "歌单广场", icon: "disc", to: "/playlists" },
    { text: "排行榜", icon: "rank", to: "/rank" },
    { text: "推荐音乐", icon: "calendar", to: "/new-song" },
    { text: "歌手", icon: "singer", to: "/singers" }
  ];

  openUserDrawer() {
    bus.$emit("open-drawer");
  }

  async getBanners() {
    const res = await getBanners();

    this.banners = res.data.banners;
  }

  async getPersonalized() {
    const res = await getPersonalized();

    this.personalizeds = res.data.result;
  }

  created() {
    this.getBanners();
    this.getPersonalized();
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;

  &-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 0 @padding-l;
    height: 50px;
    color: @white;
    background: @primary-color;

    .icon-menu {
      .size(18px, 18px);
    }

    .header-middle {
      flex: 1;
      text-align: center;

      .icon-logo {
        color: rgba(@white, 0.7);
        .size(24px, 24px);
      }
    }
  }

  &-tabs {
    /deep/.van-tabs {
      .van-tabs__wrap {
        position: sticky;
        top: 49px;
        z-index: 10;
      }

      .van-tabs__nav {
        background: @primary-color;

        .van-tab {
          color: @white;
          font-size: @font-size-m;
        }

        .van-tab--active {
          color: @white;
        }
      }

      .van-tabs__line {
        background-color: @white;
        bottom: 22px;
        height: 2px;
      }
    }
  }

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
  }
}
</style>
