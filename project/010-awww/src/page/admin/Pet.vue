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
              <div class="title">宠物管理</div>
            </div>
            <div class="col-lg-4 right">
              <button @click="edit_pattern=true" class="btn-primary">添加</button>
            </div>
          </div>

          <div v-if="!edit_pattern" class="tool-bar">
            <form @submit.prevent="search" class="search">
              <label for="search">快速查找</label>
              <input id="search" type="search" v-model="keyword" autocomplete="off">
              <button class="btn-primary">搜</button>
            </form>
          </div>

          <form v-if="edit_pattern" @submit.prevent="cou">
            <div class="input-control">
              <label>标题</label>
              <input 
                v-model="current.title"
                type="text">
            </div>
            <div class="input-control">
              <label>毛色</label>
              <input 
                v-model="current.color"
                type="text">
            </div>
            <div class="input-control">
              <label>价格(元)</label>
              <input 
                v-model="current.price"
                type="number">
            </div>
            <!-- <div class="input-control">
              <label>产地</label>
              <input 
                v-model="current.origin"
                type="text">
            </div> -->
            <div class="input-control">
              <label>生日</label>
              <input 
                v-model="current.birthday"
                type="date">
            </div>
            <div class="input-control">
              <label>性格</label>
              <input 
                v-model="current.character"
                type="text">
            </div>
            <div class="input-control">
              <label>描述</label>
              <input 
                v-model="current.description"
                type="text">
            </div>
            <div class="input-control">
              <label>大图地址</label>
              <input 
                v-model="current.cover_url"
                type="text">
            </div>
            <div class="input-control">
              <label>小图地址</label>
              <input 
                v-model="current.sale_url"
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
              <label>血统</label>
                <Dropdown 
                  :default='current.breed_id' 
                  :list='breed_list' 
                  :onSelect='set_breed_id'/>
            </div>
            <div class="input-control">
              <label>性别</label>
              <input 
                v-model="current.sex"
                type="checkbox">
            </div>
            <div class="input-control">
              <label>接种疫苗</label>
              <input 
                v-model="current.vaccinated"
                type="checkbox">
            </div>
            <div class="input-control">
              <label>遗传病</label>
              <input 
                v-model="current.disease"
                type="checkbox">
            </div>
            <div class="input-control">
              <label>纯种</label>
              <input 
                v-model="current.pure_breed"
                type="checkbox">
            </div>
            <div class="input-control">
              <label>阉割</label>
              <input 
                v-model="current.neuter"
                type="checkbox">
            </div>
            <div class="input-control">
              <label>首页推广</label>
              <input 
                v-model="current.hot"
                type="checkbox">
            </div>
            <div class="input-control">
              <button type="submit" class="btn-primary">提交</button>
              <button @click="cancel" type="button">取消</button>
            </div>
          </form>

          <div v-else class="table">
            <table>
              <thead>
                <th>标题</th>
                <th>毛色</th>
                <th>价格</th>
                <!-- <th>产地</th> -->
                <th>性格</th>
                <th>性别</th>
                <th>种类</th>
                <th>血统</th>
                <th>纯种</th>
                <th>阉割</th>
                <th>接种疫苗</th>
                <th>遗传病</th>
                <th>操作</th>
              </thead>
              <tbody>
                <tr v-for="row in list" :key="row.id">
                  <td>{{row.title || '-'}}</td>
                  <td>{{row.color || '-'}}</td>
                  <td>{{row.price || '-'}}</td>
                  <!-- <td>{{row.origin || '-'}}</td> -->
                  <td>{{row.character || '-'}}</td>
                  <td>{{row.sex ? '雄' : '雌'}}</td>
                  <td>{{row.$category ? row.$category.name : '-'}}</td>
                  <td>{{row.$breed ? row.$breed.name : '-'}}</td>
                  <td>{{row.pure_breed ? '是' : '否'}}</td>
                  <td>{{row.neuter ? '是' : '否'}}</td>
                  <td>{{row.vaccinated ? '是' : '否'}}</td>
                  <td>{{row.disease ? '有' : '无'}}</td>
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
      breed_list: [],
      category_id: "",
      with: [
        { model: "category", relation: "has_one" },
        { model: "breed", relation: "has_one" }
      ],
      model: "pet",
      searchable: ["title", "color"]
    };
  },

  methods: {
    read_category() {
      api("category/read").then(r => {
        this.category_list = r.data;
      });
    },

    /**
     * 根据category的值来决定获取哪些数据
     */
    read_breed() {
      api("breed/read", {
        limit: 50,
        where: {
          and: { category_id: this.category_id }
        }
      }).then(r => {
        this.breed_list = r.data;
      });
    },

    set_category_id(row) {
      this.$set(this.current, "category_id", row.id);
      this.category_id = row.id;
      this.read_breed();
    },

    set_breed_id(row) {
      this.$set(this.current, "breed_id", row.id);
    }
  }
};
</script>

<style scoped>
</style>