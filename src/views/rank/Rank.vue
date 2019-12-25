<template>
  <div class="ranking">
    <rank-item v-for="rank in ranks" :item="rank" :key="rank.id" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getRanks } from "../../api/rank";
import RankItem from "./RankItem.vue";

@Component({
  components: {
    RankItem
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
