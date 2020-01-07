<template>
  <div class="user-drawer">
    <van-popup v-model="show" position="left">
      <div class="theme-list">
        <van-radio-group v-model="color">
          <van-radio :name="c.color" v-for="c in colorList" :key="c.key">
            <span :style="{ color: c.color }">{{ c.key }}</span>
          </van-radio>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import replacer from "webpack-theme-color-replacer/client";

@Component
export default class extends Vue {
  show: boolean = false;
  color: string = "#fc2834";
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

  @Watch("color") onColor(val: string) {
    this.changeColor(val);
  }

  changeColor(val: string) {
    this.$toast.loading("正在设置主题中");
    const newColors = [val];

    replacer.changer
      .changeColor({ newColors }, Promise)
      .then(() => {
        this.$toast("主题切换成功");
      })
      .catch(() => {
        this.$toast("主题切换失败");
      });
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
