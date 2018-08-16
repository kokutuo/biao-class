<template>
  <div>
    <div class="wrap">
      <Nav/>
      <div class="container">
        <div class="cart round">
          <h1 class="tac">我的购物车</h1>
          <div class="row cart-header">
            <div class="col-lg-1">
              <input @click="toggle_all" v-model="checked_all" type="checkbox" id="all">
              <label for="all">全选</label>
            </div>
            <div class="col-lg-4 tac">商品</div>
            <div class="col-lg-1 tac">单价</div>
            <div class="col-lg-2 tac">数量</div>
            <div class="col-lg-2 tac">小计</div>
            <div class="col-lg-2 tac">操作</div>
          </div>

          <div v-if="count()" class="cart-content">
            <div class="cart-list">
              <div v-for="(it, index) in hub.cart" :key="index" class="row cart-item">
                <div class="col-lg-1">
                  <input v-model="it._checked" type="checkbox">
                </div>
                <div class="col-lg-4">
                  <router-link :to="`/detail/${it.pet_id}`">
                    <img :src="it.$pet ? it.$pet.sale_url : '../img/square-1.jpg'" :alt="it.$pet.title">
                    <span>{{it.$pet ? it.$pet.title : '???'}}</span>
                  </router-link>
                </div>
                <div class="col-lg-1 currency tac">
                  {{it.$pet ? it.$pet.price : '???'}}
                </div>
                <div class="col-lg-2 tac count">
                  <button @click="it.count>1 && it.count--" class="left-round"> - </button>
                  <input v-model.number="it.count" type="text">
                  <button @click="it.count++" class="right-round"> + </button>
                </div>
                <div class="col-lg-2 currency tac">
                  {{it.$pet ? it.$pet.price * it.count : '???'}}
                </div>
                <div class="col-lg-2 tac">
                  <button @click="remove(it.id)" class="round">删除</button>
                </div>
              </div>
            </div>
            <div class="row cart-foot">
              <div class="col-lg-6 left sum">共计：￥{{sum}}</div>
              <div class="col-lg-6 right">
                <router-link to="/new_order/?from_cart=true">
                  <button class="btn-primary round">付款</button>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="empty-holder">暂无内容</div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import { all, remove, count } from "../hub/cart.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer },

  data() {
    return {
      hub: all(),
      checked_all: false
    };
  },

  computed: {
    sum() {
      let cart = this.hub.cart;
      let sum = 0;
      for (const id in cart) {
        if (cart.hasOwnProperty(id)) {
          const it = cart[id];
          if (!it._checked) {
            continue;
          }
          sum += it.$pet.price * it.count;
        }
      }

      return sum;
    }
  },

  methods: {
    count,
    remove,
    toggle_all() {
      let cart = this.hub.cart;
      for (const id in cart) {
        if (cart.hasOwnProperty(id)) {
          const it = cart[id];
          this.$set(it, "_checked", !this.checked_all);
        }
      }
    }
  }
};
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
}

.cart-header {
  padding: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
}

.cart-list img {
  display: inline-block;
  max-width: 150px;
  min-height: 100px;
  padding: 6px;
  margin-right: 5px;
}

.cart-item * {
  vertical-align: top;
}

.cart-item {
  margin-top: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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

.cart-foot .sum {
  font-size: 24px;
  font-weight: bolder;
  color: #ffc105;
}
</style>