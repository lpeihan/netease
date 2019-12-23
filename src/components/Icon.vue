<template>
  <svg class="icon" :class="'icon-' + name" v-on="$listeners">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script lang="ts">
import icons from "../assets/icons";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({
    type: String,
    default: "",
    required: true,
    validator: val => Boolean(icons[val])
  })
  private name!: string;
}
</script>

<style lang="less" scoped>
@import "../styles/icon.less";
</style>
