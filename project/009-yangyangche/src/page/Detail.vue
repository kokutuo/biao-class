<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <h1 class="col-lg-6 left">
            {{detail.title}}
            <span class="tag">超值</span>
            <span class="tag">0过户</span>
        </h1>
        <div class="col-lg-6 right">
            <SearchBar width="100%"/>
        </div>
      </div>
    </div>
    <div class="row vehicle-intro">
        <div class="container">
            <div class="col-lg-6">
                <div class="slider">
                    <img :src="detail.preview ? detail.preview[selected_preview].url : 'https://i.loli.net/2018/07/06/5b3f160071a17.jpg'" alt="一辆车">
                </div>
                <div class="thumb-list">
                    <div @mouseover="selected_preview = i" v-for="(pre, i) in detail.preview" :key="i" class="col-lg-3">
                        <img :src="pre.url" alt="pre.name">
                    </div>
                </div>
            </div>
            <div class="col-lg-6 order-panel">
                <div class="title">
                    {{detail.title}}
                </div>
                <div class="well">
                    <div class="row">
                    <div class="col-lg-3 prop">报价:</div>
                    <div class="col-lg-9">
                        <span class="price currency">{{detail.price}}万</span>
                        <span class="price currency">含税{{detail.price}}万</span>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-3 prop">服务费:</div>
                    <div class="col-lg-9">
                        <span class="price currency">3000</span>
                        <span class="help"></span>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-3 prop">服务项:</div>
                    <div class="col-lg-9">
                        <span class="server">整车质保</span>
                        <span class="server">14天可退</span>
                        <span class="server">249项车况检测</span>
                    </div>
                    </div>
                </div>
                <div class="short-props">
                    <div class="dib">
                        <div class="value">{{detail.birth_day | only_day}}</div>
                        <div class="prop">上牌时间</div>
                    </div>
                    <div class="dib">
                        <div class="value">{{detail.consumed_distance || 0}}万公里</div>
                        <div class="prop">公里数</div>
                    </div>
                    <div class="dib">
                        <div class="value">国五</div>
                        <div class="prop">外迁查询</div>
                    </div>
                    <div class="dib">
                        <div class="value">1.5L</div>
                        <div class="prop">排量</div>
                    </div>
                    <div class="dib">
                        <div class="value">陕A</div>
                        <div class="prop">上牌城市</div>
                    </div>
                </div>
                <div v-if="!appointed_appo" class="action">
                  <div v-if="!show_appo">
                    <button @click="show_appo=true" class="btn btn-primary">预约看车</button>
                    <span class="tel">400-080-5027</span>
                  </div>
                  <form v-if="show_appo" @submit.prevent="submit_appo">
                    <div class="input-control">
                      <label for="appointed_at">预约时间</label>
                      <input 
                        id="appointed_at"
                        v-model="appo.appointed_at"
                        v-validator="'required'"
                        type="date">
                    </div>
                    <div class="input-control btn-group">
                      <button type="submit" class="btn-primary">预约</button>
                      <button @click="show_appo=false" type="button">取消</button>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <button class="btn btn-primary" disabled>已预约</button>
                  <p>预约时间：{{appointed_appo.appointed_at}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row vehicle-detail">
        <div class="container">
            <h2>车辆详情</h2>
            <div class="row">
              <div class="col-lg-6">
                <ReportPanel 
                  title="排除重大事故检测"
                  cat="major_accident"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-6">
                <ReportPanel 
                  title="泡水火烧检测"
                  cat="soaking_and_roasting"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <ReportPanel 
                  title="轻微碰撞检测"
                  cat="minor_crash"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <ReportPanel 
                  title="易损耗部件检测"
                  cat="consumable"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2">
                <ReportPanel 
                  title="安全系统检测"
                  cat="security_system"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-2">
                <ReportPanel 
                  title="外部配置检测"
                  cat="surface_peripheral"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-2">
                <ReportPanel 
                  title="内部配置检测"
                  cat="inner_peripheral"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-2">
                <ReportPanel 
                  title="灯光系统检测"
                  cat="lighting_system"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-2">
                <ReportPanel 
                  title="高科技配置检测"
                  cat="high_tech"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
              <div class="col-lg-2">
                <ReportPanel 
                  title="随车工具检测"
                  cat="tool"
                  :reportStructure="report_structure"
                  :report="report"/>
              </div>
            </div>
            <div class="row">
                <div class="col-lg-6 dashed">
                    <div class="sub-title">卖家-马先生说车</div>
                    <div class="detail">这辆车是我平时上下班代步用的车，2016年12月上的牌，到现在2.04万多公里正是车的好时候！这台车是我平时的代步车，平时出门或者过年回老家都会用它，使用强度不算很大。外观好看，特别是日间行车灯，油耗目前位置比较满意，开别克就有一种很稳的感觉，一点都不飘，好像是20万左右的车子一样。这台车一直是自己家用，没给外人用过，车况没毛病。我这车没买多长时间，算是准新车，光购置税就能省不少钱。我的车外观漆面良好，内饰也经常收拾，车况没毛病。</div>
                </div>
                <div class="col-lg-6">
                    <div class="sub-title">车辆手续信息</div>
                    <div class="col-lg-6 detail">
                        <table>
                            <tbody>
                                <tr>
                                    <td>年检到期时间</td>
                                    <td>2018-12</td>
                                </tr>
                                <tr>
                                    <td>商业险到期时间</td>
                                    <td>2018-12</td>
                                </tr>
                                <tr>
                                    <td>有无购车发票</td>
                                    <td>否</td>
                                </tr>
                                <tr>
                                    <td>是否4S店保养</td>
                                    <td>否</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-6">
                        <table>
                            <tbody>
                                <tr>
                                    <td>交强险到期时间</td>
                                    <td>2018-12</td>
                                </tr>
                                <tr>
                                    <td>过户次数</td>
                                    <td>0次</td>
                                </tr>
                                <tr>
                                    <td>车辆购置税完税证明</td>
                                    <td>无</td>
                                </tr>
                                <tr>
                                    <td>有无改装</td>
                                    <td>无</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- <div v-for="pre in detail.preview" :key="pre.id" class="preview">
                <div class="title">车辆外观</div>
                <div class="desc">车况优秀，性能部件正常使用，经检测，外观及车身结构无重大撞击。</div>
                <div class="col-lg-6">
                    <div class="card">
                        <img :src="pre.url" alt="一辆车">
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import ReportPanel from "../components/ReportPanel";
import Footer from "../components/Footer";

import session from "../lib/session.js";
import api from "../lib/api.js";

export default {
  components: {
    Nav,
    SearchBar,
    ReportPanel,
    Footer
  },

  data() {
    return {
      detail: {},
      selected_preview: 0,
      report: {},
      report_structure: {},
      appo: {},
      appointed_appo: {},
      show_appo: false
    };
  },

  mounted() {
    let id = this.get_id();
    this.find(id);
    this.find_report_by_vehicle(id);
    this.get_report_structure();
    this.prepare_appo_row();
    this.has_appointed();
  },

  methods: {
    submit_appo() {
      let row = this.appo;

      api("appo/create", row).then(r => {
        this.has_appointed();
      });
    },

    find(id) {
      api("vehicle/find", { id }).then(r => {
        this.detail = r.data.data;
      });
    },

    get_id() {
      return this.$route.params.id;
    },

    find_report_by_vehicle(vid) {
      api("report/first", {
        where: { vehicle_id: vid }
      }).then(r => {
        this.report = r.data.data;
        console.log("report", this.report);
      });
    },

    get_report_structure() {
      api("MODEL/FIND", { name: "report" }).then(r => {
        this.report_structure = r.data.data.structure;
        console.log("report_structure: ", this.report_structure);
      });
    },

    prepare_appo_row() {
      this.appo.vehicle_id = this.get_id();
      this.appo.user_id = session.uinfo().id;
    },

    has_appointed() {
      let row = this.appo;
      let user_query = '';

      if (!row.user_id) {
        user_query = `and "user_id" = ${row.user_id}`
      }

      let query = `where("vehicle_id" = ${row.vehicle_id} ${user_query})`;

      api("appo/read", query).then(r => {
        this.appointed_appo = r.data.data[0];
      });
    }
  }
};
</script>

<style scoped>
body {
  background: #fff;
}

.header {
  padding-top: 20px;
  padding-bottom: 10px;
}

.header h1,
.order-panel .title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 400;
}

