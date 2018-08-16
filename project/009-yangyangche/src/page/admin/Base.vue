<template>
  <div>
    <div class="wrap">
      <router-view></router-view>
    </div>

    <Footer/>
  </div>
</template>

<script>
import "../../css/admin.css";

import Nav from "../../components/Nav";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";

export default {
  components: {
    Nav,
    AdminNav,
    Footer
  }
};
</script>

<style scoped>
</style>


