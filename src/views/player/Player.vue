<template>
  <div class="player" v-if="playlist.length">
    <transition name="full" @enter="enter" @leave="leave">
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
          <div class="cd-wrapper" ref="cd">
            <img :src="currentSong.image" :class="rotateCls" />
          </div>
        </div>

        <div class="footer">
          <div class="top-btns">
            <icon
              @click="toggleFavorite(currentSong)"
              :name="isFavorite ? 'favorite' : 'unfavorite'"
            />
            <icon name="download" />
            <icon name="comment" @click="goComments" />
            <icon name="more" />
          </div>

          <progress-bar
            :currentTime="currentTime"
            :duration="duration"
            :percent="percent"
            @update="updateProgress"
          />

          <div class="operations">
            <icon :name="mode" @click="changeMode" />
            <icon name="prev" @click="prevSong" />
            <icon :name="playing ? 'pause' : 'play'" @click="togglePlay" />
            <icon name="next" @click="nextSong" />
            <icon name="playlist" @click="openPlaylist" />
          </div>
        </div>
      </div>
    </transition>

    <div class="player-mini">
      <img
        @click="setFullScreen(true)"
        :src="currentSong.image"
        class="mini-pic"
        :class="rotateCls"
      />

      <div class="song-info">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singer">{{ currentSong.singer }}</div>
      </div>

      <div class="right-btns">
        <progress-circle :percent="percent" @click.native="togglePlay">
          <icon :name="playing ? 'mini-pause2' : 'mini-play2'" />
        </progress-circle>

        <icon name="playlist" @click="openPlaylist"></icon>
      </div>
    </div>

    <player-playlist
      ref="playerPlaylist"
      :changeMode="changeMode"
      :modeText="modeText"
      :mode="mode"
    />
    <audio
      id="audio"
      ref="audio"
      :src="url"
      @canplay="canplay"
      @ended="ended"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { getSong } from "../../api/song";
import PlayerPlaylist from "./PlayerPlaylist.vue";
import animations from "create-keyframe-animation";
import { getRealSize } from "../../utils/dom";
import ProgressBar from "../../components/ProgressBar.vue";
import ProgressCircle from "../../components/ProgressCircle.vue";

const MODE = {
  loop: "loop",
  once: "once"
};

@Component({
  components: {
    PlayerPlaylist,
    ProgressBar,
    ProgressCircle
  }
})
export default class extends Vue {
  @Getter("currentSong") currentSong: any;
  @Getter("playlist") playlist: any[];
  @Getter("fullScreen") fullScreen: boolean;
  @Getter("playing") playing: boolean;
  @Getter("currentIndex") currentIndex: number;
  @Getter("favoriteList") favoriteList: any[];

  url: string = "";
  mode: string = MODE.loop;
  currentTime: number = 0;
  duration: number = 0;
  audio: HTMLAudioElement = null;

  @Action("setPlaying") setPlaying: any;
  @Action("setFullScreen") setFullScreen: any;
  @Action("nextSong") nextSong: any;
  @Action("prevSong") prevSong: any;
  @Action("savePlayHistory") savePlayHistory: any;
  @Action("saveFavoriteList") saveFavoriteList: any;
  @Action("deleteFavoriteList") deleteFavoriteList: any;

  get modeText() {
    if (this.mode === MODE.loop) {
      return "循环播放";
    } else if (this.mode === MODE.once) {
      return "单曲循环";
    }

    return "";
  }

  get rotateCls() {
    return this.playing ? "play" : "play pause";
  }

  get percent() {
    return this.duration ? this.currentTime / this.duration : 0;
  }

  get isFavorite() {
    const index = this.favoriteList.findIndex(
      item => item.id === this.currentSong.id
    );
    return index > -1;
  }

  async getSong(id: string) {
    this.url = (await getSong(id)).data.data[0].url;
  }

  togglePlay() {
    this.setPlaying(!this.playing);
  }

  close() {
    if (location.hash.indexOf("full-screen") === -1) {
      this.setFullScreen(false);
    }
  }

  back() {
    history.go(-1);
  }

  openPlaylist() {
    (this.$refs.playerPlaylist as any).open();
  }

  canplay() {
    this.audio.play();

    this.duration = this.audio.duration;
  }

