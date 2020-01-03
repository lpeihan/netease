<template>
  <div class="search">
    <div class="search-box">
      <icon name="back" @click="$router.go(-1)" />
      <icon name="delete" v-if="word" @click="clear" />

      <form @submit.prevent="search(word)">
        <input
          placeholder="搜索歌曲、歌手"
          id="input"
          v-model="word"
          autocomplete="off"
        />
      </form>
    </div>

    <div class="search-normal" v-if="hots.length">
      <div class="hots-wrapper" v-if="hots.length">
        <div class="hots-title">热门搜索</div>
        <div class="hots-list">
          <div class="hot-item" v-for="hot in hots" :key="hot.first">
            {{ hot.first }}
          </div>
        </div>
      </div>

      <div class="historys-wrapper" v-if="historys.length">
        <div class="historys-title">
          搜索历史
          <icon name="clear" @click="clearHistorys" />
        </div>

        <div class="historys-list">
          <div class="history-item" v-for="history in historys" :key="history">
            <icon name="clock" />
            <span class="name">{{ history }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getHots } from "../../api/search";
import storage from "../../utils/storage";
const SEARCH_HISTORYS = "SEARCH_HISTORYS";

@Component
export default class extends Vue {
  word: string = "";
  hots: any[] = [];
  historys: string[] = storage.getItem(SEARCH_HISTORYS) || [];

  clear() {
    this.word = "";
    document.getElementById("input").focus();
  }

  async getHots() {
    const res = await getHots();

    this.hots = res.data.result.hots;
  }

  pushHistory(word: string) {
    const index = this.historys.indexOf(word);

    if (index > -1) {
      this.historys.splice(index, 1);
    }

    this.historys.unshift(word);
    if (this.historys.length >= 10) {
      this.historys.length = 10;
    }

    storage.setItem(SEARCH_HISTORYS, this.historys);
  }

  clearHistorys() {
    this.historys = [];
    storage.removeItem(SEARCH_HISTORYS);
  }

  async search(word: string) {
    this.pushHistory(word);
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

    .historys-wrapper {
      padding: 0 18px;
      .historys-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @font-size-m;
        margin-bottom: 12px;

        .icon-clear {
          color: @text-color-2;
          width: 18px;
          height: 18px;
        }
      }

      .historys-list {
        .history-item {
          display: flex;
          align-items: center;
          padding: 10px 0;

          .icon-clock {
            color: @text-color-2;
          }

          .name {
            margin-left: 6px;
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
