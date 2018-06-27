<template>
    <div class="side-nav">
      <div class="title">个人设置</div>
      <a href="#" class="nav-item active">基础信息</a>
      <a href="#" class="nav-item">修改密码</a>
      <a href="#" class="nav-item">车辆买卖</a>
    </div>
</template>

<script>

</script>

<style scoped>
  .side-nav {
    /* max-width: 200px; */
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 4px;
  }

  .title {
    font-weight: 900;
    background: #f3f5f8;
  }

  .title,
  .nav-item {
    display: block;
    padding: 7px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .nav-item:hover {
    background: #f3f5f8;
  }

  .nav-item.active {
    border-left: 2px solid red;
  }
</style>
