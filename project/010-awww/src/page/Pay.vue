<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container">
        <div class="box">
          <div v-if="current.pay_by=='wechat'" class="tac">
            <h2>扫码支付</h2>
            <img :src="qrcode" alt="二维码" class="qrcode">
            <button class="btn-primary" @click="verify">支付完成</button>
          </div>
          <div v-if="current.pay_by=='alipay'">
            跳转中，别着急···
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import api from "../lib/api.js";
import { url } from "../lib/url.js";
import session from "../lib/session.js";
import { generator_oid } from "../lib/order.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer },

  data() {
    return {
      current: {},
      qrcode: null
    };
  },

  mounted() {
    this.find(this.$route.params.oid);
  },

  methods: {
    find(oid) {
      api("order/first", {
        where: { oid }
      }).then(r => {
        let row = (this.current = r.data);
        let pay_by = row.pay_by;
console.log('this.current', this.current);
console.log('row', row);

        if (!row) {
          alert("订单号有误");
          this.go_me_order();
        }

        this.pay(row.id, pay_by, row.sum);

        this.current = r.data || {};
      });
    },

    pay(id, pay_by, fee) {
      if (fee > 0.02) {
        fee = 0.02;
      }

      return api("order/payment/url", {
        id: id,
        pay_by: pay_by,
        fee: fee,
        return_url: url("/#/me/order")
      }).then(r => {
        if (r.data.url) {
          //有地址，说明是支付宝，就跳转过去
          location.href = r.data.url;
        } else {
          // 没有地址，那就是微信支付，拿到付款二维码
          this.qrcode = r.data.qrcode;
        }
      });
    },

    verify() {
      api("order/find", { id: this.current.id }).then(r => {
        if (r.data._paid) {
          alert("支付成功");
          this.go_me_order();
        } else {
          alert("支付失败");
        }
      });
    },

    go_me_order() {
      this.$router.push("/me/order");
    }
  }
};
</script>

<style scoped>
.qrcode {
  max-width: 300px;
  margin: 10px auto;

}
</style>