<template>
  <div class="rank-item van-hairline--bottom" @click="select(item)">
    <img v-lazy="item.coverImgUrl" class="img" />

    <div class="rank-item-right">
      <ul class="song-list">
        <template v-if="item.tracks.length">
          <li
            class="song-item"
            v-for="(song, index) in item.tracks"
            :key="index"
          >
            {{ `${index + 1}. ${song.first} - ${song.second}` }}
          </li>
        </template>

        <template v-else>
          <li class="song-item">{{ item.name }}</li>
          <li class="song-item">{{ item.description }}</li>
          <li class="song-item">{{ item.updateFrequency }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import storage, { CURRENT_PLAYLIST } from "../../utils/storage";

@Component
export default class extends Vue {
  @Prop() private item: any;

  select(item: any) {
    this.$router.push("/playlist/" + item.id);
    item.picUrl = item.coverImgUrl;
    storage.setItem(CURRENT_PLAYLIST, item);
  }
}
</script>

<style lang="less" scoped>
.rank-item {
  display: flex;
  padding: @padding-m;
  position: relative;
  .active();

  .img {
    .size(88px, 88px);
    border-radius: @border-radius-m;
  }

  &-right {
    flex: 1;
    padding: 0 @padding;
    overflow: hidden;

    .song-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;

      .song-item {
        font-size: @font-size-s;
        .ellipsis();
      }
    }
  }
}
</style>
