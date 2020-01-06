<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      ></circle>
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      ></circle>
    </svg>

    <div class="circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: 32 }) radius: number;
  @Prop({ default: 0 }) percent: number;

  dashArray: number = Math.PI * 100;

  get dashOffset() {
    return Math.max(1 - this.percent, 0) * this.dashArray;
  }
}
</script>

<style lang="less" scoped>
.progress-circle {
  position: relative;
  display: inline-block;
  line-height: 1;

  circle {
    stroke-width: 4px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
      stroke: #999;
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: @primary-color;
    }
  }

  .circle-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: @font-size-s;
  }
}
</style>
