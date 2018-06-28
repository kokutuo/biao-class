<template>
  <div>
    <!-- <Home/> -->
    <!-- <Detail/> -->
    <!-- <Login/> -->
    <!-- <Signup/> -->
    <!-- <Me/> -->
    <!-- <User/> -->
    <SearchResult/>
  </div>
</template>

<script>
import Home from "./page/Home";
import Detail from "./page/Detail";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Me from "./page/settings/Me";
import User from "./page/admin/User";
import SearchResult from './page/SearchResult';

export default {
  name: "Root",
  components: { Home, Detail, Login, Signup, Me, User, SearchResult },
};
</script>

<style>
</style>