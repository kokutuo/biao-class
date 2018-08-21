<template>
  <div>
    <Nav/>
    
    <div class="container">
      <div class="login round">
        <h1 class="tac">登录微博</h1>
        <el-tabs value="account" :stretch="true">
          <el-tab-pane label="账号登录" name="account">
            <el-form :model="form" :rules="rules" ref="form">
              <div v-if="!passed" class="error tac">用户名或密码有误</div>
              <el-form-item>
                <el-input 
                  v-model="form.unique" 
                  prefix-icon="fas fa-user" 
                  autofocus 
                  auto-complete="true"
                  placeholder="邮箱/会员账号/手机号">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input 
                  v-model="form.pwd" 
                  prefix-icon="fas fa-lock" 
                  type="password"
                  placeholder="密码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submit" type="primary" size="medium">登录</el-button>
                <span class="anchor">还没有账号？<router-link style="color:#409EFF;" to="/signup">立即注册!</router-link></span>
              </el-form-item>
            </el-form>
            <div class="other-login">
              <span class="anchor">其他登录方式:</span>
              <span class="brand">
                <i class="fab fa-qq"></i>
                <i class="fab fa-weixin"></i>
                <i class="fab fa-github"></i>
                <i class="fab fa-chrome"></i>
                <i class="fab fa-firefox"></i>
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="安全登录" name="qrcode">安全登录</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/login.css";

import session from "../lib/session.js";

import Nav from "../components/Nav";

export default {
  name: "login",

  components: { Nav },

  data() {
    return {
      passed: true,
      form: {},
      rules: {}
    };
  },

  methods: {
    submit() {
      session.exist(this.form.unique, this.form.pwd).then(r => {
        if (!r) {
          this.passed = false;
          alert("账号或密码不正确，请重新输入");
          return;
        }
        
        this.passed = true;
        session.login(r);
        alert('登录成功！');
        // location.href = "/";
        this.$router.push('/');
      });
    },

    
  }
};
</script>

<style scoped>
.login {
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 25px 50px;
}
</style>