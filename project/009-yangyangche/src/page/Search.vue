<template>
    <div>
        <Nav :push-down='true' />
        <div class="container">
            <SearchBar :keyword="search_param.keyword" width='80%'/>
        </div>
        <div class="container">
            <div class="filter-list">
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">品牌</div>
                    <div class="col-lg-10 range">
                        <span :class="{active: !search_param.brand_id}" @click="remove_query('brand_id')">不限</span>
                        <span 
                          :class="{active: search_param.brand_id == row.id}"
                          @click="set_query_where('brand_id', row.id)"
                          v-for="row in list.brand" 
                          :key="row.id">{{row.name}}
                        </span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">车类</div>
                    <div class="col-lg-10 range">
                        <span :class="{active: !search_param.design_id}" @click="remove_query('design_id')">不限</span>
                        <span
                          :class="{active: search_param.design_id == row.id}" 
                          @click="set_query_where('design_id', row.id)"
                          v-for="row in list.design" :key="row.id"
                          >{{row.name}}
                        </span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">价格</div>
                    <div class="col-lg-10 range">
                        <span :class="{active: !search_param.price_min && !search_param.price_max}" @click="set_query_price_range()">不限</span>
                        <span :class="{active: search_param.price_min == 0 && search_param.price_max == 3}" @click="set_query_price_range(0, 3)">3万以下</span>
                        <span :class="{active: search_param.price_min == 3 && search_param.price_max == 5}" @click="set_query_price_range(3, 5)">3-5万</span>
                        <span :class="{active: search_param.price_min == 5 && search_param.price_max == 8}" @click="set_query_price_range(5, 8)">5-8万</span>
                        <span :class="{active: search_param.price_min == 8 && search_param.price_max == 10}" @click="set_query_price_range(8, 10)">8-10万</span>
                        <span :class="{active: search_param.price_min == 10 && search_param.price_max == 15}" @click="set_query_price_range(10, 15)">10-15万</span>
                        <span :class="{active: search_param.price_min == 15 && search_param.price_max == 20}" @click="set_query_price_range(15, 20)">15-20万</span>
                        <span :class="{active: search_param.price_min == 20 && search_param.price_max == 30}" @click="set_query_price_range(20, 30)">20-30万</span>
                        <span :class="{active: search_param.price_min == 30 && search_param.price_max == 0}" @click="set_query_price_range(30, 0)">30万以上</span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <!-- <div class="kill-space filter">
                    <div class="col-lg-1 prop">更多</div>
                    <div class="col-lg-10 range">
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                    </div>
                    <div class="col-lg-1 right others">
                      <span>全部</span>
                    </div>
                </div> -->
            </div>
            <div class="filter-list">
              <div class="filter">
                <div class="range">
                  <span>默认排序</span>
                  <span @click="toggle_sort_by('id')" class="anchor">时间
                      <i :class="{'fontawesome-chevron-up': is_sort('id', 'up'), 'fontawesome-chevron-down': is_sort('id', 'down')}"></i>
                  </span>
                  <span @click="toggle_sort_by('price')" class="anchor">价格
                      <i :class="{'fontawesome-chevron-up': is_sort('price', 'up'), 'fontawesome-chevron-down': is_sort('price', 'down')}"></i>
                  </span>
                  <span @click="toggle_sort_by('birth_day')" class="anchor">车龄
                      <i :class="{'fontawesome-chevron-up': is_sort('birth_day', 'up'), 'fontawesome-chevron-down': is_sort('birth_day', 'down')}"></i>
                  </span>
                  <span @click="toggle_sort_by('consumed_distance')" class="anchor">里程
                      <i :class="{'fontawesome-chevron-up': is_sort('consumed_distance', 'up'), 'fontawesome-chevron-down': is_sort('consumed_distance', 'down')}"></i>
                  </span>
                </div>
              </div>
          </div>
        </div>  
        <div class="container">
            <div v-if="result.length" class="row vehicle-list">
                <div v-for="row in result" :key="row.id" class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img :src="get_main_cover_url(row)">
                    </div>
                    <div class="detail">
                        <div class="title">{{row.title}}</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">{{row.price}}万</span>
                        <span>首付3.5万</span>
                        <router-link :to="'/detail/' + row.id" class="btn btn-primary buy">购买</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>  
            <div v-else class="empty-holder">暂无内容</div>
            <pagination 
              :totalCount="total" 
              :limit="limit" 
              :onPageChange="on_page_change" 
              :currentPage="search_param.page"/>
        </div>
    </div>
