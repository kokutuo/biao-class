<template>
  <div>
    <div class="wrap">
      <Nav/>

      <div class="container slider por">
        <div>
          <div>
            <img :src="current.cover_url" :alt="current.title" class="round">
          </div>
        </div>
        <div class="mask round">
          <div class="info">
            <div class="prop-list">
              <div class="prop">
                <span>品种</span>
                <span>{{current.$breed ? current.$breed.name : '???' }}</span>
              </div>
              <div class="prop">
                <span>毛色</span>
                <span>{{current.color || '???'}}</span>
              </div>
              <div class="prop">
                <span>产地</span>
                <span>{{current.origin || '???'}}</span>
              </div>
              <div class="prop">
                <span>性别</span>
                <span>{{current.sex ? '雄' : '雌'}}</span>
              </div>
              <div class="prop">
                <span>生日</span>
                <span>{{current.birthday || '???'}}</span>
              </div>
              <div class="prop">
                <span>简介</span>
                <span>{{current.description || '???'}}</span>
              </div>
            </div>
            <h1>{{current.title}}</h1>
          </div>
          <div class="buy">
            <router-link :to="`/new_order`" :class="`btn-primary btn-large ${current.id ? '' : 'disabled'}`">
              ￥3000 购买
            </router-link>
            <button v-if="!pet_exist" @click="add_to_cart(current.id, 1)" class="btn-large">加入购物车</button>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="container no-padding detail round">
          <div class="other-info center">
            <div class="col-lg-2">5个月</div>
            <div class="col-lg-2">{{current.vaccinated ? '已' : '未'}}打疫苗</div>
            <div class="col-lg-2">{{current.disease ? '有' : '无'}}遗传病</div>
            <div class="col-lg-2">{{current.neuter ? '已' : '未'}}绝育</div>
            <div class="col-lg-2">{{current.pure_breed ? '纯种' : '非纯种'}}</div>
          </div>
          <div class="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, similique harum? In voluptas temporibus nisi sit ea
            enim dolore pariatur ipsum, perferendis atque eligendi cum est incidunt neque, maxime tempore. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Nulla libero dolores, odio at iusto dignissimos molestiae in nisi a sunt
            dolorum pariatur quisquam rem maxime, voluptate quasi magnam adipisci illum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Maiores soluta earum modi aliquam. Officiis, consectetur saepe. Accusamus perferendis dolor accusantium
            veritatis rerum doloremque odio aspernatur a libero. Laborum, ratione voluptatibus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tempore odit aperiam nisi possimus fugiat vel, corrupti unde atque odio! Explicabo
            impedit sint voluptatibus. Similique nemo consectetur nihil vitae a architecto!
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import api from "../lib/api.js";

import { hub, add, all, pet_exist } from "../hub/cart.js";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
  components: { Nav, Footer },

  mounted() {
    this.find();
  },

  data() {
    return {
      pet_exist: false,
      current: {},
      hub: {}
    };
  },

  methods: {
    all,
    add_to_cart: add,
    find() {
      let id = this.$route.params.id;

      api("pet/find", { id, with: "has_one:breed" }).then(r => {
        this.current = r.data;
        console.log("this.current", this.current);
      });
    }
  },

  watch: {
    hub: {
      deep: true,
      handle(n, o) {
        if (this.current) {
          this.pet_exist = pet_exist(this.current.id);
        }
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 60px;
  font-weight: 900;
}

.slider:hover .mask,
.slider:hover .info {
  opacity: 1;
}

.mask {
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 5px;
}

.info {
  opacity: 0;
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  width: 50%;
  line-height: 2rem;
  font-size: 1.1rem;
}

.mask,
.info {
  transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
}

.prop > *:first-child {
  opacity: 0.7;
  margin-right: 10px;
}

/* .prop > *:nth-child(2) {
} */

.buy {
  position: absolute;
  bottom: 40px;
  right: 60px;
  padding: initial 50px;
}

.detail {
  border: 5px solid #ffbe00;
  margin-top: 10px;
}

.detail .other-info {
  border-bottom: solid #ffbe00;
}

.detail .other-info > * {
  padding: 10px;
  color: #ffbe00;
  font-size: 1.2rem;
  font-weight: bold;
}

.detail .content {
  padding: 10px;
  background: #fff;
}
</style>