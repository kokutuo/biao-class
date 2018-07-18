<template>
  <div>
    <Nav/>
    <div class="bg-pic">
      <div class="container parent">
        <form @submit.prevent="submit" class="main-form">
          <h1>登录</h1>
          <div v-if="login_failed" class="error-list">
            <div class="error">用户名或密码有误</div>
          </div>
          <div class="input-control">
            <input 
                id="username" 
                v-validator="'required'"
                v-model="current.$unique"
                type="text"
                placeholder="用户名/手机号/邮箱"
                autocomplete="off">
          </div>
          <div class="input-control">
            <input 
                id="password" 
                v-model="current.password"
                type="password" 
                placeholder="密码">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">登录</button>
          </div>
          <div class="input-control">
            <p>没有账号？<a class="signup" href="#">注册</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/auth.css";

import session from '../lib/session.js';

import Nav from "../components/Nav";
import api from "../lib/api.js";

export default {
  //   directives: { validator }
  components: { Nav },

  data() {
    return {
      current: {},
      login_failed: false,
    };
  },

  methods: {
    submit() {
      let unique, password;

      if (!(unique = this.current.$unique) || !(password = this.current.password)) {
        return;
      }

      api('user/read', {
        where: {
          or: [
            ['username', '=', unique],
            ['phone', '=', unique],
            ['e_mail', '=', unique],
          ],
        },
      }).then(r => {
        let row;
        if (!(row = r.data.data[0]) || row.password != password) {
          this.login_failed = true;
          return;
        }

        this.login_failed = false;
        delete row.password;
        session.login(row)
        alert('登录成功');
        this.$router.push('/');
      })
    }
  }
};
</script>

<style scoped>
.bg-pic {
  min-height: 500px;
  background-image: url(../assets/login/login.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0 60px;
}

.parent {
  position: relative;
}

.main-form {
  width: 300px;
  position: absolute;
  display: inline-block;
  padding: 10px 20px;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  right: 30px;
  top: 100px;
}

.main-form input,
.main-form button {
  width: 100%;
  margin-bottom: 13px;
}

.signup {
  color: #555;
}
</style>
