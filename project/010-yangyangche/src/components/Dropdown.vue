<template>
    <div @mouseleave='show_menu=false' class="dropdown">
        <div @mouseenter='show_menu=true' class="selected">{{selected[displayKey] || cat || '请选择'}}</div>
        <div v-if="show_menu" class="menu">
            <div @click="select(row)" v-for="(row, index) in list" :key="index" class="list">{{row[displayKey]}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    list: null,
    onSelect: null,
    cat: null,
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

          console.log(row);
      if (this.onSelect) {
          
        this.onSelect(row);
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
</style>
