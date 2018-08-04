<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <!-- <div class="slider">
          <router-link to="/detail">
            <img src="../img/slider-2.jpg" alt="喵喵喵">
          </router-link>
        </div> -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="it in hot" :key="it.id">
            <router-link to="`/detail/${it.id}`" class="slider">
              <img :src="it.cover_url" alt="it.title">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="main">
        <div class="container row">
          <div class="col-lg-4">
            <img src="../img/square-1.jpg" alt="汪汪汪" class="round">
          </div>
          <div class="col-lg-4">
            <img src="../img/square-1.jpg" alt="汪汪汪" class="round">
          </div>
          <div class="col-lg-4">
            <img src="../img/square-1.jpg" alt="汪汪汪" class="round">
          </div>
        </div>

        <div v-for="it in cat" :key="it.id" class="container row cat-prom">
          <div class="nav">
            <div class="left col-lg-4">
              <span class="title nav-item">{{it.name}}</span>
            </div>
            <div class="right col-lg-8 cat-nav">
              <a href="#" class="nav-item">哈士奇</a>
              <a href="#" class="nav-item">沙皮</a>
              <a href="#" class="nav-item">拉布拉多</a>
              <a href="#" class="nav-item">吉娃娃</a>
              <a href="#" class="nav-item">牛头</a>
              <a href="#" class="nav-item">博美</a>
              <a href="#" class="nav-item">柴犬</a>
              <a href="#" class="nav-item">金毛</a>
            </div>
          </div>
          <div class="body">
            <div class="row">
              <div class="col-lg-12">
                <img :src="it.cover_url" class="round">
              </div>
            </div>
            <div class="row">
              <div v-for="pet in it.pet_list" :key="pet.id" class="col-lg-3">
                <img :src="pet.cover_url" class="round">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import api from "../lib/api.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer },

  data() {
    return {
      hot: [],
      cat: [],
      swiperOption: {
        keyboard: true,
        clickable: true,
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      }
    };
  },

  methods: {
    read_hot() {
      api("pet/read", { where: { hot: true } }).then(r => {
        this.hot = r.data;
      });
    },

    read_cat() {
      api("category/read", { where: { promoting: true } }).then(r => {
        this.cat = r.data;
        console.log('this.cat', this.cat);
      });
    },

    read_pet_by_cat() {
      this.cat.forEach(it => {
        api("pet/read", { where: { category_id: it.id }, limit: 16 }).then(
          r => {
            this.$set(it, "pet_list", r.data);
          }
        );
      });
    }
  }
};
</script>

<style scoped>
</style>