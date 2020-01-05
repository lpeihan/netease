<template>
  <playlist-base
    title="推荐音乐"
    :image="require('../../assets/images/bg.jpeg')"
    :songs="songs"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getNewSong } from "../../api/playlist";
import PlaylistBase from "./PlaylistBase.vue";
import { createSong } from "../../services/song";

@Component({
  components: {
    PlaylistBase
  }
})
export default class extends Vue {
  songs: any[] = [];

  async getNewSong() {
    const res = await getNewSong();

    this.songs = res.data.result.map((item: any) => {
      return {
        id: item.id,
        singer: item.song.artists[0].name,
        name: item.name,
        image: item.picUrl,
        desc: item.song.album.name
      };
    });
  }

  created() {
    setTimeout(() => {
      this.getNewSong();
    }, 300);
  }
}
</script>

<style lang="less" scoped></style>
