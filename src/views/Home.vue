<template>
  <div class="home">
    <img
      v-for="banner in banners"
      :src="banner.imageUrl"
      :key="banner.imageUrl"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getBanners } from "../api/recommends";
import { IRecommendsBanner } from "../api/types";

@Component
export default class extends Vue {
  banners: Array<IRecommendsBanner> = [];

  title: string = "helo";

  async getBanners() {
    const res = await getBanners();

    this.banners = res.data.banners;
  }

  created() {
    this.getBanners();
  }
}
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import { getBanners, IRecommendsBanner } from "../api/recommends";

// export default {
//   name: "home",
//   components: {
//     HelloWorld
//   },
//   data() {
//     return {
//       banners: []
//     }
//   },
//   methods: {
//     async getBanners() {
//       const res = await getBanners();
//       const banners: IRecommendsBanner = res.data;
//     }
//   },
//   created() {
//     this.getBanners();
//   }
// };
</script>
