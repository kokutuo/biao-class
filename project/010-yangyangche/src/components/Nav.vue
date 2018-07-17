<template>
  <div class="main-nav" :style="{
    marginBottom: this.pushDown ? '20px' : '0',
  }">
    <div class="row container">
      <div class="col left">
        <router-link to="/" class="logo"></router-link>
        <!-- <router-link to="/" class="nav-item">首页</router-link> -->
        <router-link to="/admin/user" class="nav-item">管理面板</router-link>
        <SearchBar :width="'50%'"/>
      </div>
      <div class="col right">
        <span v-if="!uinfo">
          <router-link class="nav-item" to="/login">登录</router-link>
          <router-link class="nav-item" to="/signup">注册</router-link>
        </span>
        <span v-else>
          <span class="nav-item">{{uinfo.username || uinfo.phone}}</span>
          <span class="nav-item" @click="logout">登出</span>
        </span>
        <a href="#" class="nav-item tel">400-6666-666</a>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

import session from "../lib/session.js";

export default {
  props: {
    pushDown: {
      default: false
    }
  },

  components: { SearchBar },

  data() {
    return {
      uinfo: session.uinfo()
    };
  },

  methods: {
    logout: session.logout
  }
};
</script>

<style scoped>
.main-nav {
  background: #fff;
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.logo {
  border-width: 1px;
  border-style: solid;
  border-top-color: #ff6c3f;
  border-left-color: #ff6c3f;
  border-right-color: #e95627;
  border-bottom-color: #e95627;
  background: rgb(185, 64, 27);
  background: -moz-linear-gradient(
    0deg,
    rgba(185, 64, 27, 1) 0%,
    rgba(253, 82, 29, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(185, 64, 27, 1) 0%,
    rgba(253, 82, 29, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(185, 64, 27, 1) 0%,
    rgba(253, 82, 29, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#b9401b", endColorstr="#fd521d", GradientType=1);
  /*-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);box-shadow:*/
  /*0 1px 2px rgba(0, 0, 0, .2);*/
  display: inline-block;
  width: 110px;
  height: 43px;
  vertical-align: top;
  background-color: #fd521d;
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: center center;
}

.left {
  left: 130px;
  width: 60%;
}

.right {
  width: 40%;
}

.nav-item {
  display: inline-block;
  padding: 12px;
}

.nav-item {
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

.tel {
  font-weight: bold;
  color: #fd521d;
}
</style>
