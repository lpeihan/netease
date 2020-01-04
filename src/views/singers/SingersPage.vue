<template>
  <div class="singers-page">
    <v-header title="歌手列表" :theme="true" />

    <singers />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import Singers from "./Singers.vue";

@Component({
  components: {
    VHeader,
    Singers
  }
})
export default class extends Vue {}
</script>

<style lang="less" scoped>
.singers-page {
  padding-top: @header-height;
}
</style>
