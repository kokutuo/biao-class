<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div>
        <div class="container">
          <pre>{{filter}}</pre>
          <div class="col-lg-4">
            <form class="cute-form tac" @submit.prevent="search(keyword)">
              <input type="search" v-model="keyword" class="round">
              <button type="submit" hidden></button>
            </form>
          </div>
          <div class="row card round filter">
            <div class="col-lg-1 filter-item">
              <Dropdown 
                api="category_id"
                placeholder="分类"
                @selected="row => {$set(filter, 'category_id', row.id)}"/>
            </div>
            <div class="col-lg-1 filter-item">
              <Dropdown 
                api="breed_id"
                placeholder="品种"
                @selected="row => {$set(filter, 'breed_id', row.id)}"/>              
            </div>
            <div class="col-lg-1 filter-item">
              <Dropdown 
                api="color_id"
                placeholder="毛色"
                @selected="row => {$set(filter, 'color_id', row.id)}"/>
            </div>
            <div class="col-lg-1 filter-item">
              <Dropdown 
                api="character_id"
                placeholder="性格"
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
            <router-link :to="`/detail/${it.id}`">
              <div class="round hover">
                <img :src="it.cover_url || '../img/square-1.jpg'" alt="wawawa" class="round">
                <div class="text">
                  <div class="title">{{it.title}}</div>
                  <div class="desc">{{it.description}}</div>
                  <div class="currency">{{it.price}}</div>
                </div>
              </div>
            </router-link>
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
      current_page: 1,
      total: 0,
      page_limit: 6,
      btn_limit: 5
    };
  },

  mounted() {
    this.read();
    this.keyword = this.$route.query.keyword;
  },

  methods: {
    search(keyword) {
      let query = `where("title" contains "${keyword}")`;
      let f = this.filter;

      f.category_id && (query += `and "category_id" = ${f.category_id}`);
      f.breed_id && (query += `and "breed_id" = ${f.breed_id}`);
      f.color_id && (query += `and "color_id" = ${f.color_id}`);
      f.character_id && (query += `and "character_id" = ${f.character_id}`);

      api("pet/read", {query, page: this.current_page, limit: this.page_limit}).then(r => (this.list = r.data));
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

.round.hover {
  position: relative;
}

.round.hover:hover .text {
  opacity: 1;
}

.round.hover .text {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
  color: #fffbf2;
  padding: 10px;
  font-size: 14px;
  transition: opacity 300ms;
}

.round.hover .text>* {
  margin-bottom: 5px;
}

.round.hover .text .title {
  font-size: 24px;
}

.round.hover .text .currency {
  color: #ffc105;
  font-weight: bolder;
  text-align: right;
  font-size: 18px;
  padding-right: 30px;
}
</style>