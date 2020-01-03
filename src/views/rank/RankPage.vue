<template>
  <div class="rank-page">
    <v-header title="排行榜" />

    <div class="rank-list">
      <rank-item v-for="rank in ranks" :item="rank" :key="rank.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import { getRanks } from "../../api/rank";
import RankItem from "./RankItem.vue";

@Component({
  components: {
    RankItem,
    VHeader
  }
})
export default class extends Vue {
  ranks: any = [];

  async getRanks() {
    const res = await getRanks();

    this.ranks = res.data.list;
  }

  created() {
    this.getRanks();
  }
}
</script>

<style lang="less" scoped>
.rank-page {
  padding-top: @header-height;
}
</style>
