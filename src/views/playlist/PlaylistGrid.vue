<template>
  <div class="playlist-grid">
    <div class="title" v-if="title">{{ title }}</div>

    <div class="playlist-wrapper">
      <div
        class="playlist-item"
        v-for="(item, index) in list"
        :key="index"
        @click="select(item)"
      >
        <img class="pic" v-lazy="item.picUrl || item.coverImgUrl" />

        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import storage, { CURRENT_PLAYLIST } from "../../utils/storage";

@Component
export default class extends Vue {
  @Prop({ default: "" }) title: string;
  @Prop({ default: (): [] => [] }) list: [];

  select(item: any) {
    this.$router.push("/playlist/" + item.id);
    storage.setItem(CURRENT_PLAYLIST, item);
  }
}
</script>

<style lang="less" scoped>
.playlist-grid {
  .title {
    font-size: @font-size-m;
    padding: @padding-m;
  }

  .playlist-wrapper {
    display: flex;
    padding: 0 @padding;
    flex-wrap: wrap;

    .playlist-item {
      width: calc(33.33% - 7px);
      margin: 0 @padding @padding-l 0;

      .pic {
        border-radius: @border-radius-m;
        overflow: hidden;

        &:active {
          opacity: 0.85;
        }
      }

      .name {
        font-size: 13px;
        .multi-ellipsis(2);
        min-height: 36px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
