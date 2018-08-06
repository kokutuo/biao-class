<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <div class="cart round">
          <div class="row cart-header">
            <div class="col-lg-1">
              <input type="checkbox" id="all">
              <label for="all">全选</label>
            </div>
            <div class="col-lg-4 tac">商品</div>
            <div class="col-lg-1 tac">单价</div>
            <div class="col-lg-2 tac">数量</div>
            <div class="col-lg-2 tac">小计</div>
            <div class="col-lg-2 tac">操作</div>
          </div>

          <div class="cart-content">
            <div class="cart-list">
              <div v-for="(it, index) in list.cart" :key="index" class="row cart-item">
                <div class="col-lg-1">
                  <input type="checkbox">
                </div>
                <div class="col-lg-4">
                  <img :src="it.$pet ? it.$pet.cover_url : '../img/square-1.jpg'" :alt="it.$pet.title">
                  <span>{{it.$pet ? it.$pet.title : '???'}}</span>
                </div>
                <div class="col-lg-1 currency tac">
                  {{it.$pet ? it.$pet.price : '???'}}
                </div>
                <div class="col-lg-2 tac count">
                  <button @click="it.count--" class="left-round"> - </button>
                  <input v-model="it.count" type="text">
                  <button @click="it.count++" class="right-round"> + </button>
                </div>
                <div class="col-lg-2 currency tac">
                  {{it.$pet ? it.$pet.price * it.count : '???'}}
                </div>
                <div class="col-lg-2 tac">
                  <button @click="remove(it.id)" class="btn-small round">删除</button>
                </div>
              </div>
            </div>
            <div class="row cart-foot">
              <div class="col-lg-6 left total">共计：￥9999</div>
              <div class="col-lg-6 right">
                <button class="btn-primary round">付款</button>
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
import { hub, all, remove, count } from "../hub/cart.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer },

  mounted() {},

  data() {
    return {
      list: all()
    };
  },

  computed: {
  },

  methods: {
    count,
    remove
  }
};
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.cart-header {
  padding: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, .2);
}


.cart-list img {
  display: inline-block;
  max-width: 100px;
  min-height: 80px;
  padding: 6px;
  margin-right: 5px;
}

.cart-item * {
  vertical-align: top;
}

.cart-item {
  margin-top: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.cart-item:last-child {
  border-bottom: 0;
}

.cart-foot {
  margin-top: 25px;
  padding-top: 8px;
  border-top: 5px dashed #ffc105;
}

.count input {
  max-width: 55px;
  text-align: center;
}

.count button {
  background: transparent;
  font-weight: bolder;
}

.cart-foot .total {
  font-size: 24px;
  font-weight: bolder;
  color: #ffc105;
}
</style>