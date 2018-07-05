<template>
  <div>
    <Nav/>
    <div class="bg-pic">
      <div class="container parent">
        <form class="main-form">
          <h1>登录</h1>
          <div class="input-control">
            <input 
                id="username" 
                v-validator="'required|min_length:3|max_length:18'"
                error-el="username-error"
                type="text"
                placeholder="用户名"
                autocomplete="off"
                autofocus>
          </div>
          <div class="input-control">
            <input 
                id="password" 
                v-validator="'required|min_length:6|max_length:16'"
                error-el="#password-error"
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

import Nav from "../components/Nav";
import validator from "../directive/validator.js";

export default {
  components: { Nav },
  directives: { validator }
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
