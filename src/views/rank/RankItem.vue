<template>
  <div class="rank-item van-hairline--bottom">
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

@Component
export default class extends Vue {
  @Prop() private item: any;
  @Prop() private index: number;
}
</script>

<style lang="less" scoped>
.rank-item {
  display: flex;
  padding: @padding;
  position: relative;
  .active();

  .img {
    .size(80px, 80px);
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
