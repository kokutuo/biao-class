<template>
  <div class="card-weibo">
    <el-card class="row" shadow="never">
      <div class="col-lg-1 avatar">
        <router-link to="/mine">
          <img src="../img/user-avatar.jpg" alt="avatar">
        </router-link>
      </div>
      <div class="col-lg-11 main">
        <div class="author">
          <div class="name">{{row.$user ? row.$user.username : '人谋了'}}</div>
          <div class="time">8月13日 19:34</div>
        </div>
        <div class="text">
          <p>{{row.content}}</p>
        </div>
        <div class="pic"></div>
      </div>
      <div class="toolbar">
        <span v-if="row.user_id==uinfo.id">推广</span>
        <span v-else><i class="far fa-lg fa-star"></i>收藏</span>
        <span><i class="far fa-lg fa-share-square"></i>1354</span>
        <span @click="show_comment(row.id)"><i class="far fa-lg fa-comments"></i>3645</span>
        <span @click="toggle_like(uinfo.id)" :class="{liked: liked}">
          <i v-if="liked" class="fas fa-lg fa-thumbs-up"></i>
          <i v-else class="far fa-lg fa-thumbs-up"></i>
          {{liked_count}}
        </span>
      </div>      
      <div class="dropdown">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span v-if="row.user_id==uinfo.id">
              <el-dropdown-item @click.native="remove(row.id)">删除</el-dropdown-item>
              <el-dropdown-item>置顶</el-dropdown-item>
              <el-dropdown-item>加标签</el-dropdown-item>              
            </span>
            <span v-else>
              <el-dropdown-item>屏蔽这条微博</el-dropdown-item>
              <el-dropdown-item>屏蔽 {{row.$user ? row.$user.username : '人谋了'}}</el-dropdown-item>
              <el-dropdown-item >取消关注 {{row.$user ? row.$user.username : '人谋了'}}</el-dropdown-item>
              <el-dropdown-item>举报</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>  
    </el-card>
    <transition name="el-zoom-in-top">
      <div v-if="comment_visible" class="comment-list">
        <el-form :model="form" size="mini" class="tar">
          <el-form-item>
            <div class="row">
              <div class="col-lg-1 avatar tac">
                <img src="../img/user-avatar.jpg" alt="avatar">
              </div>
              <div class="col-lg-11">
                <el-input 
                  v-model="form.content" 
                  type="textarea"
                  autosize 
                  style="margin-bottom:10px;"
                  placeholder="请输入内容">
                </el-input>
              </div>
            </div>
            <el-button 
              @click="submit(row.id)" 
              type="primary" 
              :disabled="!form.content">评论
            </el-button>
          </el-form-item>
        </el-form>
        <!-- 一级评论 -->
        <div v-for="it in comment_list" :key="it.id" class="comment">
          <div class="row">
            <div class="col-lg-1 avatar tac">
              <img src="../img/user-avatar.jpg" alt="avatar">
            </div>
            <div class="col-lg-11">
              <div class="comment-content">
                <router-link to="/person" class="name">{{it.$user ? it.$user.username : '谋'}} :</router-link>
                <span>{{it.content}}</span>
              </div>
              <div class="comment-tool">
                <div class="col-lg-6">8月27日</div>
                <div class="col-lg-6 tar">
                  <el-button 
                    @click="form.reply_to=it.id"
                    plain 
                    size="mini" 
                    style="margin-right:5px">回复
                  </el-button>
                  <el-button 
                    v-if="form.reply_to"
                    @click="form.reply_to=null"
                    plain 
                    size="mini" 
                    style="margin-right:5px">取消
                  </el-button>
                  <span class="like"><i class="far fa-md fa-thumbs-up"></i>56</span>
                </div>
              </div>
              <!-- 二级评论 -->
              <div v-if="it.id == form.reply_to" class="child-comment-list">
                <el-form model="reply_form">
                  <el-form-item>
                    <el-input 
                      v-model="reply_form.content" 
                      type="textarea"
                      autosize 
                      placeholder="请输入内容">
                    </el-input>
                    <div class="tar">
                      <el-button 
                        @click="submit(row.id)"
                        plain
                        size="mini"
                        class="tar"    
                        type="primary" 
                        :disabled="!reply_form.content">回复
                      </el-button>
                    </div>
                  </el-form-item>
                </el-form>
                <div v-if="it.reply_to" v-for="it in comment_list" :key="it.id" class="child-comment">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "../css/card.css";