  ended() {
    if (this.mode === MODE.once) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      this.nextSong();
    }
  }

  toggleFavorite(song: any) {
    if (this.isFavorite) {
      this.deleteFavoriteList(song);
    } else {
      this.saveFavoriteList(song);
    }
  }

  goComments() {
    this.$router.push(`/music/${this.currentSong.id}/comments`);
  }

  updateTime(e: any) {
    this.currentTime = e.target.currentTime;
  }

  updateProgress(percent: number) {
    this.audio.currentTime = percent * this.duration;
    !this.playing && this.togglePlay();
  }

  changeMode() {
    if (this.mode === MODE.loop) {
      this.mode = MODE.once;
    } else {
      this.mode = MODE.loop;
    }

    this.$toast(this.modeText);
  }

  enter(el: any, done: () => {}) {
    const { x, y, scale } = this.getPosAndScale();
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(this.$refs.cd, "move", () => {
      animations.unregisterAnimation("move");
      (this.$refs.cd as any).style.animation = "";
      done();
    });
  }

  leave(el: any, done: () => {}) {
    const { x, y, scale } = this.getPosAndScale();
    const cd = this.$refs.cd as any;
    cd.style.transition = "all 0.4s";
    cd.style["transform"] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    cd.addEventListener("transitionend", () => {
      cd.style.transition = "";
      cd.style["transform"] = "";
      done();
    });
  }

  getPosAndScale() {
    const width = getRealSize(280);
    return {
      x: -(innerWidth / 2 - getRealSize(40)),
      y: innerHeight - getRealSize(74 + 50) - width / 2 - getRealSize(30),
      scale: getRealSize(40) / width
    };
  }

  @Watch("currentSong") async watchCurrentSong(newSong: any, oldSong: any) {
    if (newSong.id === oldSong.id) {
      return;
    }

    if (!newSong.id) {
      return;
    }

    this.savePlayHistory(newSong);

    await this.getSong(newSong.id);
    this.setPlaying(true);
  }

  @Watch("playing") watchPlaying(val: boolean) {
    if (!this.url) {
      return;
    }

    this.$nextTick(() => {
      val ? this.audio.play() : this.audio.pause();
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
      const audio = this.audio;

      if (audio && this.playing) {
        audio.play();
        if (audio.src) {
          document.removeEventListener("touchend", this.firstplay);
        }
      }
    }, 1000);
  }

  mounted() {
    this.audio = this.$refs.audio as HTMLAudioElement;

    if (this.currentSong.id) {
      this.getSong(this.currentSong.id);
    }

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

@keyframes favorite {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1.1);
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

    &.full {
      &-enter-active,
      &-leave-active {
        transition: all @transition-time;

        .header,
        .footer {
          transition: all @transition-time cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }

      &-leave-to,
      &-enter {
        opacity: 0;

        .header {
          transform: translate3d(0, -100px, 0);
        }

        .footer {
          transform: translate3d(0, 100px, 0);
        }
      }
    }

    .overlay {
      .bg-filter(80px);
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

        img {
          width: 100%;
          border-radius: 50%;

          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }

    .footer {
      .top-btns {
        padding: 20px 60px 30px;
        display: flex;
        justify-content: space-between;

        .icon {
          width: 24px;
          height: 24px;
        }

        .icon-favorite {
          color: @primary-color;
          animation: favorite 0.3s;
        }
      }

      .operations {
        display: flex;
        padding: 20px 40px 30px;
        justify-content: space-between;
        align-items: center;

        .icon-loop,
        .icon-once {
          width: 22px;
          height: 22px;
        }

        .icon-play,
        .icon-pause {
          width: 42px;
          height: 42px;
        }
      }
    }
  }

  &-mini {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: @white;
    display: flex;
    padding: 0 20px;
    align-items: center;
    height: 60px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    .mini-pic {
      border-radius: 50%;
      width: 40px;
      height: 40px;

      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
    }

    .song-info {
      padding-left: 10px;
      flex: 1;
      overflow: hidden;

      .name {
        .ellipsis();
      }

      .singer {
        color: @text-color-2;
        font-size: @font-size-s;
        .ellipsis();
      }
    }

    .right-btns {
      width: 80px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: @text-color-2;
    }
  }
}
</style>
