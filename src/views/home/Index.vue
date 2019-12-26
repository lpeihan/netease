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
          <recommends />
        </van-tab>
        <van-tab title="排行">
          <rank />
        </van-tab>
        <van-tab title="歌手">
          <singers />
        </van-tab>
      </van-tabs>
    </div>

    <user-drawer ref="userDrawer" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Recommends from "../recommends/Recommends.vue";
import Rank from "../rank/Rank.vue";
import Singers from "../singers/Singers.vue";
import UserDrawer from "../user/UserDrawer.vue";

@Component({
  name: "home",
  components: {
    Recommends,
    Rank,
    Singers,
    UserDrawer
  }
})
export default class extends Vue {
  active: number = 0;

  openUserDrawer() {
    (this.$refs.userDrawer as any).open();
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
}
</style>
