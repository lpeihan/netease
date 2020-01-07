<template>
  <div class="app">
    <transition :name="transitionName" :css="Boolean(transitionName)">
      <keep-alive :include="keepAlive">
        <router-view
          class="app-view"
          :key="$route.fullPath"
          :class="{ bottom: playlist.length }"
        />
      </keep-alive>
    </transition>

    <player v-show="$route.name !== 'login'" />
    <user-drawer ref="userDrawer" />
  </div>
</template>

<script lang="ts">
import { throttle } from "lodash";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import Player from "./views/player/Player.vue";
import UserDrawer from "./views/user/UserDrawer.vue";
import bus from "./utils/bus";

@Component({
  name: "app",
  components: {
    Player,
    UserDrawer
  }
})
export default class extends Vue {
  keepAlive: string[] = ["home"];
  transitionName: string = "slide-left";

  @Watch("$route")
  function(to: any, from: any) {
    if (to.meta.index > from.meta.index) {
      this.transitionName = "slide-left";
    } else if (to.meta.index < from.meta.index) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "van-fade";

      if (to.name === "search") {
        this.transitionName = "";
      }

      if (to.name === "comments") {
        this.transitionName = "";
      }
    }
  }

  @Getter("playlist") playlist: any;
  @Action("setScrollTop") setScrollTop: (val: number) => {};

  mounted() {
    const doc = document;

    // scroll top
    doc.addEventListener(
      "scroll",
      throttle(() => {
        this.setScrollTop(doc.documentElement.scrollTop || doc.body.scrollTop);
      }, 50)
    );

    bus.$on("open-drawer", () => (this.$refs.userDrawer as any).open());
  }
}
</script>

<style lang="less">
.app {
  height: 100%;
}

.app-view {
  position: relative;
  min-height: 100%;
  z-index: 1;
  background: @white;

  &.bottom {
    padding-bottom: 70px;
  }

  &.slide {
    &-left-enter,
    &-right-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    &-left-leave-to,
    &-right-enter {
      transform: translate3d(-100%, 0, 0);
    }

    &-left-enter-active,
    &-left-leave-active,
    &-right-enter-active,
    &-right-enter-active {
      transition: transform @transition-time;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
