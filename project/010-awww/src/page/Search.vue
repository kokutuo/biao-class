<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div>
        <div class="container">
          <div class="row card round filter">
            <div class="col-lg-1 filter-item">分类</div>
            <div class="col-lg-1 filter-item">品种</div>
            <div class="col-lg-1 filter-item">毛色</div>
            <div class="col-lg-1 filter-item">性格</div>
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
          <div class="col-lg-6">
            <img src="../img/square-1.jpg" alt="wawawa" class="round">
          </div>
          <div class="col-lg-6">
            <img src="../img/square-1.jpg" alt="wawawa" class="round">
          </div>
          <div class="col-lg-6">
            <img src="../img/square-1.jpg" alt="wawawa" class="round">
          </div>
          <div class="col-lg-6">
            <img src="../img/square-1.jpg" alt="wawawa" class="round">
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
  background: rgba(0, 0, 0, 0.3);
  color: greenyellow;
}
</style>