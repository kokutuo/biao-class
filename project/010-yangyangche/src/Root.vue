<template>
  <div>
    <Me/>
  </div>
</template>

<script>
import Home from "./page/Home";
import Detail from "./page/Detail";
import Login from "./page/Login";
import Signup from './page/Signup';
import Me from './page/settings/Me';

export default {
  name: "Root",
  components: { Home, Detail, Login, Signup, Me },
};
</script>

<style>
</style>