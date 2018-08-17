<template>
  <div class="card-weibo">
    <el-card class="row" shadow="never">
      <div class="col-lg-1 avatar">
        <img src="../img/user-avatar.jpg" alt="avatar">
      </div>
      <div class="col-lg-11 main">
        <div class="author">
          <div class="name">王花花</div>
          <div class="time">8月13日 19:34</div>
        </div>
        <div class="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ducimus iste animi excepturi repellat aliquid. Ipsum est veniam, laboriosam, molestiae, minima cum iusto alias inventore repudiandae dolorem incidunt quibusdam. Corporis.
          </p>
        </div>
        <div class="pic"></div>
      </div>
      <div class="toolbar">
        <span><i class="far fa-lg fa-star"></i>收藏</span>
        <span><i class="far fa-lg fa-share-square"></i>1354</span>
        <span><i class="far fa-lg fa-comments"></i>3645</span>
        <span><i class="far fa-lg fa-thumbs-up"></i>5678</span>
      </div>        
    </el-card>
  </div>
</template>

<script>
import '../css/card.css';

export default {};
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

.card-weibo .avatar img {
  border-radius: 50%;
  max-width: 50px;
}

.card-weibo .main {
  padding: 0 15px;
}

.card-weibo .main>* {
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
  border: 1px solid #ebeef5;
  left: 0;
  right: 0;
  bottom: 0;
}

.card-weibo .toolbar>* {
  display: inline-block;
  margin: 5px 0;
  width: 25%;

  text-align: center;
  border-right: 1px solid #ebeef5;
}

.card-weibo .toolbar>*:last-child {
  border-right: 0;
}

</style>