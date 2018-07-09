<template>
    <div @mouseleave='show_menu=false' class="dropdown">
        <input v-if="api" @keyup="show_menu=true" v-model="keyword" type="search">
        <div v-if="list.length"  @click='show_menu=true' class="selected">{{selected[displayKey] || '请选择'}}</div>
        <div v-if="show_menu && list.length" class="menu">
            <div @click="select(row)" v-for="row in result" :key="row[displayKey]" class="list">{{row[displayKey]}}</div>
        </div>
    </div>
</template>

<script>
import api from "../lib/api";

export default {
  props: {
    api: {},
    list: {
      default() {
        return [];
      }
    },
    default: {},
    onSelect: {},
    primaryKey: {
      default: "id"
    },
    displayKey: {
      default: "name"
    }
  },
  data: function() {
    return {
      api_conf: {},
      result: [],
      keyword: "",
      selected: {},
      show_menu: false,
      timer: null
    };
  },
  methods: {
    select(row) {
      this.selected = row;
      this.show_menu = false;
      this.keyword = row[this.displayKey];

      if (this.onSelect) {
        this.onSelect(row);
      }
    },

    set_default() {
      let key = this.default;

      if (key) {
        let def = this.list.find(row => {
          return row[this.primaryKey] == key;
        });
        this.select(def);
      }
    },

    parse_api() {
        let api_prop = this.api;
        if (typeof api_prop != 'string') {
            return Object.assign({}, api_prop);
        }

        api_prop =api_prop.split('.');
        let model = api_prop[0];
        let property = api_prop[1];

        property = property.split(',');

        return {
            model,
            property
        };
    },
  },

  mounted() {
    this.set_default();
    let list = this.list;
    this.api_conf = this.parse_api();
    list && (this.result = this.list);
  },

  watch: {
    default: {
      deep: true,
      handler() {
        this.set_default();
      }
    },

    keyword() {
      let condition = {};

      if (!this.api) {
        return;
      }

      this.api_conf.property.forEach(prop => {
        condition[prop] = this.keyword;
      });

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        api(`${this.api_conf.model}/search`, { or: condition }).then(r => {
          this.result = r.data.data;
        });
      }, 300);
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 3px 15px;
  margin-right: 10px;
}

.selected,
.menu > * {
  cursor: pointer;
  display: block;
  padding: 2px 5px;
}

.menu {
  background: #fff;
  z-index: 1;
  width: 80px;
  position: absolute;
  right: -3px;
}

.list:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
