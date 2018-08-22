<template>
  <Nav/>
</template>

<script>
import api from '../lib/api.js';
import session from '../lib/session.js';

import Nav from "../components/Nav";
import CardWeibo from "../components/CardWeibo";

export default {
  components: { Nav, CardWeibo },

  data() {
    return {
      list: [],
      uinfo: session.uinfo();
    };
  },

  methods: {
    read_weibo() {
      api()
    }
  }
};
</script>

<style scoped>
</style>