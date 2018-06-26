<template>
  <div>
    <Detail/>
  </div>
</template>

<script>
  import Home from "./page/Home";
  import Detail from './page/Detail';

  export default {
    name      : "Root",
    components: { Home, Detail },
  };
</script>

<style>

</style>