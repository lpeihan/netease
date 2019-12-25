<template>
  <div class="search">
    <div class="search-box">
      <icon name="back" @click="$router.go(-1)" />
      <icon name="delete" v-if="word" @click="clear" />

      <form>
        <input placeholder="搜索歌曲、歌手" id="input" v-model="word" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  word: string = "";

  clear() {
    this.word = "";
    document.getElementById("input").focus();
  }
}
</script>

<style lang="less" scoped>
@placeholder: rgba(@white, 0.5);

.search {
  &-box {
    height: 50px;
    background: @primary-color;
    display: flex;
    align-items: center;
    padding: 0 @padding-m;
    position: relative;

    .icon-back {
      color: @white;
      width: 26px;
      height: 26px;
    }

    .icon-delete {
      color: @white;
      position: absolute;
      right: 20px;
      width: 24px;
      height: 24px;
      color: @placeholder;
    }

    form {
      padding-left: 12px;
      flex: 1;

      #input {
        width: 100%;
        font-size: @font-size-m;
        height: 36px;
        border: none;
        padding-right: 24px;
        color: rgba(@white, 0.9);
        background: @primary-color;
        outline: none;
        &::placeholder {
          color: @placeholder;
        }
      }
    }
  }
}
</style>
