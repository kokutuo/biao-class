<template>
  <div id="home">
    <Nav/>

    <div class="container">
      <div class="main">
        <div class="row">
          <div class="col-lg-2 left-nav">
            <div class="side-item active">热点</div>
            <div class="side-item">头条</div>
            <div class="side-item">视频</div>
            <div class="side-item">新鲜事</div>
            <div class="side-item">榜单</div>
            <div class="side-item">搞笑</div>
            <div class="side-item">社会</div>
            <div class="side-item">时尚</div>
            <div class="side-item">电影</div>
            <div class="side-item">美女</div>
            <div class="side-item">体育</div>
            <div class="side-item">动漫</div>
          </div>
          <div class="col-lg-7">
            <div class="content">
              <div class="slider">
                <el-carousel height="370px" :interval="2000">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="card-list">
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
                <CardNews/>
              </div>
            </div>
          </div>
          <div class="col-lg-3 right-nav">
            <div class="login">
              <el-tabs value="account" :stretch="true">
                <el-tab-pane label="账号登录" name="account">
                  <el-form v-model="form" >
                    <el-form-item>
                      <el-input v-model="form.unique" prefix-icon="fas fa-user"  placeholder="邮箱/会员账号/手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.pwd" prefix-icon="fas fa-lock"  placeholder="邮箱/会员账号/手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="submit" type="primary" size="medium">登录</el-button>
                      <span class="anchor">还没有账号？<router-link style="color:#409EFF;" to="/signup">立即注册!</router-link></span>
                    </el-form-item>
                  </el-form>
                  <div class="other-login">
                    <span class="anchor">其他登录方式:</span>
                    <span class="brand">
                      <i class="fab fa-qq"></i>
                      <i class="fab fa-weixin"></i>
                      <i class="fab fa-github"></i>
                      <i class="fab fa-chrome"></i>
                      <i class="fab fa-firefox"></i>
                    </span>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="安全登录" name="qrcode">安全登录</el-tab-pane>
              </el-tabs>
            </div>
            <div class="news-list">
              <div class="header">
                <h2>新鲜事</h2>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
              <div class="row news">
                <div class="col-lg-6">
                  <div>微博问答榜丨七夕你要怎么过？</div>
                  <div>25分钟前</div>
                </div>
                <div class="col-lg-6">
                  <img src="../img/news.jpg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/login.css";

import session from '../lib/session.js';

import Nav from "../components/Nav";
import CardNews from "../components/CardNews";

export default {
  name: "home",
  components: {
    Nav,
    CardNews
  },

  data() {
    return {
      form: {
        unique: "",
        pwd: ""
      }
    };
  },

  methods: {
    submit() {
      session.exist(this.form.unique, this.form.pwd).then(r => {
        if (!r) {
          this.passed = false;
          alert("账号或密码不正确，请重新输入");
          return;
        }

        this.passed = true;
        session.login(r);
        alert("登录成功！");
        // location.href = "/";
        this.$router.push("/person");
      });
    }
  }
};
</script>

<style scoped>
#home .main {
  padding: 0 25px;
}

#home .left-nav {
  text-align: center;
  padding: 0 20px;
}

#home .side-item {
  padding: 5px 15px;
  margin-bottom: 3px;
  border-radius: 4px;
  cursor: pointer;
  color: #303133;
  font-size: 18px;
}

#home .side-item.active {
  background: rgba(64, 158, 255, 0.3);
}

#home .side-item:hover {
  background: rgba(64, 158, 255, 0.3);
}

#home .content {
  padding: 0 10px;
}

#home .slider {
  margin-bottom: 15px;
}

#home .card-list > * {
  margin-bottom: 5px;
  /* border-bottom: 1px solid rgba(0, 0, 0, .05); */
}

#home .right-nav > * {
  background: #f2f6fc;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

#home .right-nav .news .title {
  font-size: 13px;
  font-weight: bolder;
  color: #606266;
  padding: 5px;
  padding-bottom: 0;
}

#home .right-nav .news .time {
  font-size: 8px;
  color: #c0c4cc;
  padding: 0 5px;
}

#home .right-nav .news .pic {
  padding: 3px;
  border-radius: 4px;
}

/* ================================= */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  padding: 20px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
