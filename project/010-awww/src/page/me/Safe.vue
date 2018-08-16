<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container row">
        <div class="col-lg-3">
          <setting-nav/>
        </div>

        <div class="col-lg-9 content">
            <div class="header">
              <div class="title">更改密码</div>
            </div>
            <div class="cute-form">
              <form @submit.prevent="change_password('password')">
                <div class="input-control">
                  <label for="old">旧密码</label>
                  <input 
                    id="old"
                    v-model="password.old"
                    v-validate="'required|min:6'"
                    data-vv-delay="500"
                    placeholder="请输入当前密码"
                    name="old-password"
                    class="round"
                    type="password">
                  <div v-if="errors.has('old-password')" class="error-list">
                    <div class="error">{{errors.first('old-password')}}</div>
                  </div>
                </div>
                <div class="input-control">
                  <label for="new">新密码</label>
                  <input 
                    id="new"
                    v-model="password.new"
                    v-validate="'required|min:6'"
                    data-vv-delay="500"
                    ref="new-password"
                    placeholder="请输入新密码"
                    name="new-password"
                    class="round"
                    type="password">
                  <div v-if="errors.has('new-password')" class="error-list">
                    <div class="error">{{errors.first('new-password')}}</div>
                  </div>
                </div>
                <div class="input-control">
                  <label>确认新密码</label>
                  <input 
                    class="round"
                    v-validate="'required|confirmed:new-password'"
                    data-vv-delay="500"
                    name="confirm-password"
                    placeholder="请再次输入新密码"
                    type="password">
                  <div v-if="errors.has('confirm-password')" class="error-list">
                    <div class="error">{{errors.first('confirm-password')}}</div>
                  </div>
                </div>
                <div class="btn-group">
                  <button type="submit" class="btn-primary left-round">提交</button>
                  <button @click="reset" type="button" class="btn right-round">清空</button>
                </div>
              </form>
            </div>
        </div>          
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import SettingPage from "../../mixins/SettingPage";

import session from "../../lib/session.js";
// import {validate_before_submit} from "../../lib/validate.js";
import api from "../../lib/api.js";

export default {
  mixins: [SettingPage],

  data() {
    return {
      error: {
        invalid_old_password: false
      },
      password: {
        old: "",
        new: ""
      },
      current: session.uinfo()
    };
  },

  methods: {    
    reset() {
      let form = document.querySelector("form");
      form.reset();
    },

    change_password() {
      validate_before_submit();
      
      let u = session.uinfo();
      let unique = u.username || u.phone || u.email;

      session.exist(unique, this.password.old).then(r => {
        r ? this.update_password() : this.error.invalid_old_password;
      });
    },

    update_password() {
      return api("user/update", {
        id: this.current.id,
        password: this.password.new
      }).then(() => {
        alert("密码修改成功");
        session.logout("#/login");
      });
    }
  }
};
</script>

<style scoped>
</style>