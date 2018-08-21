<template>
  <div id="nav">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <router-link class="nav-item" to="/"><i class="fab fa-pied-piper-alt fa-2x">LOGO</i></router-link>
          </div>
          <div class="col-lg-5">
            <el-input 
              size="small" 
              suffix-icon="el-icon-search" 
              class="nav-input"
              placeholder="搜索微博、找人">
            </el-input>
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-4 right">
            <router-link class="nav-item" to="/">
              <i class="fas fa-lg fa-home"></i>首页
            </router-link>
            <span v-if="!session.logged_in()">
              <router-link class="nav-item" to="/login">登录</router-link>
              <router-link class="nav-item" to="/signup">注册</router-link>
            </span>
            <span v-else>
              <router-link class="nav-item" to="/person">{{session.uinfo().username || session.uinfo().phone}}</router-link>
              <span class="nav-item" @click="session.logout('#/login')">登出</span>
            </span>
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
  }
};
</script>

<style scoped>
#nav {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

#nav * {
  vertical-align: middle;
}

.nav-item {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.8;
  cursor: pointer;
  transition: all 200ms;
  color: #303133;
}

.nav-item:hover {
  color: #409eff;
  opacity: 1;
}
</style>