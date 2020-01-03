<template>
  <playlist
    :title="
      playlist.alias ? playlist.name + ' ' + playlist.alias : playlist.name
    "
    :image="playlist.avatar"
    :songs="songs"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Playlist from "../playlist/Playlist.vue";
import { getSingersDetail } from "../../api/singers";
import { createSong } from "../../services/song";
import storage from "../../utils/storage";

@Component({
  components: {
    Playlist
  }
})
export default class extends Vue {
  playlist: any = storage.getItem("CURRENT_PLAYLIST") || {};
  songs: any[] = [];

  async getSingerDetail() {
    const res = await getSingersDetail(this.playlist.id);
    this.songs = res.data.hotSongs.map((song: any) => {
      return createSong(song);
    });
  }

  created() {
    this.getSingerDetail();
  }
}
</script>

<style lang="less" scoped></style>
