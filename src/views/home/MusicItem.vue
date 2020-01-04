<template>
  <div class="music-tab">
    <MusicGrid :list="list" />
    <InfiniteLoading @infinite="loadmore" immediate />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getMusicList, Cat } from "../../api/recommends";
import InfiniteLoading from "../../components/InfiniteLoading.vue";
import MusicGrid from "./MusicGrid.vue";

@Component({
  components: {
    InfiniteLoading,
    MusicGrid
  }
})
export default class extends Vue {
  list: any[] = [];
  page: number = 0;

  @Prop({ default: "" }) title: Cat;

  async loadmore(state: any) {
    try {
      ++this.page;
      const res = await getMusicList({ cat: this.title, limit: 30 });

      const list = res.data.playlists;

      if (this.page === 1 && list.length === 0) {
        state.complete();
        return;
      }

      if (list.length < 30) {
        state.loaded();
        state.complete();
      } else {
        state.loaded();
      }

      this.list = this.list.concat(list);
    } catch (err) {
      state.error();
    }
  }
}
</script>

<style lang="less" scoped>
.music-tab {
  padding-top: @padding-l;
}
</style>
