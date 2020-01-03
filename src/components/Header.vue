<template>
  <div class="header">
    <icon name="back" @click="$router.go(-1)" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: "网易云音乐" }) title: string;
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: @header-height;
  display: flex;
  z-index: 10;
  align-items: center;
  padding: 0 @padding-l;
  background: @white;

  .icon-back {
    color: @text-color;
  }

  .title {
    font-size: @font-size-m + 1;
    margin-left: 15px;
  }
}
</style>
