<template>
  <div id="person">
    <Nav/>

    <div class="container">
      <div class="row main">
        <div class="col-lg-2 left-nav">
          <div class="block">
            <div class="side-item active">首页</div>
            <div class="side-item">我的收藏</div>
            <div class="side-item">我的赞</div>
          </div>
          <div class="block">
            <div class="side-item">热门微博</div>
            <div class="side-item">热门视频</div>
          </div>
          <div class="block">
            <div class="side-item">好友圈</div>
            <div class="side-item">特别关注</div>
            <div class="side-item">群微博</div>
            <div class="side-item">悄悄关注</div>
          </div>
        </div>
        <div class="col-lg-7 content">
          <div class="send-weibo round">
            <div class="title">有什么新鲜事想告诉大家？</div>
            <el-form :model="form">
              <el-form-item style="margin-bottom:5px;">
                <el-input
                  v-model="form.content"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容">
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="row">
                  <div class="col-lg-8 toolbar">
                    <span>
                      <i class="fas fa-laugh"></i>表情
                    </span>
                    <span>
                      <i class="fas fa-images"></i>图片
                    </span>
                    <span>
                      <i class="fas fa-video"></i>视频
                    </span>
                    <span>
                      <i class="fab fa-slack"></i>话题
                    </span>
                    <span>
                      <i class="fas fa-newspaper"></i>头条文章
                    </span>                      
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>直播</el-dropdown-item>
                        <el-dropdown-item>点评</el-dropdown-item>
                        <el-dropdown-item>音乐</el-dropdown-item>
                        <el-dropdown-item>投票</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="col-lg-4 tar">
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        <strong>公开<i class="fas fa-angle-down"></i></strong>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>公开</el-dropdown-item>
                        <el-dropdown-item>好友圈</el-dropdown-item>
                        <el-dropdown-item>近自己可见</el-dropdown-item>
                        <el-dropdown-item>群可见</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button 
                      @click="new_weibo"
                      type="primary" 
                      :disabled="!form.content"
                      style="width: 100px; margin-left:10px; padding:10px;" 
                      size="lager">发布
                    </el-button>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="row content-nav round">
            <div class="col-lg-8">
              <span class="nav-item">全部</span>
              <span class="nav-item">原创</span>
              <span class="nav-item">图片</span>
              <span class="nav-item">视频</span>
              <span class="nav-item">音乐</span>
              <span class="nav-item">文章</span>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-3">
              <el-input suffix-icon="el-icon-search" size="mini" placeholder="搜索我关注人的微博"></el-input>
            </div>
          </div>
          <div class="card-list">
            <CardWeibo :row="it" :uinfo="uinfo" v-for="it in list" :key="it.id"/>
            <div v-if="!list.length" class="empty-holder round"><i class="fas fa-exclamation-circle fa-lg"></i>暂无内容</div>
          </div>
        </div>
        <div class="col-lg-3 right-nav">
          <div v-for="it in user_list" :key="it.id" class="mine">
            <div class="cover">
              <div class="avatar">
                <router-link to="/mine">
                  <img src="../img/user-avatar.jpg" alt="kokutuo">
                </router-link>
              </div>
            </div>
            <div class="info">
              <div class="name">{{it.username}}</div>
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
              <div>
                <el-button @click="follow(it)" v-if="!has_followed(it.id)" type="primary" plain size="mini">关注</el-button>
                <el-button @click="unfollow(it)" v-else type="warning" plain size="mini">取消关注</el-button>
              </div>
            </div>
          </div>
          <div class="news-list">
            <div class="header">
              <h2>新鲜事</h2>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6 pic">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
            <div class="row news">
              <div class="col-lg-6">
                <div class="title">微博问答榜丨七夕你要怎么过？</div>
                <div class="time">25分钟前</div>
              </div>
              <div class="col-lg-6">
                <img src="../img/news.jpg" alt="pic">
              </div>
            </div>
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
  name: "person",
  components: {
    Nav,
    CardWeibo
  },

  mounted() {
    this.read_user();
    this.read_followed().then(r => {
      this.read_followed_weibo();
    });
  },

  data() {
    return {
      list: [],
      followed_list: [],
      user_list: [],
      form: {},
      uinfo: session.uinfo()
    };
  },

  methods: {
    read_user() {
      api("user/read").then(r => {
        this.user_list = r.data;
      });
    },

    read_followed() {
      return api("user/find", {
        id: this.uinfo.id,
        with: [
          {
            relation: "belongs_to_many",
            model: "user"
          }
        ]
      }).then(r => {
        this.followed_list = r.data.$user;
      });
    },

    read_followed_weibo() {
      let id = this.pluck(this.followed_list, "id");

      if (!id.length) {
        return;
      }

      api("weibo/read", {
        where: [["user_id", "in", id]],
        with: "belongs_to:user"
      }).then(r => {
        this.list = r.data;
      });
    },

    /**
     * 将数组 arr 中每一项键名为 key 的数据取出来
     */
    pluck(arr, key) {
      arr = arr || [];
      const result = [];

      arr.forEach(it => {
        result.push(it[key]);
      });

      return result;
    },

    new_weibo() {
      this.form.user_id = session.his_id();
      api("weibo/create", this.form).then(r => {
        this.form = {};
        // this.list.unshift(r.data);
        this.read_followed_weibo();
      });
    },

    follow(user) {
      api("user/bind", {
        model: "user",
        glue: {
          [this.uinfo.id]: user.id
        }
      }).then(r => {
        this.read_followed();
      });
    },

    unfollow(user) {
      api("user/unbind", {
        model: "user",
        glue: {
          [this.uinfo.id]: user.id
        }
      }).then(r => {
        this.read_followed();
      });
    },

    has_followed(target_id) {
      if (!this.followed_list) {
        return false;
      }

      return !!this.followed_list.find(user => {
        return user.id == target_id;
      });
    }
  }
};
</script>

