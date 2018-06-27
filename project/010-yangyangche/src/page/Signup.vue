<template>
  <div>
    <div class="row">
      <div class="col-lg-5" style="margin-left: 0;">
        <div class="bg-pic"></div>
      </div>
      <div class="col-lg-7">
          <div class="parent">
            <div class="content">
              <div class="header">
                <h1>欢迎注册洋洋车</h1>
                <div class="sub-title">买好车，上洋洋车</div>
              </div>
              <form class="main-form">
                <div class="signup-input">
                  <input id="username" type="text" placeholder="用户名" autocomplete="off" autofocus>
                </div>
                <div class="signup-input">
                  <input id="password" type="password" placeholder="密码">
                </div>
                <div class="signup-input">
                  <input id="repeat" type="password" placeholder="再次输入密码">
                </div>
                <div class="signup-input">
                  <button class="btn-primary" type="submit">立即注册</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.bg-pic {
  width: 400px;
  height: 100vh;
  background-image: url(../assets/signup/signup.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.parent {
  position: relative;
}

.content {
  position: absolute;
  top: 100px;
  left: 100px;
}

.header {
  margin-bottom: 40px;
}

h1 {
  font-size: 44px;
}

.sub-title {
  font-size: 22px;
}

.main-form input {
  height: 45px;
  padding: 10px 20px;
  font-size: 18px;
}



.main-form button,
.main-form input {
  width: 420px;
  margin-bottom: 30px;
  border-radius: 5px;
}

.main-form button {
  padding: 10px 20px;
  font-size: 30px;
  font-weight: lighter;
}
</style>
