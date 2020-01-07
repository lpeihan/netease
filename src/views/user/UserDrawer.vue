<template>
  <div class="user-drawer">
    <van-popup v-model="show" position="left">
      <div class="theme-wrapper">
        <div class="theme-title">主题切换</div>
        <div class="theme-list">
          <div
            class="theme-item"
            v-for="c in colorList"
            :key="c.key"
            :style="{
              backgroundColor: c.color
            }"
            @click="changeColor(c.color)"
          >
            <van-icon
              name="success"
              v-show="c.color === color"
              color="white"
              size="24px"
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import replacer from "webpack-theme-color-replacer/client";
import storage, { CURRENT_THEME } from "../../utils/storage";

@Component
export default class extends Vue {
  show: boolean = false;
  color: string = storage.getItem(CURRENT_THEME) || "#fc2834";
  colorList: any = [
    { key: "默认", color: "#fc2834" },
    { key: "薄暮", color: "#f7234f" },
    { key: "火山", color: "#FA541C" },
    { key: "日暮", color: "#FAAD14" },
    { key: "明青", color: "#13C2C2" },
    { key: "极光绿", color: "#52C41A" },
    { key: "拂晓蓝", color: "#1890FF" },
    { key: "极客蓝", color: "#2F54EB" },
    { key: "酱紫", color: "#722ED1" }
  ];

  open() {
    this.show = true;
  }

  close() {
    setTimeout(() => {
      this.show = false;
    }, 300);
  }

  changeColor(val: string) {
    this.$toast.loading("正在设置主题中");
    const newColors = [val];

    replacer.changer
      .changeColor({ newColors }, Promise)
      .then(() => {
        this.$toast("主题切换成功");
        this.color = val;
        storage.setItem(CURRENT_THEME, val);
        this.close();
      })
      .catch(() => {
        this.$toast("主题切换失败");
        this.close();
      });
  }

  created() {
    replacer.changer.changeColor({ newColors: [this.color] }, Promise);
  }
}
</script>

<style lang="less" scoped>
.user-drawer {
  height: 100%;
  /deep/.van-popup--left {
    width: 275px;
    height: 100%;
    padding: @padding-l;
  }

  .theme-wrapper {
    .theme-title {
      font-size: @font-size-m + 1;
      font-weight: 500;
      margin-bottom: 16px;
      color: @primary-color;
    }
    .theme-list {
      display: flex;
      flex-wrap: wrap;
      .theme-item {
        border-radius: @border-radius;
        width: 34px;
        height: 34px;
        margin-bottom: 16px;
        margin-right: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
