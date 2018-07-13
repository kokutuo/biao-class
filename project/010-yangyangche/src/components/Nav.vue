<template>
  <div class="main-nav" :style="{
    marginBottom: this.pushDown ? '20px' : '0',
  }">
    <div class="row container">
      <div class="col left">
        <router-link to="/" class="logo"></router-link>
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/admin/user" class="nav-item">管理面板</router-link>
        <SearchBar :width="'50%'"/>
      </div>
      <div class="col right">
        <router-link class="nav-item" to="/login">登录</router-link>
        <router-link class="nav-item" to="/signup">注册</router-link>
        <a href="#" class="nav-item tel">400-6666-666</a>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  props: {
    pushDown: {
      default: false
    }
  },

  components: { SearchBar }
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
  display: inline-block;
  width: 130px;
  height: 42px;
  background: #fd521d;
  vertical-align: top;
}

.left {
  left: 130px;
  width: 70%;
}

.right {
  width: 30%;
}

.nav-item {
  display: inline-block;
  padding: 12px;
}

.nav-item {
  color: #555;
  text-decoration: none;
}

.tel {
  font-weight: bold;
  color: #fd521d;
}
</style>
