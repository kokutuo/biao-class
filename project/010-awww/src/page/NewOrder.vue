<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <div class="box order round">
          <form @submit.prevent="submit" v-if="(current.pet_id || this.from_cart) && !submitted">
            <h1>创建订单 - {{this.from_cart ? '购物车结算' : pet.title}}</h1>

            <div v-if="current.pet_id">
              <div class="cute-form">
                <span class="key">单价</span>
                <span class="val">{{pet.price}}</span>
              </div>
              <div class="cute-form">
                <span class="key">数量</span>
                <span class="val">{{this.current.count}}</span>
              </div>
            </div>

            <div v-else>
              <div v-if="it._checked" v-for="it in hub.cart" :key="it.id" class="cart-item">
                <div class="col-lg-4">
                  <img :src="it.$pet ? it.$pet.cover_url : '../img/square-1.jpg'" :alt="it.$pet.title">
                  <span>{{it.$pet ? it.$pet.title : '???'}}</span>
                </div>
                <div class="col-lg-1 currency tac">
                  {{it.$pet ? it.$pet.price : '???'}}
                </div>
                <div class="col-lg-2 tac count">
                  <button @click="it.count>1 && it.count--" class="left-round"> - </button>
                  <input v-model.number="it.count" type="text" class="round">
                  <button @click="it.count++" class="right-round"> + </button>
                </div>
                <div class="col-lg-2 currency tac">
                  {{it.$pet ? it.$pet.price * it.count : '???'}}
                </div>
                <div class="col-lg-2 tac">
                  <button @click="it._checked=false" class="btn-small round">删除</button>
                </div>
              </div>
            </div>
            
            <div class="cute-form">
              <span class="key">总价</span>
              <span class="val">{{total}}</span>
            </div>
            <div class="cute-form">
              <span class="key">备注</span>
              <span class="val">
                <input style="padding:5px 10px" v-model="current.user_memo" autofocus type="text" class="round">
              </span>
            </div>
            <div class="cute-form pay_by">
              <span style="margin-top: 5px;" class="key">支付方式</span>
              <div class="val">
                <input 
                  id="wechat"
                  v-model="current.pay_by"
                  value="wechat"
                  type="radio">
                <label for="wechat">微信支付</label>
                <input 
                  id="alipay"
                  v-model="current.pay_by"
                  value="alipay"
                  type="radio">
                <label for="alipay">支付宝支付</label>
              </div>
            </div>
            <button type="submit" class="btn-primary round">提交订单</button>
          </form>
          <div v-else>加载中···</div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import "../css/cuteForm.css";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import api from "../lib/api.js";
import session from "../lib/session.js";
import { generator_oid } from "../lib/order.js";

import { all, each } from "../hub/cart.js";

export default {
  components: { Nav, Footer },

  mounted() {
    this.current = Object.assign({}, this.current, this.$route.params);
    this.from_cart = this.$route.query.from_cart;
    this.find(this.current.pet_id);
  },

  data() {
    return {
      from_cart: false,
      submitted: false,
      current: {
        pay_by: "wechat"
      },
      pet: {},
      qrcode: null,
      hub: all()
    };
  },

  computed: {
    total() {
      let total = 0;

      if (this.from_cart) {
        each(it => {
          if (!it._checked) {
            return;
          }
          total += it.$pet.price * it.count;
        });
      } else {
        if (!this.pet.price) {
          this.pet.price = 0;
        }

        if (!this.current.count) {
          this.current.count = 1;
        }

        total = this.pet.price * this.current.count;
      }

      return total;
    },

    checked_cart() {
      let cart = this.hub.cart;
      let checked = {};

      each((it, id) => {
        if (!it._checked) {
          return;
        }
        checked[id] = it;
      });
    }
  },

  methods: {
    submit() {
      this.current.user_id = session.his_id();
      this.current.sum = this.total;
      this.current.oid = generator_oid(this.pet.id);
      this.current.product_info = this.pet.id || this.hub.cart;

      api("order/create", this.current).then(r => {
        this.current.id = r.data.id;
        this.$router.push("/pay/" + r.data.oid);
      });
    },

    find(id) {
      if (!id) {
        return;
      }

      api("pet/find", { id }).then(r => {
        this.pet = r.data;
      });
    }
  }
};
</script>

<style scoped>
.order {
  max-width: 500px;
  background: #000;
  margin: 0 auto;
  padding-left: 25px;
  color: #fff;
}

.pay_by input {
  margin-right: 5px;
}

.pay_by label {
  display: inline-block;
  margin-right: 25px;
  color: #fff;
}
</style>