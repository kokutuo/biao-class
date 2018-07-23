<template>
  <div class="report-panel">
    <div class="title">{{title || '检查报告'}}</div>
    <div v-if="empty_report()">
      <div v-for="(ok, key) in report" :key="key"
        v-if="(conf = reportStructure[key]) && conf.cat == cat"
        :class="'col-lg-4 report-item ' + (!ok ? 'muted' : '-')">
        <span v-if="ok" class="fontawesome-ok"></span>
        <span v-else class="fontawesome-minus"></span>{{conf.display_name}}
      </div>
    </div>
    <div v-else class="empty-holder">暂未检测</div>
  </div>
</template>

<script>
export default {
  props: ["title", "reportStructure", "report", "cat"],

  methods: {
    empty_report() {
      if (!this.report) {
        return false;
      }

      return Object.keys(this.report).length;
    }
  }
};
</script>

<style scoped>
.report-panel {
  padding: 0;
  border: 1px solid mediumseagreen;
}

.report-item {
  padding: 10px;
  color: mediumseagreen;
}

.report-item.muted {
  color: #aaa;
}

.report-panel .title {
  padding: 10px;
  background: mediumseagreen;
  text-align: center;
  color: #fff;
}
</style>
