<template>
  <div class="singers">
    singers
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSingers } from "../../api/singers";

@Component
export default class extends Vue {
  singers: Array<any> = [];

  async getSingers() {
    const res = await getSingers();
    const singers = res.data.artists;
  }

  created() {
    this.getSingers();
  }
}
</script>
