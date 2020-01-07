<template>
  <div class="comments">
    <v-header title="评论" :theme="true" />

    <div class="song-wrapper">
      <img :src="currentSong.image" />
      <div class="song-info">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singer">{{ currentSong.singer }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import { getComments } from "../../api/song";
import { Getter } from "vuex-class";

@Component({
  components: {
    VHeader
  }
})
export default class extends Vue {
  @Getter("currentSong") currentSong: any;
}
</script>

<style lang="less" scoped>
.comments {
  z-index: 1001;
  padding-top: @header-height;

  .song-wrapper {
    display: flex;
    align-items: center;
    padding: @padding-m;

    img {
      width: 48px;
      height: 48px;
      border-radius: @border-radius;
    }

    .song-info {
      flex: 1;
      padding-left: 12px;

      .singer {
        color: @blue;
      }
    }
  }
}
</style>
