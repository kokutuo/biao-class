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
                        <input type="text" v-model="current.title">
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input type="number" v-model="current.price">
                    </div>
                    <div class="input-control">
                        <label>卖车原因</label>
                        <input type="text" v-model="current.publish_reason">
                    </div>
                    <div class="input-control">
                        <label>当前里程</label>
                        <input type="number" v-model="current.consumed_distance">
                    </div>
                    <div class="input-control">
                        <label>过户次数</label>
                        <input type="number" v-model="current.exchange_times">
                    </div>
                    <div class="input-control">
                        <label>第一次上牌时间</label>
                        <input type="datetime-local" v-model="current.birthday">
                    </div>
                    <div class="input-control">
                        <label>预期出售时间</label>
                        <input type="datetime-local" v-model="current.deadline">
                    </div>
                    <div class="input-control">
                        <label>车况</label>
                        <input type="number" v-model="current.condition">
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <textarea v-model="current.description"></textarea>
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
                        <th>价格</th>
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
            searchable: ['title', 'description']
        }
    },
  created() {
    this.model = "vehicle";
  },

  mixins: [AdminPage],
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


