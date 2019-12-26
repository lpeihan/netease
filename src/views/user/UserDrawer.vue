<template>
  <div class="user-drawer">
    <van-popup v-model="show" position="left">
      内容
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  show: boolean = false;

  open() {
    this.show = true;
  }
}
</script>

<style lang="less" scoped>
.user-drawer {
  height: 100%;
  /deep/.van-popup--left {
    width: 275px;
    height: 100%;
  }
}
</style>
