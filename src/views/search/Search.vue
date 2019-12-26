<template>
  <div class="search">
    <div class="search-box">
      <icon name="back" @click="$router.go(-1)" />
      <icon name="delete" v-if="word" @click="clear" />

      <form>
        <input placeholder="搜索歌曲、歌手" id="input" v-model="word" />
      </form>
    </div>

    <div class="search-normal">
      <div class="hots-wrapper" v-if="hots.length">
        <div class="hots-title">热门搜索</div>
        <div class="hots-list">
          <div class="hot-item" v-for="hot in hots" :key="hot.first">
            {{ hot.first }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getHots } from "../../api/search";

@Component
export default class extends Vue {
  word: string = "";
  hots: any[] = [];

  clear() {
    this.word = "";
    document.getElementById("input").focus();
  }

  async getHots() {
    const res = await getHots();

    this.hots = res.data.result.hots;
  }

  async created() {
    this.getHots();
  }
}
</script>

<style lang="less" scoped>
@placeholder: rgba(@white, 0.5);
@header-height: 50px;

.search {
  padding-top: @header-height;

  &-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: @header-height;
    background: @primary-color;
    display: flex;
    align-items: center;
    padding: 0 @padding-m;

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

  &-normal {
    .hots-wrapper {
      padding: 20px 0 12px 15px;
      .hots-title {
        font-size: @font-size-m;
        margin-bottom: 12px;
        padding-left: 5px;
      }

      .hots-list {
        display: flex;
        flex-wrap: wrap;

        .hot-item {
          border: 1px solid @border-color;
          border-radius: 30px;
          padding: 4px 10px;
          margin: 0 10px 12px 0;
          position: relative;
          .active();
        }
      }
    }
  }
}
</style>
