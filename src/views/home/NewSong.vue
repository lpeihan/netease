<template>
  <div class="new-song"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getNewSong } from "../../api/playlist";

@Component
export default class extends Vue {
  async getNewSong() {
    const res = await getNewSong();
    console.log(res);
  }
  created() {
    this.getNewSong();
  }
}
</script>

<style lang="less" scoped></style>
