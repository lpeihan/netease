<template>
  <div class="app">
    <router-view class="app-view" />
  </div>
</template>

<style lang="less">
.app {
  height: 100%;
}

.app-view {
  position: relative;
  min-height: 100%;
  z-index: 1;
  background: @white;

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
