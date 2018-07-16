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
              <form class="main-form" @submit.prevent="submit" autocomplete="off">
                <div class="input-control">
                  <input 
                        id="username"
                        v-model="current.username"
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
                        v-model="current.password"
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
                        v-model="current.re_password"
                        v-validator="'required|min_length:6|max_length:16'"
                        type="password" 
                        placeholder="请再次输入密码">
                </div>
                <div class="input-control">
                  <input 
                        id="phone" 
                        v-model="current.phone"
                        v-validator="'cellphone'"
                        type="text" 
                        placeholder="手机号">
                </div>
                <div class="input-control">
                  <input 
                        id="vcode" 
                        v-model="current.vcode"
                        type="text" 
                        placeholder="验证码">
                  <button @click="send_sms" type="button" :disabled="sms.countdown != 0">
                    <span v-if="sms.countdown">{{sms.countdown}}</span>
                    <span v-else>发送验证码</span>
                  </button>
                </div>
                <div class="error-list">
                  <div v-if="invalid_code" id="vcode-error" class="error">验证码有误</div>
                </div>
                <div class="input-control">
                  <button class="btn-primary" type="submit">立即注册</button>
                </div>
                <div class="input-control small muted">
                  已有账号？
                  <router-link to="/login">登录</router-link>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";

export default {
  data() {
    return {
      current: {},
      code: "",
      invalid_code: false,
      sms: {
        timer: null,
        countdown: 0
      }
    };
  },

  methods: {
    submit() {
      this.invalid_code = this.current.vcode !== this.code;

      if (this.invalid_code) {
        return;
      }
    },

    send_sms() {
      if (!this.current.phone || this.sms.countdown) {
        return;
      }

      this.sms.countdown = 60;

      this.sms.timer = setInterval(() => {
        if (this.sms.countdown == 0) {
          clearInterval(this.sms.timer);
          return;
        }

        this.$set(this.sms, "countdown", this.sms.countdown - 1);
      }, 1000);

      api("captcha/sms", { phone: this.current.phone }).then(r => {
        this.code = atob(r.data.data.result);
      });
    }
  }
};
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
