<template>
  <div class="user-playlists">
    <v-header title="我的歌单" :theme="true" />

    <div class="playlist-wrapper">
      <div
        class="playlist-item"
        v-for="item in list"
        :key="item.id"
        @click="select(item)"
      >
        <img :src="item.coverImgUrl" class="cover-img" />

        <div class="info-wrapper">
          <div class="name">{{ item.name }}</div>
          <div class="count">{{ item.trackCount }}首歌</div>
        </div>

        <icon name="more" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getUserPlaylist } from "../../api/user";
import VHeader from "../../components/Header.vue";
import storage, { CURRENT_PLAYLIST } from "../../utils/storage";

@Component({
  components: {
    VHeader
  }
})
export default class extends Vue {
  @Getter("user") user: any;

  list: any[] = [];

  async getUserPlaylist() {
    const res = await getUserPlaylist(this.user.account.id);

    this.list = res.data.playlist;
  }

  select(item: any) {
    this.$router.push("/playlist/" + item.id);
    storage.setItem(CURRENT_PLAYLIST, item);
  }

  created() {
    this.getUserPlaylist();
  }
}
</script>

<style lang="less" scoped>
.user-playlists {
  padding-top: @header-height;

  .playlist-wrapper {
    .playlist-item {
      padding: @padding-l;
      display: flex;
      align-items: center;
      position: relative;
      .active();

      .cover-img {
        width: 48px;
        height: 48px;
        border-radius: @border-radius;
      }

      .info-wrapper {
        padding-left: 10px;
        flex: 1;
        overflow: hidden;

        .name {
          font-size: 15px;
        }

        .count {
          color: @text-color-2;
          font-size: 13px;
          margin-top: 2px;
        }
      }

      .icon-more {
        color: @text-color-2;
      }
    }
  }
}
</style>
