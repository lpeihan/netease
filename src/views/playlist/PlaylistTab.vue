<template>
  <div class="playlist-tab">
    <playlist-grid :list="list" />
    <infinite-loading @infinite="loadmore" immediate />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getPlaylists, Cat } from "../../api/playlist";
import InfiniteLoading from "../../components/InfiniteLoading.vue";
import PlaylistGrid from "./PlaylistGrid.vue";

@Component({
  components: {
    InfiniteLoading,
    PlaylistGrid
  }
})
export default class extends Vue {
  list: any[] = [];
  page: number = 0;

  @Prop({ default: "" }) title: Cat;

  async loadmore(state: any) {
    try {
      ++this.page;
      const res = await getPlaylists({ cat: this.title, limit: 30 });

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
.playlist-tab {
  padding-top: @padding-l;
}
</style>
