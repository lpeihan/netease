<template>
  <div class="user-drawer">
    <van-popup v-model="show" position="left">
      <div class="user-card" @click="login">
        <template v-if="isLogin">
          <img :src="user.profile.avatarUrl" class="avatar" />

          <div class="nickname">{{ user.profile.nickname }}</div>
        </template>

        <template v-else>
          <div class="tips">
            登录网易云音乐<br />
            手机电脑多端同步，尽享海量高品质音乐
          </div>
          <van-button @click="login" size="small" round>立即登录</van-button>
        </template>
      </div>

      <div class="user-entry van-hairline--bottom">
        <div class="entry">
          <icon name="user" />
          <div class="text">我的歌单</div>
        </div>

        <div class="entry">
          <icon name="unfavorite" />
          <div class="text">收藏</div>
        </div>

        <div class="entry">
          <icon name="history" />
          <div class="text">播放历史</div>
        </div>

        <div class="entry">
          <icon name="logout" @click="logout" />
          <div class="text">退出</div>
        </div>
      </div>

      <div class="theme-wrapper">
        <div class="theme-title">主题切换</div>
        <div class="theme-list">
          <div
            class="theme-item"
            v-for="c in colorList"
            :key="c.key"
            :style="{
              backgroundColor: c.color
            }"
            @click="changeColor(c.color)"
          >
            <van-icon
              name="success"
              v-show="c.color === color"
              color="white"
              size="24px"
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import replacer from "webpack-theme-color-replacer/client";
import storage, { CURRENT_THEME } from "../../utils/storage";
import { Getter, Action } from "vuex-class";

@Component
export default class extends Vue {
  show: boolean = false;
  color: string = storage.getItem(CURRENT_THEME) || "#fc2834";
  colorList: any = [
    { key: "默认", color: "#fc2834" },
    { key: "薄暮", color: "#f7234f" },
    { key: "火山", color: "#FA541C" },
    { key: "日暮", color: "#FAAD14" },
    { key: "明青", color: "#13C2C2" },
    { key: "极光绿", color: "#52C41A" },
    { key: "拂晓蓝", color: "#1890FF" },
    { key: "极客蓝", color: "#2F54EB" },
    { key: "酱紫", color: "#722ED1" }
  ];
  @Getter("user") user: any;
  @Getter("isLogin") isLogin: boolean;
  @Action("logout") logout: () => {};

  open() {
    this.show = true;
  }

  close() {
    setTimeout(() => {
      this.show = false;
    }, 300);
  }

  login() {
    this.show = false;
    this.$router.push("/user/login");
  }

  changeColor(val: string) {
    this.$toast.loading("正在设置主题中");
    const newColors = [val];

    replacer.changer
      .changeColor({ newColors }, Promise)
      .then(() => {
        this.$toast("主题切换成功");
        this.color = val;
        storage.setItem(CURRENT_THEME, val);
        this.close();
      })
      .catch(() => {
        this.$toast("主题切换失败");
        this.close();
      });
  }

  created() {
    replacer.changer.changeColor({ newColors: [this.color] }, Promise);
  }
}
</script>

<style lang="less" scoped>
.user-drawer {
  /deep/.van-popup--left {
    width: 300px;
    height: 100%;
  }

  .user-card {
    padding: 35px 12px;
    color: @text-color-2;
    background: @white url("../../assets/images/bg.jpeg") no-repeat;
    background-size: 100%;
    text-align: center;
    min-height: 170px;

    .tips {
      margin-bottom: 10px;
      font-size: @font-size-s + 1;
    }

    /deep/.van-button--small {
      padding: 0 15px;
      color: @text-color-2;
      border-color: @white;
    }

    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    .nickname {
      margin-top: 5px;
      font-size: @font-size-m;
    }
  }

  .fields-wrapper {
    .field-item {
      padding: @padding @padding-l;
      font-size: 15px;
    }
  }

  .user-entry {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    text-align: center;
    .entry {
      flex: 1;
      .icon {
        color: @primary-color;
      }

      .text {
        font-size: @font-size-s;
        color: @text-color-1;
        margin-top: 5px;
      }
    }
  }

  .theme-wrapper {
    padding: @padding-l 20px;
    .theme-title {
      margin-bottom: 16px;
      text-align: center;
      color: @text-color-1;
    }
    .theme-list {
      display: flex;
      flex-wrap: wrap;
      .theme-item {
        border-radius: @border-radius;
        width: 28px;
        height: 28px;
        margin-bottom: 16px;
        margin-right: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.4;

        &:nth-child(6n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
