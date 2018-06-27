<template>
  <div>
    <Signup/>
  </div>
</template>

<script>
import Home from "./page/Home";
import Detail from "./page/Detail";
import Login from "./page/Login";
import Signup from './page/Signup';

export default {
  name: "Root",
  components: { Home, Detail, Login, Signup },
};
</script>

<style>
</style>