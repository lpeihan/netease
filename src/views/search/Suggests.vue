<template>
  <transition name="van-fade">
    <div class="suggests" v-if="suggests.length">
      <div
        class="suggests-item van-hairline--bottom"
        v-for="(suggest, index) in suggests"
        :key="index"
        @click="handleClick(suggest)"
      >
        <icon name="search" />
        <span v-html="highlight(suggest.name)"></span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: (): any[] => [] }) suggests: any[];
  @Prop({ default: "" }) word: string;
  @Prop({ default: () => {} }) search: () => {};

  handleClick(suggest: any) {
    this.$emit("update:word", suggest.name);
    this.search();
  }

  highlight(text: string, word = this.word) {
    const reg = new RegExp(word, "g");
    return text.replace(reg, `<span style="color: #1989fa;">${word}</span>`);
  }
}
</script>

<style lang="less" scoped>
.suggests {
  position: fixed;
  z-index: 10;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: @white;

  &-item {
    padding: 15px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 15px;
    .active();

    .icon-search {
      color: @text-color-3;
      margin-right: 12px;
    }
  }
}
</style>
