<template>
  <div class="loading" v-if="value">
    <div class="loading-content">
      <img src="../assets/images/loading.gif" />
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
    default: "正在载入..."
  })
  message: string;

  @Prop({
    type: Boolean,
    default: false
  })
  value: boolean;
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
    text-align: center;

    img {
      width: 24px;
    }

    .message {
      font-size: @font-size-s;
      color: @text-color-2;
      margin-top: 5px;
    }
  }
}
</style>
