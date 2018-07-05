<template>
  <div>
    <div class="row">
      <div class="col-lg-5" style="margin-left: 0;">
        <div class="bg-pic"></div>
      </div>
      <div class="col-lg-7">
          <div class="parent">
            <div class="content">
              <div class="header">
                <h1>欢迎注册洋洋车</h1>
                <div class="sub-title">买好车，上洋洋车</div>
              </div>
              <form class="main-form"  autocomplete="off">
                <div class="input-control">
                  <input 
                        id="username"
                        v-validator="'required|username|not_exist:user,username|min_length:3|max_length:18'" 
                        error-el="#username-error" 
                        type="text" 
                        placeholder="用户名">
                  <div class="error-list">
                      <div id="username-error"></div>
                  </div>
                </div>
                <div class="input-control">
                  <input 
                        id="password" 
                        v-validator="'required|min_length:6|max_length:16'"
                        error-el="#password-error"
                        type="password" 
                        placeholder="密码">
                    <div class="error-list">
                      <div id="password-error"></div>
                  </div>
                </div>
                <div class="input-control">
                  <input 
                        id="repeat" 
                        v-validator="'required|min_length:6|max_length:16'"
                        type="password" 
                        placeholder="再次输入密码">
                </div>
                <div class="input-control">
                  <button class="btn-primary" type="submit">立即注册</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validator from "../directive/validator.js";
export default {};
</script>

<style scoped>
.bg-pic {
  width: 400px;
  height: 100vh;
  background-image: url(../assets/signup/signup.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.parent {
  position: relative;
}

.content {
  position: absolute;
  top: 100px;
  left: 100px;
}

.header {
  margin-bottom: 40px;
  border-bottom: 0;
}

h1 {
  font-size: 44px;
}

.sub-title {
  font-size: 22px;
}

.main-form {
  width: 460px;
  box-shadow: 0 0 0;
}

.main-form input {
  height: 50px;
  padding: 0 20px;
  font-size: 18px;
}

.main-form button,
.main-form input {
  width: 458px;
  margin-top: 24px;
  border-radius: 5px;
}

.main-form button {
  padding: 10px 20px;
  font-size: 30px;
  font-weight: lighter;
}

.input-control {
  margin: 0;
}
</style>
