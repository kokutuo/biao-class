<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <swiper v-if="hot.length>0" :options="swiperOption">
          <swiper-slide v-for="it in hot" :key="it.id">
            <router-link :to="`/detail/${it.id}`" class="slider">
              <img class="round" :src="it.cover_url" :alt="it.title">
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
              <span class="title">{{it.name}}</span>
            </div>
            <div class="right col-lg-8 cat-nav">
              <router-link 
                v-for="breed in it.breed_list" 
                :key="breed.id" 
                to="/search" 
                class="nav-item">{{breed.name}}
              </router-link>
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
                <router-link :to="`/detail/${pet.id}`">
                  <img :src="pet.cover_url" class="round">
                </router-link>
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

  mounted() {
    this.read_hot();
    this.read_cat();
  },

  data() {
    return {
      hot: [],
      cat: [],
      swiperOption: {
        slidesPreView: 1,
        spaceBetween: 30,
        loop: true,
        effect: "fade",
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true
        }
      }
    };
  },

  methods: {
    read_hot() {
      api("pet/read", { where: { hot: true } }).then(r => {
        this.hot = r.data || [];
      });
    },

    read_cat() {
      api("category/read", { where: { promoting: true } }).then(r => {
        this.cat = r.data || [];
        this.read_pet_by_cat();
        this.read_breed_by_cat();
      });
    },

    read_pet_by_cat() {
      this.cat.forEach(it => {
        api("pet/read", { where: { category_id: it.id }, limit: 8 }).then(
          r => {
            this.$set(it, "pet_list", r.data);
          }
        );
      });
    },

    read_breed_by_cat() {
      this.cat.forEach(it => {
        api("breed/read", { where: { category_id: it.id }, limit: 6 }).then(
          r => {
            this.$set(it, "breed_list", r.data);
          }
        );
      });
    }
  }
};
</script>

<style scoped>
.swiper-slide {
  max-height: 600px;
}

.swiper-slide img {
  border-radius: 6px;
  max-height: 600px;
}
</style>