<template>
  <playlist-base
    title="我收藏的音乐"
    :image="require('../../assets/images/bg.jpeg')"
    :songs="favoriteList"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PlaylistBase from "../playlist/PlaylistBase.vue";
import storage, { FAVORITE_LIST } from "../../utils/storage";
import { Getter } from "vuex-class";

@Component({
  components: {
    PlaylistBase
  }
})
export default class extends Vue {
  @Getter("favoriteList") favoriteList: any[];
}
</script>

<style lang="less" scoped></style>
