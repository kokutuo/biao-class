<template>
    <div class="location">
        <div class="step">
            <div 
                :class="{active: state.id == current.city, item: 'true'}" 
                @click="select(state, 'city')"
                v-for="state in location.state" 
                :key="state.id">{{state.name}}
            </div>
        </div>
        <div class="step">
            <div 
                :class="{active: city.id == current.county, item: 'true'}" 
                @click="select(city, 'county')"
                v-for="city in location.city" 
                :key="city.id">{{city.name}}
            </div>
        </div>
        <div class="step">
            <div 
                :class="{active: county.id == current.county, item: 'true'}"
                @click="select(county)"
                v-for="county in location.county" :key="county.id">{{county.name}}</div>
        </div>
    </div>
</template>

<script>
import api from "../lib/api.js";

const china_id = 1;

export default {
  data() {
    return {
      parent_id: null,
      location: {
        state: [],
        city: [],
        county: []
      },

      current: {
        state: [],
        city: [],
        county: []
      }
    };
  },

  methods: {
    select(row, type) {
      this.current[type] = row.id;
      this.read(row.id, type);
    },

    read(parent_id, type) {
      this.parent_id = parent_id;
      api("location/read", {
        where: {
          and: { parent_id }
        }
      }).then(r => {
        this.location[type] = r.data.data;
      });
    }
  },

  mounted() {
    this.read(china_id, "state");
  }
};
</script>

<style scoped>
.location {
  max-width: 200px;
}

.location .step {
  display: inline-block;
  width: 33.3333333%;
  max-height: 100px;
  overflow: auto;
}

.location .item {
  cursor: pointer;
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
