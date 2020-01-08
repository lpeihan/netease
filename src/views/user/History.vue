<template>
  <playlist-base
    title="播放历史"
    :image="require('../../assets/images/bg.jpeg')"
    :songs="playHistory"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PlaylistBase from "../playlist/PlaylistBase.vue";
import storage, { PLAY_HISTORY } from "../../utils/storage";
import { Getter } from "vuex-class";

@Component({
  components: {
    PlaylistBase
  }
})
export default class extends Vue {
  @Getter("playHistory") playHistory: any[];
}
</script>

<style lang="less" scoped></style>
