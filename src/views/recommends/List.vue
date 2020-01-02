<template>
  <div class="list">
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getPlaylist } from "../../api/recommends";

@Component
export default class extends Vue {
  async getPlaylist() {
    const res = await getPlaylist(this.$route.params.id);
    console.log(res);
  }

  created() {
    this.getPlaylist();
  }
}
</script>
