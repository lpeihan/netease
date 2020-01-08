<template>
  <div class="comments">
    <v-header :title="`评论(${total})`" :theme="true" />

    <div class="comments-song">
      <img :src="currentSong.image" />
      <div class="song-info">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singer">{{ currentSong.singer }}</div>
      </div>
    </div>

    <div class="comments-wrapper" v-if="hotComments.length">
      <div class="title">热门评论</div>

      <comment-item
        v-for="(hot, index) in hotComments"
        :comment="hot"
        :key="index"
      />
    </div>

    <div class="comments-wrapper" v-if="comments.length">
      <div class="title">最新评论</div>

      <comment-item
        v-for="(comment, index) in comments"
        :comment="comment"
        :key="index"
      />
    </div>

    <infinite-loading @infinite="loadmore" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import { getComments } from "../../api/song";
import { Getter } from "vuex-class";
import CommentItem from "./CommentsItem.vue";
import InfiniteLoading from "../../components/InfiniteLoading.vue";

@Component({
  components: {
    VHeader,
    CommentItem,
    InfiniteLoading
  }
})
export default class extends Vue {
  @Getter("currentSong") currentSong: any;

  total: number = 0;
  comments: any[] = [];
  hotComments: any[] = [];
  page: number = 0;

  async getComments(id: string) {
    const res = await getComments(id);
    const { total, comments, hotComments } = res.data;
    this.total = total;
    this.comments = comments;
    this.hotComments = hotComments;
  }

  async loadmore(state: any) {
    try {
      ++this.page;
      const res = await getComments(
        this.$route.params.id,
        this.comments.length
      );

      const { total, comments, hotComments } = res.data;

      if (this.page === 1) {
        this.total = total;
        this.hotComments = hotComments;
      }

      if (this.page === 1 && comments.length === 0) {
        state.complete();
        return;
      }

      if (comments.length < 20) {
        state.loaded();
        state.complete();
      } else {
        state.loaded();
      }

      this.comments = this.comments.concat(comments);
    } catch (err) {
      state.error();
    }
  }
}
</script>

<style lang="less" scoped>
.comments {
  z-index: 1001;
  padding-top: @header-height;
  min-height: 100%;

  &-song {
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

  &-wrapper {
    .title {
      background: rgba(7, 17, 27, 0.1);
      padding: 4px @padding;
      color: @text-color-2;
      font-size: @font-size-s;
    }
  }
}
</style>
