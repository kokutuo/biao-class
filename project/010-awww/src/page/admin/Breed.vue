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
              <div class="title">血统管理</div>
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
            <div class="input-control">
              <label>血统</label>
              <input 
                v-model="current.name"
                type="text">
            </div>
            <div class="input-control">
              <label>种类</label>
                <Dropdown 
                  :default='current.category_id' 
                  :list='category_list' 
                  :onSelect='set_category_id'/>
            </div>
            <div class="input-control">
              <button type="submit" class="btn-primary">提交</button>
              <button @click="cancel" type="button">取消</button>
            </div>
          </form>

          <div v-else class="table">
            <table>
              <thead>
                <th>血统</th>
                <th>种类</th>
                <th>操作</th>
              </thead>
              <tbody>
                <tr v-for="row in list" :key="row.id">
                  <td>{{row.name}}</td>
                  <td>{{row.$category ? row.$category.name : '-'}}</td>
                  <td>
                    <button @click="set_current(row)" class="btn-primary">编辑</button>
                    <button @click="remove(row.id)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Pagination v-if="!edit_pattern" :totalCount="total" :pageLimit="page_limit" :btnLimit="btn_limit" :on-page-change="on_page_change"/>
        </div>
      </div>
    </div>
    
    <Footer/>
  </div>
</template>

<script>
import AdminPage from "../../mixins/AdminPage";
import api from "../../lib/api";

export default {
  mixins: [AdminPage],

  mounted() {
    this.read_category();
  },

  data() {
    return {
      category_list: [],
      model: "breed",
      searchable: ["name", "category_id"],
      with: [{ model: "category", relation: "has_one" }]
    };
  },

  methods: {
    read_category() {
      api("category/read").then(r => {
        this.category_list = r.data;
      });
    },

    set_category_id(row){
      this.$set(this.current, 'category_id', row.id)
    }
  }
};
</script>

<style scoped>
</style>