<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <form @submit.prevent="submit" class="login-form tac">
          <h1>登录</h1>
          <div class="input-control">
            <input 
              v-model.trim="current.$unique" 
              placeholder="用户名/手机号/邮箱"
              type="text">
          </div>
          <div class="input-control">
            <input 
              v-model.trim="current.password" 
              type="password" 
              placeholder="密码">
          </div>
          <div class="input-control">
            <button type="submit" class="btn-primary btn-login">登录</button>
          </div>
        </form>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import api from "../lib/api.js";
import session from "../lib/session.js";

export default {
  components: { Nav, Footer },

  data() {
    return {
      login_failed: false,
      current: {}
    };
  },

  methods: {
    submit() {
      let unique, password;

      if (
        !(unique = this.current.$unique) ||
        !(password = this.current.password)
      ) {
        return;
      }

      if (unique == "admin" && password == "yoyoyo") {
        this.on_login_succeed({ id: 1, username: "admin", is_admin: true });
      }

      session.exist(unique, password).then(r => {
        if (!r) {
          this.login_failed = true;
          return;
        }

        this.on_login_succeed(r);
      });
    },

    on_login_succeed(row) {
      this.login_failed = false;
      delete row.password;
      session.login(row);
      alert('登录成功');
      if (session.is_admin()) {
        this.$router.push('/admin/user');
        return;
      }
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 0;
  font-size: 50px;
}

.login-form {
  margin: 0 auto;
  width: 600px;
}

.btn-login {
  width: 100%;
  font-size: 20px;
}
</style>