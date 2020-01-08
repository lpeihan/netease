<template>
  <playlist-base
    title="我收藏的音乐"
    :image="require('../../assets/images/bg.jpeg')"
    :songs="songs"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PlaylistBase from "../playlist/PlaylistBase.vue";
import storage, { FAVORITE_LIST } from "../../utils/storage";

@Component({
  components: {
    PlaylistBase
  }
})
export default class extends Vue {
  songs: any[] = storage.getItem(FAVORITE_LIST) || [];
}
</script>

<style lang="less" scoped></style>
