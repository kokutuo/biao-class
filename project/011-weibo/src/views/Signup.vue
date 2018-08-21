<template>
  <div>
    <Nav/>

    <div class="mask"></div>
    <div class="container">
      <div class="signup round">
        <div class="row header">
          <div class="col-lg-4">
            <h2>创建你的账号</h2>
          </div>
          <div class="col-lg-8 right">
            <router-link to="/">
              <i class="fab fa-pied-piper-alt fa-3x"></i>
            </router-link>
          </div>
        </div>
        <div class="form">
          <el-tabs value="phone" :stretch="true">
            <el-tab-pane @click="signup_by='phone'" label="手机注册" name="phone">
              <el-form :model="form" status-icon :rules="rules" ref="form">
                <el-form-item prop="username">
                  <el-input 
                    v-model="form.username" 
                    prefix-icon="fas fa-user" 
                    autofocus 
                    auto-complete="off"
                    placeholder="用户名">
                  </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                  <el-input 
                    v-model="form.phone" 
                    prefix-icon="fas fa-mobile" 
                    autofocus 
                    placeholder="手机号">
                  </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input 
                    v-model="form.pwd" 
                    prefix-icon="fas fa-lock"
                    type="password"
                    placeholder="密码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="con_pwd">
                  <el-input 
                    v-model="form.con_pwd" 
                    prefix-icon="fas fa-lock"
                    type="password"
                    placeholder="确认密码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                  <el-input 
                    v-model="form.vcode" 
                    prefix-icon="fas fa-shield-alt" 
                    style="width:70%;" 
                    placeholder="验证码">
                  </el-input>
                  <el-button 
                    @click="send_code"
                    :disabled="captcha.countdown != 0"
                    style="width:28%; margin-left:2%;" 
                    type="info">
                    <span v-if="captcha.countdown">{{captcha.countdown}}</span>
                    <span v-else>发送验证码</span>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="submit" type="primary">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane @click="signup_by='mail'" label="邮箱注册" name="mail">
              <el-form :model="form" @submit.prevent="submit" :disabled="true">
                <el-form-item>
                  <el-input 
                    v-model="form.username" 
                    prefix-icon="fas fa-user" 
                    autofocus 
                    placeholder="用户名">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input 
                    v-model="form.mail" 
                    prefix-icon="fas fa-envelope" 
                    autofocus 
                    placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input 
                    v-model="form.pwd" 
                    prefix-icon="fas fa-lock" 
                    placeholder="密码">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input 
                    v-model="form.con_pwd" 
                    prefix-icon="fas fa-lock" 
                    placeholder="确认密码">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input 
                    v-model="form.vcode" 
                    prefix-icon="fas fa-shield-alt" 
                    style="width:70%;" 
                    placeholder="验证码">
                  </el-input>
                  <el-button 
                    @click="send_code" 
                    style="width:28%; margin-left:2%;" 
                    type="info">发送验证码
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";

import Nav from "../components/Nav";

export default {
  name: "signup",
  components: {
    Nav
  },

  data() {
    let conf = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.form.pwd) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };

    let vcode = (rule, value, callback) => {
      if (value != this.code) {
        callback(new Error("验证码不正确！"));
      } else {
        callback();
      }
    };

    return {
      code: "",
      invalid_code: false,
      signup_by: "phone",
      captcha: {
        timer: null,
        countdown: 0
      },
      form: {
        username: "",
        phone: "",
        mail: "",
        pwd: "",
        con_pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 32, message: "长度在 2 到 32 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能小于 6 个字符", trigger: "blur" }
        ],
        con_pwd: [{ validator: conf, trigger: "blur" }],
        vcode: [{ validator: vcode, trigger: "blur" }]
      }
    };
  },

  methods: {
    submit() {
      this.invalid_code = this.form.vcode !== this.code;

      if (this.invalid_code) {
        return;
      }

      if (this.signup_by == "mail") {
        delete this.form.phone;
      } else {
        delete this.form.mail;
      }

      api("user/create", this.form).then(r => {
        session.login(r.data);
        alert("注册成功！");
        location.href = "/login";
      });
    },

    send_code() {
      let action, by_mail;

      this.captcha.countdown = 60;

      if ((by_mail = this.signup_by == "mail")) {
        action = "mail";
      }

      action = "sms";

      if ((!by_mail && !this.form.phone) || (!by_mail && this.form.mail)) {
        return;
      }

      this.captcha.timer = setInterval(() => {
        if (this.captcha.countdown == 0) {
          clearInterval(this.captcha.timer);
          return;
        }

        this.$set(this.captcha, "countdown", this.captcha.countdown - 1);
      }, 1000);

      api(`captcha/${action}`, {
        phone: this.form.phone,
        mail: this.form.mail
      }).then(r => {
        this.code = atob(r.data.result);
        console.log("this.code", this.code);
      });
    }
  }
};
</script>

<style scoped>
.signup {
  position: relative;
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 10px;
}

.header * {
  vertical-align: text-bottom;
}
</style>