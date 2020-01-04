<template>
  <div class="playlists">
    <v-header title="歌单广场" />

    <van-tabs animated swipeable line-width="0.8rem">
      <van-tab v-for="tab in tabs" :key="tab.cid" :title="tab.title">
        <playlist-tab :title="tab.title" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import PlaylistTab from "./PlaylistTab.vue";

@Component({
  components: {
    VHeader,
    PlaylistTab
  }
})
export default class extends Vue {
  tabs: any[] = [
    { cat: 1, title: "华语" },
    { cat: 9, title: "古风" },
    { cat: 2, title: "欧美" },
    { cat: 6, title: "流行" },
    { cat: 4, title: "轻音乐" },
    { cat: 10, title: "民谣" },
    { cat: 11, title: "摇滚" }
  ];
}
</script>

<style lang="less" scoped>
.playlists {
  padding-top: @header-height;

  /deep/.van-tab--active {
    color: @primary-color;
    font-weight: normal;
  }

  /deep/.van-tabs__line {
    background-color: @primary-color;
    height: 2px;
  }

  /deep/.van-tab__text {
    font-size: 15px;
  }
}
</style>
