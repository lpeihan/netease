<template>
  <div class="infinite">
    <template v-if="status === STATUS.LOADING">
      <slot name="loading">
        <div class="loading-wrapper">
          <van-loading v-if="loading">{{ loadingText }}</van-loading>
        </div>
      </slot>
    </template>

    <template v-if="status === STATUS.NO_MORE">
      <slot name="no-more">
        <div class="no-more-wrapper">
          <div class="line"></div>
          <div class="text">{{ noMoreText }}</div>
          <div class="line"></div>
        </div>
      </slot>
    </template>

    <template v-if="status === STATUS.EMPTY">
      <slot name="empty">
        <div class="empty-wrapper">
          <img src="@/assets/images/empty.png" width="40%" />
          <div class="text">{{ emptyText }}</div>
        </div>
      </slot>
    </template>

    <template v-if="status === STATUS.ERROR">
      <slot name="error">
        <div class="error-wrapper">
          <img src="@/assets/images/empty.png" width="40%" />
          <div class="text">
            {{ errorText }}
          </div>
        </div>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

enum STATUS {
  READY = 0,
  LOADING = 1,
  NO_MORE = 2,
  EMPTY = 3,
  ERROR = 4
}

@Component
export default class extends Vue {
  @Prop({ type: Number, default: 10 }) distance: number;
  @Prop({ type: Boolean, default: false }) immediate: boolean;
  @Prop({ type: Boolean, default: true }) loading: boolean;
  @Prop({ type: String, default: "加载中..." }) loadingText: string;
  @Prop({ type: String, default: "到底啦" }) noMoreText: string;
  @Prop({ type: String, default: "好像什么东西也没有..." }) emptyText: string;
  @Prop({ type: String, default: "网络好像出错了..." }) errorText: string;
  @Prop({ type: String, default: "" }) container: string;

  STATUS = STATUS;
  status: STATUS = STATUS.READY;
  hasData: boolean = false;
  scrollParent: any;
  $state: any;

  isVisible(el: any) {
    const clientHeight =
      this.scrollParent === window
        ? window.innerHeight
        : this.scrollParent.getBoundingClientRect().bottom;

    return el.getBoundingClientRect().top <= clientHeight + this.distance;
  }

  load() {
    if (this.status === this.STATUS.READY) {
      this.status = this.STATUS.LOADING;
      this.$emit("infinite", this.$state);
    }
  }

  getScrollParent() {
    let el: any = window;
    if (this.container) {
      el = document.querySelector(this.container);
    }

    return el;
  }

  restore() {
    location.reload();
  }

  handleScroll() {
    if (this.isVisible(this.$el)) {
      this.load();
    }
  }

  removeListener() {
    this.scrollParent.removeEventListener("scroll", this.handleScroll);
  }

  addListener() {
    this.scrollParent.addEventListener("scroll", this.handleScroll);
  }

  mounted() {
    this.scrollParent = this.getScrollParent();

    setTimeout(() => {
      // 不需要出现在视窗中就加载数据
      if (this.immediate) {
        this.load();
      } else {
        this.handleScroll();
      }

      this.addListener();
    }, 1);
  }

  created() {
    this.$state = {
      loaded: () => {
        this.status = this.STATUS.READY;
        this.hasData = true;
      },
      complete: () => {
        if (this.hasData) {
          this.status = this.STATUS.NO_MORE;
        } else {
          this.status = this.STATUS.EMPTY;
        }
        this.removeListener();
      },
      error: () => {
        this.status = this.STATUS.ERROR;
        this.removeListener();
      }
    };
  }

  beforeDestroy() {
    this.removeListener();
  }

  deactivated() {
    if (this.status === STATUS.LOADING) {
      this.status = STATUS.READY;
    }

    this.removeListener();
  }

  activated() {
    this.addListener();
  }
}
</script>

<style lang="less" scoped>
@height: 60px;

.infinite {
  min-height: @height;

  .loading-wrapper {
    height: @height;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .no-more-wrapper {
    color: @text-color-3;
    height: @height;

    display: flex;
    align-items: center;
    justify-content: center;

    .line {
      width: 40px;
      height: 1px;
      background: @border-color;
      margin: 0 10px;
    }
  }

  .empty-wrapper,
  .error-wrapper {
    padding: 50px 0;
    text-align: center;

    .text {
      color: @text-color-3;
      margin-top: 20px;
      line-height: 26px;
      font-size: 15px;
    }
  }

  .error-wrapper {
    .van-button--normal {
      width: 100px;
      line-height: 38px;
      height: 38px;
      margin-top: 20px;
    }
  }

  .van-loading__spinner {
    width: 18px;
    height: 18px;
  }
}
</style>
