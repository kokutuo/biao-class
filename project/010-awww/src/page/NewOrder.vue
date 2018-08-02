<template>
  
</template>

<script>
import Nav from '../components/Nav';

import api from '../lib/api.js';
import session from '../lib/session.js';

export default {
  component: { Nav },

  mounted() {},

  data() {
    return {
      submitted: false,
      current: {
        pay_by: "alipay"
      },
      pet: {}
    };
  },

  computed: {
    total() {
      if (!this.pet.price) {
        this.pet.price = 0;
      }

      if (!this.pet.count) {
        this.pet.count = 1;
      }

      return this.pet.price * this.pet.count;
    }
  },

  methods: {
    find(id) {
      api("pet/find", {
        id
      }).then(r => {
        this.pet = r.data;
      });
    },

    submit(){
      this.current.user_id = session.his_id();
      this.current.sum = this.total;
      this.current.oid = generate_oid(this.pet.id);
      this.current.product_info = this.pet.id;

      api('order/create',this.current).then(r=>{
        this.current.id = r.data.id;
        this.$router.push('/pay/' + r.data.oid);
      })
    }
  }
};
</script>

<style scoped>
</style>