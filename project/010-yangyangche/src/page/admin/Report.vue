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
                    <small>共有{{total_check}}个检测项</small>
                </div>
                <form v-if="edit_pattern" @submit.prevent="cou()">
                  <div class="input-control">
                    <Dropdown 
                      :api="{model: 'vehicle', property: ['title']}"
                      placeholder="请选择车辆"
                      displayKey="title"
                      :onSelect="set_vehicle_id"/>
                  </div>
                  <fieldset :disabled="!current.vehicle_id">
                    <div class="input-control">
                      <div class="btn-group">
                        <button type="button" @click="check_all()">全部通过</button>
                        <button type="button" @click="check_random()">随机通过</button>
                        <button type="button" @click="clear_all()">全部清空</button>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div v-if="prop.display_name" v-for="(prop, key) in structure" :key="prop.id" class="input-control col-lg-4">
                          <label class="simple-checker" for="report-item">{{prop.display_name}}</label>
                            <input type="checkbox"  id="report-item" v-model="current[key]">
                        </div>
                      </div>
                    </div>
                  </fieldset>
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
                          <th>类目</th>
                          <th>通过数</th>
                          <th>通过率</th>
                          <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                          <td>
                            <router-link target='_blank' v-if="row.$vehicle" :to="'/detail/' + row.$vehicle.id">
                              {{row.$vehicle.title}}
                            </router-link>
                            <span v-else>-</span>
                          </td>
                          <td>{{passed_count = compute_passed_check(row)}}</td>
                          <td>{{passed_count / total_check | percentage}}</td>
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

  mixins: [AdminPage],

  data() {
    return {
      structure: {},
      total_check: 0,
      vehicle_list: [],
      model: "report",
      searchable: ["title"],
      with: [
        {
          model: "vehicle",
          type: "has_one"
        }
      ]
    };
  },

  mounted() {
    this.read();
    this.get_structure();
  },

  methods: {
    set_vehicle_id(row) {
      this.$set(this.current, "vehicle_id", row.id);
    },

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

    check_all(checked = true) {
      this.each_prop((prop, key) => {
        if (!prop.display_name) {
          return;
        }

        this.$set(this.current, key, checked);
      });
    },

    check_random() {
      this.each_prop((prop, key) => {
        if (!prop.display_name) {
          return;
        }
        let checked = !!Math.round(Math.random());

        this.$set(this.current, key, checked);
      });
    },

    clear_all() {
      this.check_all(false);
    },

    get_structure() {
      api("MODEL/FIND", { name: "report" }).then(r => {
        this.structure = r.data.data.structure;
        this.compute_total_check();
      });
    },

    compute_total_check() {
      let count = 0;
      this.each_prop(prop => {
        prop.display_name && count++;
      });

      this.total_check = count;
    },

    compute_passed_check(row) {
      let count = 0;
      row = row || this.current;
      this.each_prop((prop, key) => {
        prop.display_name && row[key] && count++;
      });

      return count;
    }
  },

  watch: {
    current: {
      deep: true,
      handler() {
        this.compute_passed_check();
      }
    }
  }
};
</script>

<style scoped></style>