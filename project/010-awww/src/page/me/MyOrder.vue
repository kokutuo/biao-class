<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container row">
        <div class="col-lg-3">
          <setting-nav/>
        </div>
        <div class="col-lg-9 content">
          <div class="header">
            <div class="title">我的订单</div>
          </div>
          <div class="table">
            <table>
              <thead>
                <th>订单号</th>
                <th>总价</th>
                <th>已付款</th>
                <th>产品信息</th>
                <th>操作</th>
              </thead>
              <tbody>
                <tr v-for="row in list" :key="row.id">
                  <td>{{row.oid || '-'}}</td>
                  <td>{{row.sum || 0}}</td>
                  <td>{{row._paid ? '是' : '否'}}</td>
                  <td><span @click="show_detail(row)" class="anchor">详情</span></td>
                  <td>
                    <div>
                      <div v-if="!row._paid">
                        <router-link :to="`/pay/${row.oid}`">
                          <button type="button" class="btn-primary left-round">付款</button>
                        </router-link>
                        <button @click="cancel(row.id)" class="right-round">取消订单</button>
                      </div>
                      <div v-else> - </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="detail_visible" class="modal">
      <div @click="detail_visible=false" class="mask"></div>
      <div class="box modal-content round">
        <h2>{{pet.title}}</h2>
        <div class="cute-form">
          <div class="key">价格</div>
          <div class="val">{{pet.price || '-'}}</div>
        </div>
        <div class="cute-form">
          <div class="key">性别</div>
          <div class="val">{{pet.sex ? '雄' : '雌'}}</div>
        </div>
        <div class="cute-form">
          <div class="key">品种</div>
          <div class="val">{{pet.breed_id || '-'}}</div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import "../../css/cuteForm.css";

import session from "../../lib/session.js";
import api from "../../lib/api.js";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import SettingNav from "../../components/SettingNav";

export default {
  components: { Nav, Footer, SettingNav },

  data() {
    return {
      current: {},
      pet: {},
      list: [],
      detail_visible: false
    };
  },

  mounted() {
    this.read();
  },

  methods: {
    show_detail(row) {
      this.current = row;
      this.detail_visible = true;
      this.find_pet(row.product_info);
    },

    find_pet(pet_id) {
      api("pet/find", { id: pet_id }).then(r => {
        this.pet = r.data;
      });
    },

    read() {
      api("order/read", {
        with: "has_one:pet",
        where: { user_id: session.his_id() }
      }).then(r => {
        this.list = r.data;
      });
    },

    cancel(id) {
      if (!confirm("是否取消该订单？")) {
        return;
      }

      api("order/delete", { id }).then(() => {
        this.read();
      });
    }
  }
};
</script>

<style scoped>
.modal-content {
  position: absolute;
  background: #FAFAFA;
  background-image: url(../../img/bg.png);
  background-size: 25%;
  -moz-background-size: 25%;
  -webkit-background-size: 25%;
  width: 500px;
  top: 160px;
  left: 40%;
  right: 40%;
  margin-left: 0;
  margin-right: 0;
  z-index: 1;
}

.mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>