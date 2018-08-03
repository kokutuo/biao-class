<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>

        <div class="col-lg-9 content">
          <div class="header row">
            <div class="col-lg-8">
              <div class="title">订单管理</div>
            </div>
            <div class="col-lg-4 right">
              <button @click="edit_pattern=true" class="btn-primary">添加</button>
            </div>
          </div>

          <div v-if="!edit_pattern" class="tool-bar">
            <form @submit.prevent="search" class="search">
              <label for="search">快速查找</label>
              <input id="search" type="search" v-model="keyword">
              <button class="btn-primary">搜</button>
            </form>
          </div>

          <form v-if="edit_pattern" @submit.prevent="cou">
            <!-- <div class="input-control">
              <label>用户</label>
                <Dropdown 
                  :default='current.user_id' 
                  :list='user_list' 
                  :onSelect='set_user_id'/>
            </div> -->
            <div class="input-control">
              <label>订单号</label>
              <input 
                v-model="current.oid"
                type="text">
            </div>
            <div class="input-control">
              <label>总价</label>
              <input 
                v-model="current.sum"
                type="text">
            </div>
            <div class="input-control">
              <label>支付方式</label>
              <input 
                v-model="current.pay_by"
                type="text">
            </div>
            <div class="input-control">
              <label>商品信息</label>
              <input 
                v-model="current.product_info"
                type="text">
            </div>
            <div class="input-control">
              <label>备注</label>
              <input 
                v-model="current.memo"
                type="text">
            </div>
            <div class="input-control">
              <button type="submit" class="btn-primary">提交</button>
              <button @click="cancel" type="button">取消</button>
            </div>
          </form>

          <div v-else class="table">
            <table>
              <thead>
                <!-- <th>客户</th> -->
                <th>订单号</th>
                <th>总价</th>
                <th>支付方式</th>
                <th>商品信息</th>
                <th>已付款</th>
                <th>备注</th>
                <th>操作</th>
              </thead>
              <tbody>
                <tr v-for="row in list" :key="row.id">
                  <!-- <td>{{row.$user ? row.$user.username : '-'}}</td> -->
                  <td>{{row.oid || '-'}}</td>
                  <td>{{row.sum || '-'}}</td>
                  <td>{{row.pay_by || '-'}}</td>
                  <td>{{row.product_info}}</td>
                  <td>{{row._paid ? '是' : '否'}}</td>
                  <td>{{row.memo || '-'}}</td>
                  <td>
                    <button @click="set_current(row)" class="btn-primary">编辑</button>
                    <button @click="remove(row.id)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <Footer/>
  </div>
</template>

<script>
import api from '../../lib/api.js';

import AdminPage from "../../mixins/AdminPage";

export default {
  mixins: [AdminPage],

  mounted() {
    this.read_user();
  },

  data() {
    return {
      model: "order",
      with: [{ model: "user", relation: "has_one" }],
      searchable: ["user_id", "pay_by"],
      user_list: []
    };
  },

  methods: {
    read_user() {
      api("user/read").then(r => {
        this.user_list = r.data;
      });
    },

    set_user_id(row) {
      this.$set(this.current, 'user_id', row.id);
    }
  }
};
</script>

<style scoped>
</style>