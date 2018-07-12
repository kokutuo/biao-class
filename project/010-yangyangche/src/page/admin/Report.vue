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
                        <div class="title">质检管理</div>
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
                  <div>
                    <button type="button" @click="check_all()">全部通过</button>
                  </div>
                  <div>
                    <div>
                      <div v-if="prop.display_name" v-for="(prop, key) in structure" :key="prop.id" class="input-control col-lg-4">
                        <label for="report-item">{{prop.display_name}}</label>
                          <input type="checkbox"  id="report-item" v-model="current[key]">
                      </div>
                    </div>
                  </div>
                    <div class="input-control">
                        <button class="btn-primary" type="submit">提交</button>
                        <button @click="cancle" type="button">取消</button>
                    </div>
                </form>
                <div v-else class="table">
                    <table>
                        <thead>
                        <th>类目</th>
                        <th>品牌</th>
                        <th>设计</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                        <td>{{row.name}}</td>
                        <td>{{row.real_name}}</td>
                        <td>{{row.e_mail || '-'}}</td>
                        <td>{{row.password}}</td>
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
import Dropdown from "../../components/Dropdown";

import api from "../../lib/api.js";

export default {
  components: { Dropdown },

  data() {
    return {
      structure: {},
      model: "report",
      searchable: ["name"],
      with: []
    };
  },

  mounted() {
    this.read();
    this.get_structure();
  },

  methods: {
    each_prop(fn) {
      for (const key in this.structure) {
        if (this.structure.hasOwnProperty(key)) {
          const prop = this.structure[key];

          if (fn) {
            fn(prop, key);
          }
        }
      }
    },

    check_all() {
      this.each_prop((prop, key) => {
        if (!prop.display_name) {
          return;
        }

        this.$set(this.current, key, true);
      });
    },

    get_structure() {
      api("MODEL/FIND", { name: "report" }).then(r => {
        this.structure = r.data.data.structure;
      });
    }
  },

  mixins: [AdminPage]
};
</script>

<style scoped></style>