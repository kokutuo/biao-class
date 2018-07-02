<template>
  <div>
    <!-- <Login/> -->
    <!-- <Signup/> -->

    <!-- <Home/> -->
    <!-- <Detail/> -->
    <!-- <SearchResult/> -->

    <!-- <Me/> -->
    <!-- <User/> -->
    <!-- <Vehicle/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "./page/Login";
import Signup from "./page/Signup";

import Home from "./page/Home";
import Detail from "./page/Detail";
import SearchResult from "./page/SearchResult";

import Me from "./page/settings/Me";
import User from "./page/admin/User";
import Vehicle from "./page/admin/Vehicle";
import Brand from "./page/admin/Brand";
import Model from "./page/admin/Model";
import Design from "./page/admin/Design";

export default {
  name: "Root",
  components: {
    Login,
    Signup,

    Home,
    Detail,
    SearchResult,

    Me,
    User,
    Vehicle,
    Brand,
    Model,
    Design,
  }
};
</script>

<style>
</style>