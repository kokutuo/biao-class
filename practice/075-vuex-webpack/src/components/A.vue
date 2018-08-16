<template>
  <div>
    <button @click="$store.dispatch('incrementAsync')">{{$store.state.count}}</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>