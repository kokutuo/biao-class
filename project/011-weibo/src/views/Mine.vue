<template>
  <div id="mine">
    <Nav/>

    <div class="mine-container">
      <div class="header">
        <div class="cover">
          <div class="avatar">
            <router-link to="/mine">
              <img src="../img/user-avatar.jpg" alt="kokutuo">
            </router-link>
          </div>
        </div>
        <div class="info">
          <div class="name">kokutuo</div>
          <div class="intro">emmmmmmmmmmmmmm....</div>
        </div>
      </div>
      <div class="row body">
        <div class="col-lg-4">
          <div class="user-attention">
            <div class="line">
              <div class="val">6</div>
              <div class="key">关注</div>
            </div>
            <div class="line">
              <div class="val">6</div>
              <div class="key">关注</div>
            </div>
            <div class="line">
              <div class="val">6</div>
              <div class="key">关注</div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card-list">
            <CardWeibo :row="it" :uinfo="uinfo" v-for="it in list" :key="it.id"/>
            <div v-if="!list.length" class="empty-holder round"><i class="fas fa-exclamation-circle fa-lg"></i>暂无内容</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";

import Nav from "../components/Nav";
import CardWeibo from "../components/CardWeibo";

export default {
  components: { Nav, CardWeibo },

  mounted() {
    this.read_weibo();
  },

  data() {
    return {
      list: [],
      uinfo: session.uinfo()
    };
  },

  methods: {
    read_weibo() {
      api("weibo/read", {
        where: [["user_id", "in", [this.uinfo.id]]],
        with: "belongs_to:user"
      }).then(r => {
        this.list = r.data || [];
      });
    }
  },
};
</script>

<style scoped>
.mine-container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  padding-right: 5px;
}

#mine .header {
  text-align: center;
}

#mine .header img {
  border-radius: 50%;
  max-width: 100px;
}
</style>