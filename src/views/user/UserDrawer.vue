<template>
  <div class="user-drawer">
    <van-popup v-model="show" position="left">
      <div class="user-card">
        <template v-if="isLogin">
          <img :src="user.profile.avatarUrl" class="avatar" />

          <div class="nickname">{{ user.profile.nickname }}</div>
        </template>

        <template v-else>
          <div class="tips" @click="login">
            登录网易云音乐<br />
            手机电脑多端同步，尽享海量高品质音乐
          </div>
          <van-button @click="login" size="small" round>立即登录</van-button>
        </template>
      </div>

      <div class="user-entry">
        <div class="entry" @click="go('/user/playlists')">
          <icon name="user" />
          <div class="text">我的歌单</div>
        </div>

        <div class="entry">
          <icon name="favorite" @click="go('/user/favorite')" />
          <div class="text">收藏</div>
        </div>

        <div class="entry" @click="go('/user/history')">
          <icon name="history" />
          <div class="text">播放历史</div>
        </div>

        <div class="entry" @click="changeColor">
          <icon name="theme" />
          <div class="text">换个心情</div>
        </div>

        <div class="entry">
          <icon name="logout" @click="confirmLogout" />
          <div class="text">退出</div>
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

const THEME_LIST = [
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

@Component
export default class extends Vue {
  show: boolean = false;
  color: any = storage.getItem(CURRENT_THEME) || {
    key: "默认",
    color: "#fc2834"
  };
  @Getter("user") user: any;
  @Getter("isLogin") isLogin: boolean;
  @Action("logout") logout: () => {};

  get index() {
    for (let i = 0; i < THEME_LIST.length; i++) {
      if (THEME_LIST[i].color === this.color.color) {
        return i;
      }
    }

    return 0;
  }

  open() {
    this.show = true;
  }

  close(time = 300) {
    setTimeout(() => {
      this.show = false;
    }, time);
  }

  go(path: string) {
    this.close(0);

    setTimeout(() => {
      if (path === "/user/playlists" && !this.isLogin) {
        this.$router.push("/user/login");
      } else {
        this.$router.push(path);
      }
    }, 300);
  }

  login() {
    this.close(0);
    this.$router.push("/user/login");
  }

  changeColor() {
    const index = (this.index + 1) % THEME_LIST.length;
    const color = THEME_LIST[index];
    const newColors = [color.color];

    replacer.changer
      .changeColor({ newColors }, Promise)
      .then(() => {
        this.$notify({
          message: color.key,
          background: color.color,
          duration: 1000
        });
        this.color = color;
        storage.setItem(CURRENT_THEME, color);
      })
      .catch(() => {
        this.$toast("主题切换失败");
        this.close();
      });
  }

  confirmLogout() {
    this.$dialog
      .confirm({
        title: "退出登录",
        message: "是否退出登录"
      })
      .then(() => {
        this.logout();
        this.$toast("您已退出登录");
      });
  }

  created() {
    replacer.changer.changeColor({ newColors: [this.color.color] }, Promise);
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
    text-align: center;
    flex-wrap: wrap;
    .entry {
      width: 25%;
      padding: 12px;
      position: relative;
      .active();

      .icon {
        color: @primary-color;
        width: 22px;
        height: 22px;
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
