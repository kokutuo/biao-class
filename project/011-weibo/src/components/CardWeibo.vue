<template>
  <div class="row card">
    <el-card shadow="hover">
      <div class="col-lg-5 card-pic">
        <img src="../img/card.jpg" alt="卡片图">
      </div>
      <div class="col-lg-7">
        <!-- <h2 class="title">
          《魔兽世界：争霸艾泽拉斯》现已全球同步上线
        </h2> -->
        <div class="author">
          <span class="avatar">
            <img src="../img/avatar.jpg" alt="头像">
          </span>
          <span class="name">魔兽世界</span>
          <span class="time">8月14号 15:03</span>
        </div>
        <div class="intro">
          <p>《争霸艾泽拉斯》现已全球同步上线测试！探索新大陆，踏上 120 级的征程，打造艾泽里特护甲，体验战争前线、海岛探险等全新游戏内容。寻找盟友，为你的阵营而战吧！</p>
        </div>
        <div class="toolbar tar">
          <span class="like">
            <i class="fas fa-lg fa-thumbs-up"></i>19000
          </span>
          <span class="dislike">
            <i class="fas fa-lg fa-thumbs-down"></i>1232 
          </span>
          <span class="share">
            <i class="fas fa-lg fa-share"></i>200000
          </span>
          <span class="comment">
            <i class="fas fa-lg fa-comments"></i>6999
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  cursor: pointer;
}

.card-pic {
  padding-right: 10px;
}

.card-pic img {
  width: 100%;
  border-radius: 4px;
}

/* .card .title {
  font-size: 18px;
  font-weight: 600;
  color: #606266;
} */

.card .author * {
  color: #909399;
  font-size: 12px;
  padding: 2px;
  vertical-align: bottom;
}

.card .author .avatar img {
  max-width: 20px;
  border-radius: 50%;
}

.card .intro {
  font-size: 15px;
  color: #909399;
  line-height: 1.1;
  transition: color 200ms;
}

.card .intro:hover {
  color: #606266;
}

.card .toolbar > * {
  display: inline-block;
  padding: 5px 7px;
  font-size: 14px;
  color: #c0c4cc;
  transition: color 200ms;
}

.card .toolbar > *:hover {
  color: #409eff;
}
</style>