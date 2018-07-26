<template>
  <div>
    <Nav/>

    <div class="container row">
      <div class="col-lg-3">
        <AdminNav/>
      </div>

      <div class="col-lg-9 content">
        <div class="heard row">
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
            <input id="search" type="search" v-model="keyword">
            <button class="btn-primary">搜</button>
          </form>
        </div>

        <form v-if="edit_pattern" @submit.prevent="cou">
          <div class="input-control">
            <label>名称</label>
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
            <label>价格</label>
            <input 
              v-model="current.price"
              type="number">
          </div>
          <div class="input-control">
            <label>产地</label>
            <input 
              v-model="current.origin"
              type="text">
          </div>
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
            <label>图片</label>
            <input 
              v-model="current.cover_url"
              type="text">
          </div>
          <div class="input-control">
            <label>性别</label>
            <input 
              v-model="current.sex"
              type="text">
          </div>
          <div class="input-control">
            <label>种类</label>
            <input 
              v-model="current.category_id"
              type="text">
          </div>
          <div class="input-control">
            <label>血统</label>
            <input 
              v-model="current.breed_id"
              type="text">
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
            <button type="submit" class="btn-primary">提交</button>
            <button @click="cancle" type="button">取消</button>
          </div>
        </form>

        <div v-else class="table">
          <table>
            <thead>
              <th>标题</th>
              <th>毛色</th>
              <th>价格</th>
              <th>产地</th>
              <th>生日</th>
              <th>性格</th>
              <th>性别</th>
              <th>种类</th>
              <th>血统</th>
              <th>纯种</th>
              <th>阉割</th>
              <th>接种疫苗</th>
              <th>遗传病</th>
              <th>封面</th>
              <th>描述</th>
              <th>操作</th>
            </thead>
            <tbody>
              <tr v-for="row in list" :key="row.id">
                <td>{{row.title}}</td>
                <td>{{row.color}}</td>
                <td>{{row.price}}</td>
                <td>{{row.origin}}</td>
                <td>{{row.birthday}}</td>
                <td>{{row.character}}</td>
                <td>{{row.sex}}</td>
                <td>{{row.category_id}}</td>
                <td>{{row.breed_id}}</td>
                <td>{{row.pure_breed}}</td>
                <td>{{row.neuter}}</td>
                <td>{{row.vaccinated}}</td>
                <td>{{row.disease}}</td>
                <td>{{row.cover_url}}</td>
                <td>{{row.description}}</td>
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
    
    <Footer/>
  </div>
</template>

<script>
import AdminPage from "../../mixins/AdminPage";

export default {
  mixins: [AdminPage],

  data() {
    return {
      model: "pet",
      searchable: ["title", "color"]
    };
  }
};
</script>

<style scoped>
</style>