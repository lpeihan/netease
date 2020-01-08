<template>
  <div class="loading" v-show="show">
    <div class="loading-content">
      <img src="../../assets/images/loading2.gif" />
      <div class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({
    type: String,
    default: "努力加载中..."
  })
  message: string;

  show: boolean = false;
}
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 24px;
      height: 20px;
    }

    .message {
      font-size: @font-size-s + 1;
      color: @text-color-1;
      margin-left: 4px;
    }
  }
}
</style>
