<template>
  <div class="login">
    <v-header title="手机号登录" :theme="true" />

    <form class="login-form" @submit.prevent="login">
      <van-field
        v-model="phone"
        placeholder="请输入手机号"
        clearable
        left-icon="user-o"
      />
      <van-field
        v-model="password"
        placeholder="请输入密码"
        clearable
        type="password"
        left-icon="eye-o"
      />

      <van-button type="danger" block round>登录</van-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "../../components/Header.vue";
import { login } from "../../api/user";
import storage, { USER } from "../../utils/storage";
import { Action } from "vuex-class";

@Component({
  components: {
    VHeader
  }
})
export default class extends Vue {
  phone: string = "";
  password: string = "";

  @Action("setUser") setUser: any;

  async login() {
    try {
      const res = await login({ phone: this.phone, password: this.password });
      storage.setItem(USER, res.data);
      this.setUser(res.data);

      this.$toast("登录成功");
      this.$router.go(-1);
    } catch (err) {
      this.$toast("用户名或密码错误");
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding-top: @header-height;

  .login-form {
    padding: @padding-l;
  }

  /deep/.van-cell {
    font-size: @font-size-m;
    padding: 15px 5px;

    .van-icon {
      font-size: 20px;
      color: @text-color-2;
    }
  }

  /deep/.van-button--block {
    margin-top: 30px;
  }
}
</style>
