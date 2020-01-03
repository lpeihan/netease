<template>
  <div class="singers">
    <div class="singers-groups" v-for="group in singers" :key="group.title">
      <div class="title">{{ group.title }}</div>

      <div
        class="singer-item"
        v-for="item in group.items"
        :key="item.id"
        @click="select(item)"
      >
        <img class="avatar" v-lazy="item.avatar" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSingers } from "../../api/singers";
import pinyin from "pinyin";
import storage from "../../utils/storage";

@Component
export default class extends Vue {
  singers: Array<any> = [];

  async getSingers() {
    const res = await getSingers();
    const singers = res.data.artists;

    singers.forEach((singer: any) => {
      let py = pinyin(singer.name[0], { style: pinyin.STYLE_FIRST_LETTER });

      singer.letter = py[0][0].toUpperCase();
    });

    this.singers = this.normalizeSingers(singers);
  }

  normalizeSingers(singers: Array<any>) {
    const groups = {} as any;
    const hot = { title: "热门", items: [] } as any;

    singers.forEach((singer, index) => {
      const item = {
        id: singer.id,
        name: singer.name,
        avatar: singer.img1v1Url,
        alias: singer.alias[0]
      };
      index < 10 && hot.items.push(item);
      const letter = singer.letter;
      if (!groups[letter]) {
        groups[letter] = { title: letter, items: [] };
      }
      groups[letter].items.push(item);
    });
    const ret = [];
    for (let key in groups) {
      if (/[A-Z]/.test(key)) {
        ret.push(groups[key]);
      }
    }

    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });

    return [hot].concat(ret);
  }

  select(item: any) {
    this.$router.push("/singers/" + item.id);
    storage.setItem("CURRENT_PLAYLIST", item);
  }

  created() {
    this.getSingers();
  }
}
</script>

<style lang="less" scoped>
.singers {
  &-groups {
    .title {
      padding: 2px @padding-l;
      color: @white;
      font-size: @font-size-m;
      background: rgba(0, 0, 0, 0.1);
    }

    .singer-item {
      display: flex;
      padding: 0 @padding;
      height: 60px;
      align-items: center;

      .avatar {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }

      .name {
        font-size: 15px;
        margin-left: @padding;
      }
    }
  }
}
</style>
