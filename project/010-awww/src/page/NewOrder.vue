<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <div class="card">
          <form @submit.prevent="submit" v-if="!submitted">
            <h1>创建订单 - {{pet.title}}</h1>
            <div class="cute-form">
              <span class="key">单价</span>
              <span class="val">{{pet.price}}</span>
            </div>
            <div class="cute-form">
              <span class="key">数量</span>
              <span class="val">{{this.current.count}}</span>
            </div>
            <div class="cute-form">
              <span class="key">总价</span>
              <span class="val">{{total}}</span>
            </div>
            <div class="cute-form">
              <span class="key">备注</span>
              <span class="val">
                <input v-model="current.user_memo" type="text">
              </span>
            </div>
            <div class="cute-form">
              <span class="key">支付方式</span>
              <div style="margin-top: 5px;" class="val">
                <label for="wechat">微信支付</label>
                <input 
                  id="wechat"
                  v-model="current.pay_by"
                  value="wechat"
                  type="radio">
                <label for="alipay">支付宝支付</label>
                <input 
                  id="alipay"
                  v-model="current.pay_by"
                  value="alipay"
                  type="radio">
              </div>
            </div>
            <button type="submit" class="btn-primary">提交订单</button>
          </form>
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

export default {
  components: { Nav, Footer },

  data() {
    return {
      submitted: false,
      current: {
        pay_by: "wechat"
      },
      pet: {},
      qrcode: null
    };
  },

  computed: {
    total() {
      if (!this.pet.price) {
        this.pet.price = 0;
      }

      if (!this.current.count) {
        this.current.count = 1;
      }

      return this.pet.price * this.current.count;
    }
  },

  methods: {
    submit() {
      this.current.user_id = session.his_id();
      this.current.sum = this.total;
      this.current.oid = generator_oid(this.pet.id);
      this.current.product_info = this.pet.id;

      api("order/create", this.current).then(r => {
        this.current.id = r.data.id;
        this.$router.push("/pay/" + r.data.oid);
      });
    },

    find(id) {
      api("pet/find", { id }).then(r => {
        this.pet = r.data;
      });
    },
  }
};
</script>

<style scoped>
</style>