<style scoped>
#person .main {
  padding: 0 25px;
}

#person .left-nav {
  text-align: center;
  padding: 0 20px;
  border-radius: 4px;
}

#person .side-item {
  padding: 5px 15px;
  margin-bottom: 3px;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
}

#person .side-item.active {
  background: rgba(0, 0, 0, 0.3);
}

#person .side-item:hover {
  background: rgba(0, 0, 0, 0.3);
}

#person .content {
  padding: 0 10px;
}

#person .content > * {
  margin-bottom: 18px;
}

#person .send-weibo {
  background: #fff;
  padding: 10px 15px 5px 15px;
}
#person .content-nav *,
#person .send-weibo * {
  vertical-align: middle;
}

#person .send-weibo .title {
  font-size: 15px;
  font-weight: bolder;
  opacity: 0.9;
  margin-bottom: 5px;
  color: #409eff;
}

#person .send-weibo .toolbar i {
  color: #40a0ffc4;
}

#person .content-nav {
  background: #fff;
  padding: 10px;
}

#person .content-nav .nav-item {
  cursor: pointer;
  padding: 5px 10px;
}

#person .card-list > * {
  margin-bottom: 5px;
  /* border-bottom: 1px solid rgba(0, 0, 0, .05); */
}

#person .right-nav {
  padding-left: 20px;
}

#person .right-nav .news-list {
  background: #f2f6fc;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

#person .right-nav .mine {
  margin-bottom: 20px;
}

#person .right-nav .cover {
  position: relative;
  height: 75px;
  background-image: url(../img/profile_cover_s.jpg);
  background-repeat: repeat-x;
  background-size: cover;
  border-radius: 4px 4px 0 0;
}

#person .right-nav .avatar img {
  position: absolute;
  cursor: pointer;
  padding: 3px;
  border-radius: 50%;
  max-width: 60px;
  left: 40%;
  right: 40%;
  bottom: -20px;
}

#person .right-nav .info {
  border-radius: 0 0 4px 4px;
}

#person .right-nav .info > * {
  margin-top: 8px;
  cursor: pointer;
}
#person .right-nav .info {
  background: #fff;
  padding: 20px 10px;
  text-align: center;
}

#person .right-nav .name {
  font-size: 16px;
  font-weight: bolder;
  transition: color 200ms;
}

#person .right-nav .user-attention > * {
  display: inline-block;
  width: 33.3333%;
}

#person .right-nav .line {
  border-right: 1px solid #ebeef5;
}

#person .content-nav .nav-item:hover,
#person .right-nav .name:hover,
#person .right-nav .line:hover .val {
  color: #409eff;
}

#person .right-nav .line:last-child {
  border-right: 0;
}

#person .right-nav .val {
  font-size: 16px;
  font-weight: bolder;
  transition: color 200ms;
}

#person .right-nav .news .title {
  font-size: 13px;
  font-weight: bolder;
  color: #606266;
  padding: 5px;
  padding-bottom: 0;
}

#person .right-nav .news .time {
  font-size: 8px;
  color: #c0c4cc;
  padding: 0 5px;
}

#person .right-nav .news .pic {
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
