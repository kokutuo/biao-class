<template>
    <form @submit.prevent="search(); submit()" class="search-bar" :style="{width: width}">
        <input 
					@keyup="change"
          v-model="kwd"
          type="search" 
          placeholder="请输入搜索关键词，如：别克1.6L···" 
          autocomplete="off" 
          autofocus>
        <button type="submit">搜索</button>
    </form>
</template>

<script>
export default {
  props: ['width', 'onChange', 'onSubmit', 'keyword'],

  data() {
    return {
      kwd: '',
    };
  },

  methods: {
    change() {
      if (this.onChange) {
        this.onChange(this.kwd);
      }
    },

    submit() {
      if (this.onSubmit) {
        this.onSubmit(this.kwd);
      }
    },

    search() {
      this.$router.push({
        path: "/search",
        query: { keyword: this.kwd }
      });
    }
  },

  watch: {
    keyword(n) {
      this.kwd = n;
    }
  }
};
</script>

<style scoped>
.search-bar {
  min-width: 150px;
  display: inline-block;
}

.search-bar input {
  width: 35%;
  border-radius: 5px 0 0 5px;
  outline: 0;
}

.search-bar [type="submit"] {
  border-left: 0;
  border-radius: 0 5px 5px 0;
}

.search-bar [type="submit"]:hover {
  background: #fd5400;
  color: #fff;
}
</style>
