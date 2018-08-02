<template>
  <div>
    <div class="header">
      <div class="container row">
        <div class="nav">
          <div class="col-lg-5 left">
            <router-link class="nav-item" to="/search">搜索</router-link>
            <router-link class="nav-item" to="/detail">详情</router-link>
            <router-link class="nav-item" to="/admin/user">管理</router-link>
          </div>
          <div class="col-lg-2">
            <router-link to="/" class="logo nav-item">AWWW</router-link>
          </div>
          <div class="col-lg-5 right">
            <span v-if="session.logged_in()">
              <router-link class="nav-item" to="/me/setting">{{session.uinfo().username || '某位不愿透露姓名的网友'}}</router-link>
              <span class="nav-item" @click="session.logout('#/login')">登出</span>
            </span>
            <span v-else>
              <router-link class="nav-item" to="/login">登录</router-link>
              <router-link class="nav-item" to="/signup">注册</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import session from "../lib/session.js";

export default {
  data() {
    return {
      session
    };
  },
};
</script>

<style scoped></style>