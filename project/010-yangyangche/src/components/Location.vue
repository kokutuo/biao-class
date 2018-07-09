<template>
    <div class="location">
        <div class="search">
            <input type="search" v-model="keyword" placeholder="请输入城市名称">
        </div>
        <div class="step-list">
            <div v-if="location.state.length" class="step">
                <div 
                    :class="{active: state.id == current.city, item: 'true'}" 
                    @click="select(state, 'city')"
                    v-for="state in location.state" 
                    :key="state.id">{{state.name}}
                </div>
            </div>
            <div v-if="location.city.length" class="step">
                <div 
                    :class="{active: city.id == current.region, item: 'true'}" 
                    @click="select(city, 'region')"
                    v-for="city in location.city" 
                    :key="city.id">{{city.name}}
                </div>
            </div>
            <div v-if="location.region.length" class="step">
                <div 
                    :class="{active: region.id == current.region, item: 'true'}"
                    @click="select(region)"
                    v-for="region in location.region" :key="region.id">{{region.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../lib/api.js";

const china_id = 1;

export default {
  props: { onSelect: {} },

  data() {
    return {
      keyword: "",
      parent_id: null,
      location: {
        state: [],
        city: [],
        region: []
      },

      current: {
        state: [],
        city: [],
        region: []
      }
    };
  },

  methods: {
    select(row, type) {
      let child_type;
      this.current[type] = row.id;

      switch (type) {
        case "state":
          child_type = "city";
          break;

        case "city":
          child_type = "region";
          break;
      }

      this.read_and_select(row, child_type);
    },

    reset_location() {
      this.location = {
        state: [],
        city: [],
        region: []
      };
    },

    read_and_select(parent, type) {
      this.read(parent.id, type).then(data => {
        if (!data.length || parent.type == "city") {
          this.onSelect(parent);
        }
      });
    },

    read(parent_id, type) {
      this.parent_id = parent_id;
      return api("location/read", {
        where: {
          and: { parent_id }
        }
      }).then(r => {
        let data = r.data.data;
        this.location[type] = data;
        return data;
      });
    },

    search() {
      this.reset_location();
      api("location/search", {
        or: {
          name: this.keyword
        }
      }).then(r => {
        this.sort(r.data.data);
      });
    },

    sort(list) {
      list.forEach(row => {
        let sub = this.location[row.type];
        console.log("row.type: ", row.type);
        sub.push(row);
      });

      console.log("this.location: ", this.location);
    }
  },

  mounted() {
    this.read(china_id, "state");
  },

  watch: {
    keyword() {
      this.search();
    }
  }
};
</script>

<style scoped>
.location {
  max-width: 200px;
}

.step-list {
  border: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 0;
}

.location .step {
  display: inline-block;
  line-height: 1.7;
  width: 33.3333333%;
  max-height: 100px;
  overflow: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.location .step:last-child {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.location .item {
  cursor: pointer;
  padding: 5px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.location .item.active {
  background: #fd521d;
  color: #fff;
}
</style>
