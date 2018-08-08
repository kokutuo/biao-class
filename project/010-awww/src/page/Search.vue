<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div>
        <div class="container">
          <form class="cute-form tac" @submit.prevent="search(keyword)">
            <input type="search" v-model="keyword" class="round">
            <button type="submit" hidden></button>
          </form>
          <pre>{{filter}}</pre>
          <div class="row card round filter">
            <div class="col-lg-1 filter-item">分类
              <Dropdown 
                api="category_id"
                @selected="row => {$set(filter, 'category_id', row.id)}"/>
            </div>
            <div class="col-lg-1 filter-item">品种
              <Dropdown 
                api="breed_id"
                @selected="row => {$set(filter, 'breed_id', row.id)}"/>              
            </div>
            <div class="col-lg-1 filter-item">毛色
              <Dropdown 
                api="color_id"
                @selected="row => {$set(filter, 'color_id', row.id)}"/>
            </div>
            <div class="col-lg-1 filter-item">性格
              <Dropdown 
                api="character_id"
                @selected="row => {$set(filter, 'character_id', row.id)}"/>
            </div>
            <div class="col-lg-1 filter-item">性别</div>
            <div class="col-lg-1 filter-item">价格</div>
            <div class="col-lg-1 filter-item">已绝育</div>
            <div class="col-lg-1 filter-item">已接种疫苗</div>
            <div class="col-lg-3 filter-item no-padding"></div>
            <div class="col-lg-1 filter-item more">更多</div>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="container row result">
          <div v-for="it in list" :key="it.id" class="col-lg-6">
            <img :src="it.cover_url || '../img/square-1.jpg'" alt="wawawa" class="round">
          </div>
        </div>

          <Pagination :totalCount="total" :pageLimit="page_limit" :btnLimit="btn_limit" :on-page-change="on_page_change"/>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import "../css/cuteForm.css";

import api from "../lib/api.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";

export default {
  components: { Nav, Footer, Dropdown, Pagination },

  data() {
    return {
      keyword: "",
      filter: {},
      list: [],
      total: 0,
      page_limit: 6,
      btn_limit: 5
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    search(keyword) {
      let query = `where("title" contains "${keyword}")`;
      let f = this.filter;

      f.category_id && (query += `and "category_id" = ${f.category_id}`);
      f.breed_id && (query += `and "breed_id" = ${f.breed_id}`);
      f.color_id && (query += `and "color_id" = ${f.color_id}`);
      f.character_id && (query += `and "character_id" = ${f.character_id}`);

      api("pet/read", query).then(r => (this.list = r.data));
    },

    read(page = 1) {
      api("pet/read", { limit: this.page_limit, page: page }).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    },

    on_page_change(page) {
      this.read(page);
    }
  },

  watch: {
    filter: {
      deep: true,
      handler() {
        this.search();
      }
    }
  }
};
</script>

<style scoped>
.filter {
  background: #ffc105;
  color: #fffbf2;
}

.filter-item {
  font-size: 1.1rem;
  font-weight: 300;
  padding: 8px;
  cursor: pointer;
  text-align: center;
}

.filter-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: greenyellow;
}
</style>