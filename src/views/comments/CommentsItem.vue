<template>
  <div class="comments-item">
    <div class="header">
      <img :src="comment.user.avatarUrl" class="avatar" />

      <div class="info-wrapper">
        <div class="nickname">{{ comment.user.nickname }}</div>
        <div class="time">{{ comment.time | date }}</div>
      </div>

      <div class="like-wrapper">
        <div class="count">{{ comment.likedCount }}</div>
        <icon name="like"></icon>
      </div>
    </div>

    <div class="content">
      {{ comment.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: () => {} }) comment: any;
}
</script>

<style lang="less" scoped>
.comments-item {
  padding: @padding-m;
  .header {
    display: flex;
    align-items: center;

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .info-wrapper {
      padding-left: 15px;
      flex: 1;
      .nickname {
        color: @text-color-1;
      }

      .time {
        color: @text-color-2;
        margin-top: 2px;
        font-size: @font-size-s;
      }
    }

    .like-wrapper {
      display: flex;
      align-items: center;
      color: @text-color-2;
      font-size: @font-size-s;

      .count {
        margin-right: 5px;
      }

      .icon-like {
        width: 18px;
        height: 18px;
      }
    }
  }

  .content {
    padding: 10px 5px 0 50px;
  }
}
</style>
