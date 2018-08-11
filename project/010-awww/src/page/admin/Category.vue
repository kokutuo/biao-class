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
              <div class="title">宠物种类管理</div>
            </div>
            <div class="col-lg-4 right">
              <button @click="edit_pattern=true" class="btn-primary round">添加</button>
            </div>
          </div>

          <div v-if="!edit_pattern" class="tool-bar">
            <form @submit.prevent="search" class="search">
              <label for='search'>快速查找</label>
              <input v-model="keyword" type="search" id="search">
              <button class="btn-primary" type="submit">搜</button>
            </form>
          </div>

          <form v-if="edit_pattern" @submit.prevent="cou">
            <div class="input-control">
              <label>分类名</label>
              <input v-model="current.name" name="name" type="text" class="round">
            </div>
            <div class="input-control">
              <label>封面</label>
              <input v-model="current.cover_url" name="name" type="url" class="round">
            </div>
            <div class="input-control">
              <label class="dib">首页推广</label>
              <input v-model="current.promoting" name="name" type="checkbox">
            </div>
            <div class="input-control">
              <button type="submit" class="btn-primary left-round">提交</button>
              <button @click="cancel" type="button" class="right-round">取消</button>
            </div>
          </form>

          <div v-else class="table">
            <table>
              <thead>
                <th>分类名</th>
                <th>首页推广</th>
                <th>操作</th>
              </thead>
              <tbody>
                <tr v-for="row in list" :key="row.id">
                  <td>{{row.name}}</td>
                  <td>{{row.promoting ? '是' : '否'}}</td>
                  <td>
                    <button @click="set_current(row)" class="btn-primary left-round">编辑</button>
                    <button @click="remove(row.id)" class="right-round">删除</button>
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
import AdminPage from "../../mixins/AdminPage";

export default {
  mixins: [AdminPage],

  data() {
    return {
      model: "category",
      searchable: ["name"]
    };
  }
};
</script>

<style scoped>
</style>