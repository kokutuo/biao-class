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
              <div class="title">更改用户名</div>
            </div>
            <div class="cute-form">
              <div v-if="!show.username">
                <span class="key">用户名：</span>
                <span class="val">{{current.username || '-'}}</span>
                <span @click="show.username=true" class="edit btn-small round">更改</span>
              </div>
              <form v-else @submit.prevent="submit('username')">
                <div class="input-control">
                  <label for="username">请输入新的用户名</label>
                  <input 
                    id="username"
                    v-model="current.username"
                    v-validate="'required|between:3,32'"
                    data-vv-delay="500"
                    name="username"
                    :class="{'round': true, 'is-danger': errors.has('username')}"
                    type="text">
                  <div v-if="errors.has('username')" class="error-list">
                    <div class="error">{{errors.first('username')}}</div>
                  </div>
                </div>
                <div class="btn-group">
                  <button type="submit" class="btn-primary left-round">提交</button>
                  <button @click="cancel" type="button" class="btn right-round">取消</button>
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
import {validate_before_submit} from "../../lib/validate.js";
import api from "../../lib/api.js";

export default {
  mixins: [SettingPage],

  data() {
    return {
      show: {
        username: false
      },
      current: session.uinfo()
    };
  },

  methods: {
    submit(property) {
      validate_before_submit();
      api("user/update", this.current).then(r => {
        session.replace_uinfo(r.data);
        this.show[property] = false;
      });
    },

    cancel() {
      this.show.username=false;
      this.current.username = session.uinfo().username;
    }
  }
};
</script>

<style scoped>
</style>