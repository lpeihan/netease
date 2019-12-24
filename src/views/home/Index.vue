<template>
  <div class="home">
    <div class="home-header">
      <icon name="menu"></icon>

      <div class="header-middle">
        <icon name="logo"></icon>
      </div>

      <icon name="search"></icon>
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
          <recommends />
        </van-tab>
        <van-tab title="排行">排行</van-tab>
        <van-tab title="歌手">歌手</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Recommends from "./Recommends.vue";

@Component({
  components: {
    Recommends
  }
})
export default class extends Vue {
  active: number = 0;
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;

  &-header {
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
}
</style>