.tag {
  vertical-align: middle;
  color: #fff;
  background: #666;
  padding: 3px 5px;
  font-size: 12px;
  margin-left: 8px;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 12px;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 12px;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 12px;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 12px;
}

.vehicle-intro {
  margin-bottom: 30px;
}

.slider {
  margin-bottom: 10px;
}

.thumb-list {
  overflow: auto;
  white-space: nowrap;
  padding: 0 18px;
}

.order-panel {
  padding-left: 55px;
}

.order-panel .title {
  margin-bottom: 15px;
}

.well,
.short-props,
.action {
  padding: 10px 20px;
  padding-bottom: 0;
  margin-bottom: 10px;
}

.well {
  background: #f5f5f5;
}

.well > * {
  padding-bottom: 10px;
}

.well .prop {
  font-size: 15px;
}

.well .price {
  font-size: 18px;
  color: #fd5400;
  padding-right: 15px;
}

.well .server {
  display: block;
  padding-bottom: 3px;
}

.short-props > * {
  padding-left: 5px;
  padding-right: 15px;
  border-right: 1px solid #ccc;
}

.short-props .dib:last-child {
  border-right: 0;
}

.short-props .value {
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 3px;
}

.short-props .prop {
  font-weight: lighter;
  font-size: 10px;
}

.action .btn {
  padding: 8px 30px;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 30px;
}

.action .tel {
  font-size: 20px;
}

.vehicle-detail .container {
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.vehicle-detail h2 {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  padding: 0 30px 15px 30px;
  border-bottom: 1px dashed #ddd;
}

.vehicle-detail .row > * {
  padding: 20px 30px;
  padding-bottom: 50px;
}

.vehicle-detail .sub-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.vehicle-detail .detail {
  padding: 0 15px;
  line-height: 20px;
}

.dashed {
  margin-top: 10px;
  border-right: 1px dashed #ddd;
}
</style>
