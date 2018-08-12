<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <div class="box order round">
          <form @submit.prevent="submit" v-if="(current.pet_id || this.from_cart) && !submitted">
            <h1>确认订单 - {{this.from_cart ? '购物车结算' : pet.title}}</h1>

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
              <div class="row cart-header">
                <div class="col-lg-4 tac">商品</div>
                <div class="col-lg-1 tac">单价</div>
                <div class="col-lg-2 tac">数量</div>
                <div class="col-lg-2 tac">小计</div>
              </div>
              <div v-if="it._checked" v-for="it in hub.cart" :key="it.id" class="row cart-item">
                <div class="col-lg-4">
                  <img :src="it.$pet ? it.$pet.sale_url : '../img/square-1.jpg'" :alt="it.$pet.title">
                  <span>{{it.$pet ? it.$pet.title : '???'}}</span>
                </div>
                <div class="col-lg-1 currency tac">
                  {{it.$pet ? it.$pet.price : '???'}}
                </div>
                <div class="col-lg-2 tac count">
                  {{it.count}}
                </div>
                <div class="col-lg-2 currency tac">
                  {{it.$pet ? it.$pet.price * it.count : '???'}}
                </div>
              </div>
            </div>
            
            <div :class="from_cart&&'pay'">
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
                <span class="val">
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
                </span>
              </div>
              <div class="tar">
                <button type="submit" class="btn-primary round">提交订单</button>
              </div>
            </div>
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
    console.log('this.$route.query', this.$route.query);
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
  position: relative;
  max-width: 100%;
  background: #fff;
  margin: 0 auto;
  padding-left: 25px;
  color: #000;
  padding-bottom: 180px;
}

.cart-header {
  padding: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
}

.cart-item img {
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

.pay_by input {
  margin-right: 5px;
}

.pay_by label {
  display: inline-block;
  margin-right: 25px;
  color: #000;
}

.pay {
  position: absolute;
  right: 15px;
}
</style>