</template>

<script>
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";

import Reader from "../mixin/Reader.vue";
import VehicleList from "../mixin/VehicleList.vue";

import api from "../lib/api.js";
import helper, { clone } from "../lib/helper.js";

import "../css/vehicle-list.css";

export default {
  components: {
    Nav,
    SearchBar,
    Dropdown,
    Pagination
  },

  mixins: [VehicleList, Reader],

  mounted() {
    // this.prepare_search_param();
    this.search();
    this.read("brand");
    this.read("design");
  },

  data: function() {
    return {
      result: [],
      total: 0,
      limit: 4,
      list: {},
      search_param: {}
    };
  },

  methods: {
    on_page_change(page) {
      this.set_condition("page", page);
    },

    parse_route_query() {
      let query = clone(this.$route.query);
      if (!query.sort_by) {
        query.sort_by = ["id", "down"];
      }
      if (typeof query.sort_by == "string") {
        query.sort_by = query.sort_by.split(",");
      }

      return query;
    },

    prepare_search_param() {
      let query = this.parse_route_query();
      this.search_param = query;
      console.log('this.search_param:',this.search_param);
      
    },

    is_sort(property, direction) {
      let p = this.search_param;

      if (!p.sort_by) {
        return false;
      }

      return p.sort_by[0] == property && p.sort_by[1] == direction;
    },

    toggle_sort_by(property) {
      let query = this.parse_route_query();

      let sort_prop = query.sort_by[0]; // price
      let direction = query.sort_by[1];

      //  是不是上次的排序，如果是，就倒置排序
      if (sort_prop == property) {
        query.sort_by[1] = direction == "up" ? "down" : "up";
      } else {
        //  否则使用指定的顺序排序，默认使用降序排序
        query.sort_by[0] = property;
        query.sort_by[1] = "down";
      }

      query.sort_by = query.sort_by.toString();

      this.$router.replace({ query });
    },

    set_query_price_range(min, max) {
      let query = Object.assign({}, this.$route.query);

      if (!min && !max) {
        delete query.price_min;
        delete query.price_max;
      } else {
        let condition = {
          price_min: min,
          price_max: max
        };
        query = Object.assign({}, query, condition);
      }

      this.$router.replace({ query });
    },

    set_condition(type, value) {
      let query = clone(this.$route.query);

      switch (type) {
        case "sort_by":
          query.sort_by = value;
          break;
        case "page":
          query.page = value;
          break;
      }
      this.$router.replace({ query });
      this.search();
    },

    remove_query(type) {
      let query = this.parse_route_query();
      delete query[type];
      this.$router.replace({ query });
    },

    set_query_where(type, value) {
      let condition = {};
      condition[type] = value;

      let o = this.search_param;
      let n = Object.assign({}, o, condition);
      this.$router.replace({ query: n });
    },

    on_submit() {
      this.search();
    },

    search() {
      let p = this.search_param;      

      let brand_query = "",
        design_query = "",
        price_min_query = "",
        price_max_query = "";

      p.brand_id && (brand_query = `and "brand_id" = ${p.brand_id}`);
      p.design_id && (design_query = `and "design_id" = ${p.design_id}`);
      p.price_min && (price_min_query = `and "price" >= ${p.price_min}`);
      p.price_max && (price_max_query = `and "price" <= ${p.price_max}`);

      let query = `where("title" contains "${p.keyword ||
        ""}" ${brand_query} ${design_query} ${price_min_query} ${price_max_query})`;

      api("1/vehicle/read", {
        query: query,
        sort_by: p.sort_by,
        limit: this.limit,
        page: p.page
      }).then(r => {
        this.result = r.data.data;
        this.total = r.data.total;
      });
    }
  },

  watch: {
    "$route.query": {
      deep: true,
      handler(n) {
        console.log("n: ", n);
        this.prepare_search_param();
        this.search();
      }
    }
  }
};
</script>

<style>
.filter-list {
  margin-top: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.filter {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.filter:last-child {
  border-bottom: 0;
}

.filter > * {
  vertical-align: middle;
}

.filter .prop,
.filter .others {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
}

.filter .prop {
  max-width: 66px;
  /* font-size: 14px; */
  font-weight: lighter;
  text-align: center;
  background: #eee;
}

.filter .range span {
  cursor: pointer;
  padding: 5px 10px;
}

.filter .range span:hover {
  color: #fd521d;
}

.filter .range span.active {
  background: #fd521d;
  opacity: 0.8;
  color: #fff;
}
</style>
