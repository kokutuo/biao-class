<template>
    <div @mouseleave='show_menu=false' class="dropdown">
        <div @click='show_menu=true' class="selected">{{selected[displayKey] || '请选择'}}</div>
        <div v-if="show_menu" class="menu">
            <div @click="select(row)" v-for="(row, index) in list" :key="index" class="list">{{row[displayKey]}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    list: {},
    default: {},
    onSelect: {},
    primaryKey: {
        default: 'id',
    },
    displayKey: {
      default: "name"
    }
  },
  data: function() {
    return {
      selected: {},
      show_menu: false
    };
  },
  methods: {
    select: function(row) {
      this.selected = row;
      this.show_menu = false;

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
    }
  },
  mounted() {
      this.set_default();
  },
  watch: {
      default: {
          deep: true,
          handle() {
              this.set_default();
          }
      }
  },
};
</script>

<style scoped>
.dropdown {
    position: relative;
  display: inline-block;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 3px 15px;
    margin-right: 10px
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
    background: rgba(0, 0, 0, .1);
}
</style>
