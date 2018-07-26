<template>
    <div @mouseleave='show_menu=false' class="dropdown">
        <input 
            @keyup="show_menu=true"
            @focus="show_menu=true"
            @click="show_menu=true"
            v-model="keyword"
            :placeholder="placeholder"
            type="search"
            class="search">
        <div v-if="show_menu && result.length" class="menu">
            <div 
                @click="select(row)" 
                v-for="row in result" 
                :key="row.id" 
                class="menu-item">{{row[displayKey]}}
            </div>
        </div>
    </div>
</template>

<script>
import api from "../lib/api";

export default {
  props: {
    api: {}, // {string|object} 如果是异步搜索，就需要传入接口配置，不然组件不知道怎么搜
    list: {
      // {Array} 如果不需要异步搜索，就需要导入静态数据，通常是数组：[{name: whh, id: 1}, ...]
      default() {
        return [];
      }
    },
    default: {}, // {mixed} 默认选中项的主键（通常是id）
    onSelect: {}, // {Function} 当选中某一项如何通知父组件
    primaryKey: {
      // {string} 用于定位每一项的主键是什么
      default: "id"
    },
    displayKey: {
      // {string} 每一项在菜单中显示哪一个属性，默认为name
      default: "name"
    },
    placeholder: {
      default: "请选择"
    }
  },

  data: function() {
    return {
      api_conf: {}, // 解析后的props.api
      result: [], // 搜索结果或静态数据
      keyword: "", // 搜索关键词
      selected: {}, // 当前选中的那一行数据
      show_menu: false, // 是否显示菜单
      timer: null // 存储搜索debounce定时器
    };
  },

  mounted() {
    this.set_default(); // 如果传了props.default, 就应该默认选中那一项
    this.api_conf = this.parse_api(); // 如果props.api是字符串，就应该将其解析为更好处理的对象类型
    let list = this.list;
    list && (this.result = Object.assign([], this.list)); // 如果传了静态数据，就应该将静态数据拷贝一份，否则就会越搜越少
  },

  methods: {
    /**
     * 设置默认选中项
     */
    set_default() {
      let key = this.default;

      if (!key) {
        this.reset();
        return;
      }

      let def = this.list.find(row => {
        return row[this.primaryKey] == key;
      });
      this.select(def);
    },

    /**
     * 选中某项
     * @param {object} row
     */
    select(row) {
      this.selected = row;
      this.show_menu = false;
      this.keyword = row[this.displayKey];

      if (this.onSelect) {
        this.onSelect(row);
      }
    },

    /**
     * 搜索（异步）
     * 通过api获取动态数据
     */
    search() {
      let condition = {};
      let property = this.api_conf.property;

      if (!property) {
        return;
      }

      this.api_conf.property.forEach(prop => {
        condition[prop] = this.keyword;
      });

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        api(`${this.api_conf.model}/search`, { or: condition }).then(r => {
          this.result = r.data;
        });
      }, 300);
    },

    /**
     * 过滤静态数据（同步）
     * 相当于静态数据的search
     */
    filter() {
      this.result = Object.assign([], this.list);
      this.result = this.result.filter(row => {
        return row[this.displayKey].indexOf(this.keyword) != -1;
      });
    },

    /**
     * 重置组件
     */
    reset() {
      this.keyword = "";
      this.selected = {};
    },

    /**
     * 解析props.api为更好处理的数据类型
     * @returns {object}
     */
    parse_api() {
      let api_prop = this.api;
      if (typeof api_prop != "string") {
        return Object.assign({}, api_prop);
      }

      api_prop = api_prop.split(".");
      let model = api_prop[0];
      let property = api_prop[1];

      property = property.split(",");

      return {
        model,
        property
      };
    }
  },

  watch: {
    /**
     * 设置默认选中项
     */
    default() {
      this.set_default();
    },

    /**
     * 当关键词改变时，如果是动态数据就搜索，否则就过滤已有的静态数据
     */
    keyword() {
      if (this.api) {
        this.search();
      } else {
        this.filter();
      }
    },

    list: {
      deep: true,
      handler(n) {
        this.result = n;
      }
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  background: #fff;
}

.search {
  width: 100px;
}

.selected,
.menu > * {
  display: block;
  padding: 5px 10px;
}

.selected,
.menu {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.menu {
  background: #fff;
  z-index: 1;
  width: 100%;
  position: absolute;
  left: 0;
}

.selected,
.menu-item {
  cursor: pointer;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