import api from "../lib/api.js";
import session from "../lib/session";

export default {
  props: {
    row: {
      default() {
        return {};
      }
    },
    uinfo: {
      default() {
        return {};
      }
    }
  },

  mounted() {
    this.init_form();
  },

  data() {
    return {
      weibo: this.row,
      comment_visible: false,
      comment_list: [],
      form: {},
      reply_form: {},
      liked_count: 0,
      liked: false
    };
  },

  methods: {
    remove(id) {
      console.log("id", id);
      // api('weibo/delete', {id}).then(r=>{
      //   this.row = r.data;
      // })
    },

    submit(weibo_id) {
      this.form.weibo_id = weibo_id;

      api("comment/create", this.form).then(r => {
        this.init_form();
        // this.comment_list.unshift(r.data);
        this.read_comment(weibo_id);
      });
    },

    init_form() {
      this.form = {
        user_id: session.his_id(),
        reply_to: null
      };
    },

    read_comment(weibo_id) {
      api("comment/read", {
        where: { weibo_id },
        with: "belongs_to:user"
      }).then(r => {
        this.comment_list = r.data;
      });
    },

    show_comment(weibo_id) {
      if (!this.comment_visible) {
        this.read_comment(weibo_id);
      }

      this.comment_visible = !this.comment_visible;
    },

    toggle_like(user_id) {
      !this.liked &&
        api("user/bind", {
          model: "weibo",
          glue: {
            [user_id]: this.row.id
          }
        }).then(r => {
          this.liked = !this.liked;
          this.liked_count++;
        });

      this.liked &&
        api("user/unbind", {
          model: "weibo",
          glue: {
            [user_id]: this.row.id
          }
        }).then(r => {
          this.liked = !this.liked;
          this.liked_count--;
        });
    }
  }
};
</script>

<style scoped>
.card-weibo .name,
.card-weibo .time,
.card-weibo .toolbar,
.card-weibo .avatar {
  cursor: pointer;
}

.card-weibo .el-card {
  position: relative;
}

.card-weibo .dropdown {
  position: absolute;
  right: 35px;
  top: 15px;
}

.card-weibo .avatar img {
  border-radius: 50%;
  max-width: 50px;
}

.card-weibo .main {
  padding: 0 15px;
}

.card-weibo .main > * {
  margin-bottom: 5px;
}

.card-weibo .author .name {
  color: #303133;
  font-size: 14px;
  font-weight: bolder;
  transition: color 200ms;
}

.card-weibo .author .name:hover {
  color: #409eff;
}

.card-weibo .author .time {
  color: #909399;
  font-size: 12px;
}

.card-weibo .text {
  line-height: 1.6;
  margin-bottom: 15px;
}

.card-weibo .pic {
  padding-bottom: 20px;
}

.card-weibo .toolbar {
  position: absolute;
  border-top: 1px solid #ebeef5;
  left: 0;
  right: 0;
  bottom: 0;
}

.card-weibo .toolbar > * {
  display: inline-block;
  margin: 5px 0;
  width: 25%;
  text-align: center;
  border-right: 1px solid #ebeef5;
}

.card-weibo .toolbar .liked {
  color: #409eff;
}

.card-weibo .toolbar > *:last-child {
  border-right: 0;
}

.card-weibo .comment-list {
  background: #ebeef5;
  color: #606266;
  padding: 10px 18px;
}

.card-weibo .comment-list .avatar img {
  width: 30px;
}

.card-weibo .comment-list .comment {
  border-top: 1px solid #dcdfe6;
  padding: 10px;
}

.card-weibo .comment-list .comment-content {
  /* font-size: 13px; */
  padding-bottom: 5px;
}

.card-weibo .comment-list .comment-content .name {
  color: #409eff;
  margin-right: 9px;
}

.card-weibo .comment-list .comment-tool * {
  font-size: 8px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 200ms;
}

.card-weibo .comment-list .comment-tool .like:hover {
  color: #409eff;
}

.card-weibo .child-comment-list {
  background: #f2f6fc;
  color: #606266;
  padding: 10px 18px;
  margin-top: 10px;
}

.card-weibo .child-comment-list .child-comment {
  border-top: 1px solid #dcdfe6;
  padding: 10px;
}
</style>