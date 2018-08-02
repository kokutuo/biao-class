<template>
  <div>
    <div class="row">
      <div class="col-lg-5">
        <div class="bg-pic"></div>
      </div>
      <div class="col-lg-7">
          <div class="parent">
            <div class="top">
              <div @click="signup_by = 'mail'" :class="'item ' + (signup_by == 'mail' ? 'active' : '')">邮箱注册</div>
              <div @click="signup_by = 'phone'" :class="'item ' + (signup_by == 'phone' ? 'active' : '')">手机注册</div>
              <router-link to="/" class="item">首页</router-link>
            </div>
            <div class="content">
              <div class="header">
                <h1>欢迎注册AWWW</h1>
                <div class="sub-title">在这里，遇见</div>
              </div>
              <form class="main-form" @submit.prevent="submit" autocomplete="off">
                <div class="input-control">
                  <input 
                        id="username"
                        v-model="current.username"
                        type="text" 
                        placeholder="用户名">
                </div>
                <div class="input-control">
                  <input 
                        id="password" 
                        v-model="current.password"
                        type="password" 
                        placeholder="密码">
                </div>
                <div class="input-control">
                  <input 
                        id="re_password" 
                        v-model="current.re_password"
                        type="password" 
                        placeholder="请再次输入密码">
                </div>
                <div v-if="signup_by == 'phone'" class="input-control">
                  <input 
                        id="phone" 
                        v-model="current.phone"
                        :key="'current.phone'"
                        type="text"
                        placeholder="手机号">
                </div>
                <div v-if="signup_by == 'mail'" class="input-control">
                  <input 
                        id="mail" 
                        v-model="current.mail"
                        :key="'current.mail'"
                        type="text" 
                        placeholder="邮箱">
                </div>
                <div class="input-control">
                  <input
                        id="vcode" 
                        v-model="current.vcode"
                        type="text" 
                        placeholder="验证码">
                  <button @click="send_code" type="button" :disabled="captcha.countdown != 0">
                    <span v-if="captcha.countdown">{{captcha.countdown}}</span>
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
import session from "../lib/session.js";

export default {
  data() {
    return {
      current: {},
      code: "",
      signup_by: "phone",
      invalid_code: false,
      captcha: {
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

      if (this.signup_by == "mail") {
        delete this.current.phone;
      } else {
        delete this.current.mail;
      }

      // 如果没有用户名，就默认用已填的邮箱或手机号作为用户名
      !this.current.username &&
        (this.current.username = this.current[this.signup_by]);

      api("user/create", this.current).then(r => {
        session.login(r.data);
        alert("注册成功！");
        this.$router.push("/");
      });
    },

    send_code() {
      if (this.captcha.countdown) {
        return;
      }
      console.log("1", 1);
      let action, by_mail;

      this.captcha.countdown = 60;

      action = "sms";

      if ((by_mail = this.signup_by == "mail")) {
        action = "mail";
      }

      console.log('by_mail', by_mail);
      
      if ((by_mail && !this.current.mail) || (!by_mail && this.current.phone)) {
        return;
      }

      this.captcha.timer = setInterval(() => {
        if (this.captcha.countdown == 0) {
          clearInterval(this.captcha.timer);
          return;
        }

        this.$set(this.captcha, "countdown", this.captcha.countdown - 1);
        console.log('this.captcha.countdown', this.captcha.countdown);
      }, 1000);

      api(`captcha/${action}`, {
        phone: this.current.phone,
        email: this.current.mail
      }).then(r => {
        this.code = atob(r.data.result);
        console.log(this.code);
      });
    }
  }
};
</script>

<style scoped>
.bg-pic {
  width: 400px;
  height: 98vh;
  margin-left: 10px;
  background-image: url(../assets/signup/signup01.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.parent {
  position: relative;
}

.top .item {
  float: right;
  margin: 20px 40px 0 0;
  font-size: 16px;
  color: #999;
  padding: 10px 0 0;
  line-height: 24px;
  cursor: pointer;
  user-select: none;
}

.top .item.active {
  color: #000;
}

.content {
  position: absolute;
  top: 100px;
  left: 100px;
}

.header {
  margin-bottom: 10px;
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
