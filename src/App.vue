<template>
  <div class="app">
    <transition :name="transitionName" :css="Boolean(transitionName)">
      <keep-alive :include="keepAlive">
        <router-view class="app-view" :key="$route.fullPath" />
      </keep-alive>
    </transition>

    <player />
  </div>
</template>

<script lang="ts">
import { throttle } from "lodash";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
import Player from "./views/player/Player.vue";

@Component({
  name: "app",
  components: {
    Player
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
    }
  }

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
  padding-bottom: 70px;

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
