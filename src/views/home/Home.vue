<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getBanners } from "../../api/recommends";

@Component
export default class extends Vue {
  banners: any[] = [];

  title: string = "helo";

  async getBanners() {
    const res = await getBanners();

    this.banners = res.data.banners;
  }

  created() {
    this.getBanners();
  }
}
</script>
