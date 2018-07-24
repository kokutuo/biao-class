<template>
  <div class="wrap">
    <Nav/>

    <div class="container">
      <div class="slider">
        <img src="../img/slider-2.jpg" alt="喵喵喵">
      </div>
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

      <div class="container row cat-prom">
        <div class="nav">
          <div class="left col-lg-4">
            <span class="title">汪星人</span>
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
              <img src="../img/long-2.jpg" alt="yo" class="round">
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3">
              <img src="../img/square-1.jpg" alt="www" class="round">
            </div>
            <div class="col-lg-3">
              <img src="../img/square-1.jpg" alt="www" class="round">
            </div>
            <div class="col-lg-3">
              <img src="../img/square-1.jpg" alt="www" class="round">
            </div>
            <div class="col-lg-3">
              <img src="../img/square-1.jpg" alt="www" class="round">
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer }
};
</script>

<style scoped>
</style>