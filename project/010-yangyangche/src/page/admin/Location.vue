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
                        <div class="title">用户管理</div>
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
                        <label>用户名</label>
                        <input type="text" v-model="current.username">
                    </div>
                    <div class="input-control">
                        <label>真实姓名</label>
                        <input type="text" v-model="current.real_name">
                    </div>
                    <div class="input-control">
                        <label>邮箱</label>
                        <input type="e-mail" v-model="current.e_mail">
                    </div>
                    <div class="input-control">
                        <label>密码</label>
                        <input type="text" v-model="current.password">
                    </div>
                    <div class="input-control">
                        <button class="btn-primary" type="submit">提交</button>
                        <button @click="cancle" type="button">取消</button>
                    </div>
                </form>
                <div v-else class="table">
                    <table>
                        <thead>
                        <th>地名</th>
                        <th>行政级别</th>
                        <th>上级id</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                        <td>{{row.name || '-'}}</td>
                        <td>{{row.type || '-'}}</td>
                        <td>{{row.parent_id || '-'}}</td>
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

import AdminPage from "../../mixin/AdminPage";

export default {
  data() {
    return {
      model: "location",
      searchable: ["name", "type", "parent_id"]
    };
  },

  mixins: [AdminPage]
};
</script>

<style scoped></style>