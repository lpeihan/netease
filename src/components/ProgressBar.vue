<template>
  <div class="progress-bar">
    <div class="current-time">{{ currentTime | time }}</div>
    <div class="bar" @click="click">
      <div class="progress" :style="{ width: percent + '%' }"></div>
    </div>
    <div class="duration">{{ duration | time }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { leftpad } from "../utils";

@Component({
  filters: {
    time(time: number) {
      time = time | 0;
      return `${(time / 60) | 0}:${leftpad(time % 60, 2, 0)}`; // minite:second
    }
  }
})
export default class extends Vue {
  @Prop({ default: 0 }) percent: number;
  @Prop({ default: 0 }) currentTime: number;
  @Prop({ default: 0 }) duration: number;

  click(e: any) {
    this.$emit("update", e.offsetX / e.target.clientWidth);
  }
}
</script>

<style lang="less" scoped>
.progress-bar {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 30px;

  .current-time,
  .duration {
    font-size: 12px;
    padding: 0 8px;
    color: rgba(@white, 0.5);
  }

  .bar {
    height: 2px;
    position: relative;
    flex: 1;
    border-radius: 5px;
    background: rgba(@white, 0.3);

    .progress {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(@white, 0.4);

      &::before {
        position: absolute;
        content: "";
        .size(30px, 30px);
        border-radius: 50%;
        right: -15px;
        top: -14px;
      }

      &::after {
        position: absolute;
        content: "";
        .size(12px, 12px);
        border: 4px solid @white;
        background: @primary-color;
        border-radius: 50%;
        right: -6px;
        top: -5px;
      }
    }
  }
}
</style>
