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
                        <div class="title">车辆管理</div>
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
                        <label>标题</label>
                        <input 
                            v-validator="'required|max_length:40'"        
                            error-el="#title-error"
                            type="text" 
                            v-model="current.title">
                            <!-- <div class="error-list">
                                <div id="title-errror"></div>
                            </div> -->
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input 
                            v-validator="'positive|numeric'"
                            error-el='#price-error'
                            type="text"
                            v-model="current.price">
                    </div>
                    <div class="input-control">
                        <label>卖车原因</label>
                        <input 
                            v-validator="'max_length:140'"
                            error-el='#publish_reason-error'
                            type="text"
                            v-model="current.publish_reason">
                    </div>
                    <div class="input-control">
                        <label>当前里程</label>
                        <input 
                            v-validator="'positive|numeric'"
                            error-el='#consumed_distance-error'
                            type="number" 
                            v-model="current.consumed_distance">
                    </div>
                    <div class="input-control">
                        <label>过户次数</label>
                        <input 
                            v-validator="'positive|numeric'"
                            error-el='#exchange_times'
                            type="number" 
                            v-model="current.exchange_times">
                    </div>
                    <div class="input-control">
                        <label>第一次上牌时间</label>
                        <input type="date" v-model="current.birth_day">
                    </div>
                    <div class="input-control">
                        <label>预期出售时间</label>
                        <input type="date" v-model="current.deadline">
                    </div>
                    <div class="input-control">
                        <label>车况</label>
                        <input 
                            v-validator="'positive|max:9'"
                            error-el='#condeition-error'
                            type="number" 
                            v-model="current.condition">
                    </div>
                    <div class="input-control">
                        <label>封面地址</label>
                        <div style="margin-bottom: 5px;">
                            <div v-for="(p, i) in current.preview" :key="i" class="input-group-3">
                                <input type="text" placeholder="部位，如：车头、车尾等" v-model="p.name">
                                <input type="url" placeholder="图片地址" v-model="p.url">
                                <button @click="current.preview.splice(i, 1)" type="button">-</button>
                            </div>
                        </div>
                        <button @click="current.preview.push({})" type="button">+   </button>
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <textarea v-model="current.description"></textarea>
                    </div>
                    <div class="input-control">
                        <label>发布人</label>
                            <Dropdown 
                                :api="{model: 'user', property: ['username', 'real_name']}"
                                :default='current.user_id' 
                                :list='user_list' 
                                displayKey='username' 
                                :onSelect='set_publisher_id'/>
                    </div>
                    <div class="input-control">
                        <label>品牌</label>
                            <Dropdown :default='current.brand_id' :list='brand_list' :onSelect='set_brand_id'/>
                    </div>
                    <div class="input-control">
                        <label>型号</label>
                            <Dropdown :default='current.model_id' :list='model_list' :onSelect='set_model_id'/>
                    </div>
                    <div class="input-control">
                        <label>车辆类型</label>
                            <Dropdown :default='current.design_id' :list='design_list' :onSelect='set_design_id'/>
                    </div>
                    <div class="input-control">
                        <label>所属位置</label>
                        <Location :onSelect="set_location_id"/>
                    </div>
                    <div class="input-control check">
                        <div>
                            <input type="checkbox" v-model="current.on_sale">
                            <label for="sale" class="dib">促销</label>
                        </div>
                        <div>
                            <input type="checkbox" v-model="current.local">
                            <label for="local" class="dib">本地车牌</label>
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
                        <th>标题</th>
                        <th>价格（万元）</th>
                        <th>里程</th>
                        <th>预期出售时间</th>
                        <th>车况</th>
                        <th>过户次数</th>
                        <th>特价</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="row in list" :key="row.id">
                        <td>{{row.title}}</td>
                        <td>{{row.price}}</td>
                        <td>{{row.consumed_distance || '-'}}</td>
                        <td>{{row.deadline || '-'}}</td>
                        <td>{{row.condition ? row.condition + '成心' : '-'}}</td>
                        <td>{{row.exchange_times || '-'}}</td>
                        <td>{{row.on_sale || '-'}}</td>
                        <td>
                            <button class="btn-primary" @click="set_current(row)">编辑</button>
                            <button class="btn" @click="remove(row.id)">删除</button>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination v-if="!edit_pattern" :limit='limit' :totalCount='total' :onPageChange='this.on_page_change'/>
            </div>
        </div>
    </div>
</template>

<script>
import "../../css/admin.css";

import api from "../../lib/api.js";
import AdminPage from "../../mixin/AdminPage";
import Dropdown from "../../components/Dropdown";
import Location from "../../components/Location";

export default {
  components: { Dropdown, Location },
  data() {
    return {
      model: "vehicle",
      searchable: ["title", "description"],
      current: {
          preview: [],
      },
      user_list: [],
      brand_list: [],
      model_list: [],
      design_list: []
    };
  },

  methods: {
    read_user() {
      api("user/read").then(r => {
        this.user_list = r.data.data;
      });
    },
    read_brand() {
      api("brand/read").then(r => {
        this.brand_list = r.data.data;
      });
    },
    read_model() {
      api("model/read").then(r => {
        this.model_list = r.data.data;
      });
    },
    read_design() {
      api("design/read").then(r => {
        this.design_list = r.data.data;
      });
    },
    set_publisher_id(row) {
      this.$set(this.current, "user_id", row.id);
    },
    set_brand_id(row) {
      this.$set(this.current, "brand_id", row.id);
    },
    set_model_id(row) {
      this.$set(this.current, "model_id", row.id);
    },
    set_design_id(row) {
      this.$set(this.current, "design_id", row.id);
    },
    set_location_id(row) {
      this.$set(this.current, "location_id", row.id);
    },
    after_set_current() {
        this.current.preview = this.current.preview || [];
    }
  },

  mounted() {
    this.read_user();
    this.read_brand();
    this.read_model();
    this.read_design();
  },

  mixins: [AdminPage]
};
</script>

<style scoped>
.check * {
  vertical-align: middle;
}

.check input {
  display: inline-block;
  width: 30px;
}
</style>