<template>
  <div class="player" v-if="playlist.length">
    <div class="player-full" v-show="fullScreen" @touchmove.prevent>
      <div
        class="overlay"
        :style="{ 'background-image': `url(${currentSong.image})` }"
      ></div>

      <div class="header">
        <icon name="down" @click="back" />
        <p class="name">{{ currentSong.name }}</p>
        <p class="singer">{{ currentSong.singer }}</p>
      </div>

      <div class="song-content">
        <div class="cd-wrapper" :class="playing ? 'play' : 'pause'">
          <img :src="currentSong.image" />
        </div>
      </div>

      <div class="footer">
        <div class="top-btns">
          <icon name="unfavorite" />
          <icon name="download" />
          <icon name="comment" />
          <icon name="more" />
        </div>

        <div class="operations">
          <icon name="loop" />
          <icon name="prev" @click="prevSong" />
          <icon :name="playing ? 'pause' : 'play'" @click="togglePlay" />
          <icon name="next" @click="nextSong" />
          <icon name="playlist" @click="openPlaylist" />
        </div>
      </div>
    </div>

    <playlist-popup ref="playlistPopup" />
    <audio id="audio" ref="audio" autoplay="autoplay" :src="url"></audio>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { getSong } from "../../api/song";
import PlaylistPopup from "../../components/PlaylistPopup.vue";

@Component({
  components: {
    PlaylistPopup
  }
})
export default class extends Vue {
  @Getter("currentSong") currentSong: any;
  @Getter("playlist") playlist: any[];
  @Getter("fullScreen") fullScreen: boolean;
  @Getter("playing") playing: boolean;
  url: string = "";

  @Action("setPlaying") setPlaying: any;
  @Action("setFullScreen") setFullScreen: any;
  @Action("nextSong") nextSong: any;
  @Action("prevSong") prevSong: any;

  async getSong(id: string) {
    this.url = (await getSong(id)).data.data[0].url;
  }

  togglePlay() {
    this.setPlaying(!this.playing);
  }

  close() {
    if (location.hash.indexOf("full-screen") === -1) {
      this.$nextTick(() => {
        this.setFullScreen(false);
      });
    }
  }

  back() {
    history.go(-1);
  }

  openPlaylist() {
    (this.$refs.playlistPopup as any).open();
  }

  @Watch("currentSong") async watchCurrentSong(newSong: any, oldSong: any) {
    if (newSong.id === oldSong.id) {
      return;
    }

    if (!newSong.id) {
      return;
    }

    await this.getSong(newSong.id);
    this.setPlaying(true);
  }

  @Watch("playing") watchPlaying(val: boolean) {
    if (!this.url) {
      return;
    }

    const audio = this.$refs.audio as any;

    this.$nextTick(() => {
      val ? audio.play() : audio.pause();
    });
  }

  @Watch("fullScreen") watchFullScreen(val: boolean) {
    if (val) {
      history.pushState(
        { page: "full-screen" },
        "full-screen",
        `${location.href}#full-screen`
      );
    }
  }

  firstplay() {
    setTimeout(() => {
      const audio = this.$refs.audio as any;

      if (audio) {
        audio.play();
        if (audio.src) {
          document.removeEventListener("touchend", this.firstplay);
        }
      }
    }, 1000);
  }

  mounted() {
    addEventListener("popstate", this.close);
    document.addEventListener("touchend", this.firstplay);
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.player {
  &-full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: @white;
    color: @white;
    display: flex;
    flex-direction: column;

    .overlay {
      .bg-filter(160px);
    }

    .header {
      position: relative;
      text-align: center;
      padding: 15px 50px;

      .icon-down {
        color: @white;
        position: absolute;
        transform: rotate(-90deg);
        top: 20px;
        left: 20px;
      }

      .name {
        font-size: 17px;
        .ellipsis();
      }
    }

    .song-content {
      flex: 1;
      padding-top: 50px;

      .cd-wrapper {
        width: 280px;
        height: 280px;
        margin: 0 auto;
        border-radius: 50%;
        border: 8px solid rgba(255, 255, 255, 0.2);

        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }

        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    .footer {
      .top-btns {
        padding: 10px 50px;
        display: flex;
        justify-content: space-between;

        .icon-comment {
          width: 22px;
          height: 22px;
        }
      }

      .operations {
        display: flex;
        padding: 20px 30px;
        justify-content: space-between;
        align-items: center;

        .icon-play,
        .icon-pause {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>
