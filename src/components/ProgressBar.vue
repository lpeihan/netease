<template>
  <div class="progress-bar">
    <div class="current-time">{{ currentTime | time }}</div>
    <div class="bar" @click="click" ref="bar">
      <div class="progress" :style="{ width: offset }"></div>
      <div
        class="progress-btn"
        :style="{ transform: `translateX(${offset})` }"
      ></div>
    </div>
    <div class="duration">{{ duration | time }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { leftpad } from "../utils";
import { getRealSize } from "../utils/dom";

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

  clientWidth: number = getRealSize(236);

  get offset() {
    return this.clientWidth * this.percent + "px";
  }

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
    flex: 1;
    color: rgba(@white, 0.6);
  }

  .bar {
    height: 2px;
    position: relative;
    width: 236px;
    background: rgba(@white, 0.3);

    .progress {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(@white, 0.4);
    }

    .progress-btn {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(@white, 0.9);
      position: absolute;
      top: -2px;
      left: -3px;
    }
  }
}
</style>
