<template>
  <van-popup v-model="show" position="bottom" round>
    <div class="player-playlist">
      <div class="header van-hairline--bottom">
        <div class="mode-wrapper" @click="changeMode">
          <icon :name="mode" />
          <div class="mode">
            {{ modeText }} <span>({{ playlist.length }}首)</span>
          </div>
        </div>

        <icon name="clear" @click="clearPlaylist" />
      </div>

      <ul class="song-list">
        <li
          class="song-item"
          v-for="(item, index) in playlist"
          :key="item.id"
          :class="{ active: item.id === currentSong.id }"
        >
          <div class="name-wrapper">
            <span class="name">{{ item.name }}</span>
            <span class="singer">- {{ item.singer }}</span>
          </div>

          <icon name="delete" @click="deleteSong(index)" />
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class extends Vue {
  @Prop({ default: "" }) modeText: string;
  @Prop({ default: "" }) mode: string;
  @Prop({}) changeMode: () => {};

  show: boolean = false;

  @Getter("playlist") playlist: any;
  @Getter("currentSong") currentSong: any;

  @Action("deleteSong") deleteSong: any;
  @Action("clearPlaylist") clearPlaylist: any;

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
</script>

<style lang="less" scoped>
.player-playlist {
  max-height: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: 0 @padding-l;
    position: relative;
    height: 50px;
    .mode-wrapper {
      flex: 1;
      display: flex;
      align-items: center;

      .mode {
        margin-left: 5px;
        span {
          color: @text-color-2;
        }
      }
    }
  }

  .song-list {
    overflow: auto;
    flex: 1;
    .song-item {
      height: 50px;
      padding: 0 @padding-l;
      display: flex;
      align-items: center;
      &.active {
        color: @primary-color;
      }

      .name-wrapper {
        flex: 1;
        .ellipsis();
        padding-right: 15px;
      }

      .singer {
        font-size: 13px;
        color: @text-color-2;
        margin-left: 4px;
      }

      .icon-delete {
        color: @text-color-2;
      }
    }
  }
}
</style>
