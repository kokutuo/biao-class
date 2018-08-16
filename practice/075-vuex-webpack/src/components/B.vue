<template>
  <div>
    <button @click="$store.dispatch.getData">0</button>
    {{$store.state.data}}
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>