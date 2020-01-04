<template>
  <playlist-base
    :title="playlist.name"
    :image="playlist.picUrl || playlist.coverImgUrl"
    :avatar="avatar"
    :nickname="nickname"
    :songs="songs"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getPlaylist } from "../../api/playlist";
import { createSong } from "../../services/song";
import PlaylistBase from "./PlaylistBase.vue";
import storage, { CURRENT_PLAYLIST } from "../../utils/storage";

@Component({
  components: {
    PlaylistBase
  }
})
export default class extends Vue {
  songs: any[] = [];
  avatar: string = "";
  nickname: string = "";
  playlist: any = storage.getItem(CURRENT_PLAYLIST) || {};

  async getPlaylist() {
    const res = await getPlaylist(this.$route.params.id);
    const playlist = res.data.playlist;

    this.avatar = playlist.creator.avatarUrl;
    this.nickname = playlist.creator.nickname;
    this.songs = playlist.tracks.map((song: any) => {
      return createSong(song);
    });
  }

  created() {
    setTimeout(() => {
      this.getPlaylist();
    }, 300);
  }
}
</script>
