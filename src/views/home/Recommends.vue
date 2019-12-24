<template>
  <div class="recommends">
    <div class="recommends-banners">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="banner in banners" :key="banner.imageUrl">
          <img :src="banner.imageUrl" class="banner-item" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="recommends-playlist">
      <div class="title">推荐歌单</div>

      <div class="playlist-wrapper">
        <div
          class="song-item"
          v-for="(recommend, index) in recommends"
          :key="index"
        >
          <img :src="recommend.picUrl" class="pic" />

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

@Component
export default class extends Vue {
  banners: any[] = [
    {
      imageUrl:
        "http://p1.music.126.net/BWAofrAd5vwt5mEjZla6wg==/109951164575877182.jpg"
    },
    {
      imageUrl:
        "http://p1.music.126.net/OVf9CfmSlmwCTLrC_ootrA==/109951164575822889.jpg"
    }
  ];

  recommends: any[] = [];

  async getBanners() {
    const res = await getBanners();

    this.banners = res.data.banners;
  }

  async getRecommends() {
    const res = await getRecommends();

    this.recommends = res.data.result;
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
    padding: @padding 0;
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
      border-radius: @border-radius-m;
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
        }

        .name {
          font-size: 13px;
          .multi-ellipsis(2);
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
