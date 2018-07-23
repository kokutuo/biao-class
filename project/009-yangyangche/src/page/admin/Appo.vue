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
                        <div class="title">预约管理</div>
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
                <form v-if="edit_pattern" @submit.prevent="cou()">
                  <div class="input-control">
                    <label>预约人</label>
                    <Dropdown 
                      :api="{model: 'user', property: ['username', 'real_name']}"
                      placeholder="请选择用户"
                      displayKey="username"
                      :onSelect="set_user_id"/>
                  </div>
                  <div class="input-control">
                    <label for="">二手车</label>
                    <Dropdown
                      :api="{model: 'vehicle', property: ['title', 'description']}"
                      displayKey="title"
                      :onSelect="set_vehicle_id"/>
                  </div>
                  <div class="input-control">
                    <label for="">预约时间</label>
                    <input type="date" v-model="current.appointed_at">
                  </div>
                  <div class="input-control">
                    <label for="">备注</label>
                    <textarea v-model="current.remark"></textarea>
                  </div>
                  <div class="input-control">
                    <div class="btn-group">
                      <button class="btn-primary" type="submit">提交</button>
                      <button @click="cancle" type="button">取消</button>
                    </div>
                  </div>
                </form>
                <div v-else class="table">
                    <table>
                        <thead>
                          <th>预约人</th>
                          <th>二手车</th>
                          <th>预约时间</th>
                          <th>备注</th>
                          <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                          <td>{{row.$user ? row.$user.username : '-'}}</td>
                          <td>{{row.$vehicle ? row.$vehicle.title : '-'}}</td>
                          <td>{{row.appointed_at}}</td>
                          <td>{{row.remark}}</td>
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
import AdminPage from "../../mixin/AdminPage.vue";

export default {
  mixins: [AdminPage],

  data() {
    return {
      model: "appo",
      searchable: ["remark"],
      with: [
        { model: "user", type: "has_one" },
        { model: "vehicle", type: "has_one" }
      ]
    };
  },

  methods: {
    set_user_id(row) {
      this.$set(this.current, "user_id", row.id);
    },

    set_vehicle_id(row) {
      this.$set(this.current, "vehicle_id", row.id);
    }
  }
};
</script>

<style scoped>
</style>
