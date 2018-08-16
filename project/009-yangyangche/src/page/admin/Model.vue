<template>
    <div>
        <Nav :push-down="true"/>
        <div class="container row">
            <div class="col-lg-3">
                <AdminNav/>
            </div>
            <div class="col-lg-9 content">
                <div class="header row">
                    <div class="col-lg-8 left">
                        <div class="title">型号管理</div>
                    </div>
                    <div class="col-lg-4 right">
                        <button @click="edit_pattern=true" class="btn-primary">添加</button>
                    </div>
                </div>
                <div v-if="!edit_pattern" class="tool-bar">
                    <form @submit.prevent="search" class="search">
                        <label for="search">快速查找</label>
                        <input id="search" type="search" v-model="keyword">
                        <button class="btn-primary" type="submit">搜</button>
                    </form>
                </div>
                <form v-if="edit_pattern" @submit.prevent="cou($event)">
                    <div class="input-control">
                        <label>车辆型号</label>
                        <input 
                            v-validator="'required|max_length:32'"
                            type="text" 
                            v-model="current.name">
                    </div>
                    <div class="input-control">
                        <label>所属品牌</label>
                        <!-- <input type="number" v-model="current.brand_id"> -->
                        <Dropdown :default='current.brand_id' :list='brand_list' :onSelect='set_brand_id'/>
                    </div>
                    <div class="input-control">
                        <label>车辆类型</label>
                        <!-- <input type="number" v-model="current.brand_id"> -->
                        <Dropdown :default='current.design_id' :list='design_list' :onSelect='set_design_id'/>
                    </div>
                    <div class="input-control">
                        <button class="btn-primary" type="submit">提交</button>
                        <button @click="cancle" type="button">取消</button>
                    </div>
                </form>
                <div v-else class="table">
                    <table>
                        <thead>
                        <th>车辆型号</th>
                        <th>所属品牌</th>
                        <th>车辆类型</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                        <td>{{row.name}}</td>
                        <!-- <td>{{row.brand_id}}</td> -->
                        <!-- <td>{{row.design_id || '-'}}</td> -->
                        <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                        <td>{{row.$design ? row.$design.name :'-'}}</td>
                        <td>
                            <button class="btn-primary" @click="set_current(row)">编辑</button>
                            <button class="btn" @click="remove(row.id)">删除</button>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination v-if="!edit_pattern" :limit='limit' :totalCount='total' :on-page-change='on_page_change'/>
            </div>
        </div>
    </div>
</template>

<script>
import "../../css/admin.css";

import api from "../../lib/api.js";
import AdminPage from "../../mixin/AdminPage";
import Dropdown from "../../components/Dropdown";

export default {
  data() {
    return {
      model: "model",
      brand_list: [],
      design_list: [],
      searchable: ["name"],
      with: [
        { model: "brand", relation: "has_one" },
        { model: "design", relation: "has_one" }
      ]
    };
  },

  components: { Dropdown },

  methods: {
    read_brand() {
      api("brand/read").then(r => {
        this.brand_list = r.data.data;
      });
    },

    read_design() {
      api("design/read").then(r => {
        this.design_list = r.data.data;
      });
    },

    set_brand_id(row) {
      this.$set(this.current, "brand_id", row.id);
    },

    set_design_id(row) {
      this.$set(this.current, "design_id", row.id);
    }
  },

  mixins: [AdminPage],

  mounted() {
    this.read_brand();
    this.read_design();
  }
};
</script>

<style scoped></style>