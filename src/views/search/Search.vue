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

    <div class="search-normal" v-if="isSearch">
      <div class="song-list">
        <div class="song-item" v-for="item in list" :key="item.id">
          <div class="name">{{ item.name }}</div>
          <div class="desc">
            <span class="singer">
              {{ item.artists.map(i => i.name).join("/") }}
            </span>
            -
            <span class="alias">{{ item.album.name }}</span>
          </div>
        </div>
      </div>

      <InfiniteLoading @infinite="loadmore" immediate />
    </div>

    <div class="search-other" v-else-if="hots.length">
      <div class="hots-wrapper" v-if="hots.length">
        <div class="hots-title">热门搜索</div>
        <div class="hots-list">
          <div
            class="hot-item"
            v-for="hot in hots"
            :key="hot.first"
            @click="clickHot(hot.first)"
          >
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
          <div
            class="history-item"
            v-for="history in historys"
            :key="history"
            @click="clickHistory(history)"
          >
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
import { getHots, searchSongs } from "../../api/search";
import storage from "../../utils/storage";
const SEARCH_HISTORYS = "SEARCH_HISTORYS";
import InfiniteLoading from "../../components/InfiniteLoading.vue";

@Component({
  components: {
    InfiniteLoading
  }
})
export default class extends Vue {
  word: string = "";
  hots: any[] = [];
  list: any[] = [];
  page: number = 0;
  isSearch: boolean = false;
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

  pushSearch() {
    if (this.word === "") {
      return;
    }

    if (this.word === this.$route.query.word) {
      this.search();
    } else {
      this.$router.replace({ name: "search", query: { word: this.word } });
    }
  }

  clickHistory(word: string) {
    this.word = word;
    this.pushSearch();
  }

  clickHot(word: string) {
    this.word = word;
    this.pushSearch();
  }

  async search() {
    if (this.word === "") {
      return;
    }
    this.isSearch = false;
    this.page = 0;
    this.list = [];
    this.pushHistory(this.word);

    this.$nextTick(() => {
      this.isSearch = true;
    });
  }

  async loadmore(state: any) {
    if (this.word === "") {
      return;
    }

    try {
      ++this.page;
      const res = await searchSongs({
        keywords: this.word,
        offset: this.list.length
      });

      const list = res.data.result.songs;

      if (this.page === 1 && list.length === 0) {
        state.complete();
        return;
      }

      if (list.length < 20) {
        state.loaded();
        state.complete();
      } else {
        state.loaded();
      }

      this.list = this.list.concat(list);
    } catch (err) {
      state.complete();
    }
  }

  async created() {
    this.getHots();

    if (this.$route.query.word) {
      this.word = `${this.$route.query.word}`;
      this.search();
    }
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
    z-index: 10;

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
    .song-list {
      .song-item {
        padding: @padding-l;
        position: relative;

        .name {
          font-size: 15px;
        }

        .desc {
          color: @text-color-2;
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
  }

  &-other {
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
