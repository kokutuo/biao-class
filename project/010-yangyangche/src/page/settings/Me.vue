<template>
    <div>
        <Nav :push-down="true"/>
        <div class="container row">
            <div class="col-lg-3">
                <SettingNav/>
            </div>
            <div class="col-lg-9 content">
                <div class="header row">
                    <div class="col-lg-8 left">
                        <div class="title">基本信息</div>
                    </div>
                    <div class="col-lg-4 right">
                        <button @click="editor_model = true" class="btn-primary">修改</button>
                    </div>
                </div>
                <form v-if="editor_model">
                    <div class="input-control">
                        <label for="username">昵称</label>
                        <input type="text" id="username"> 
                    </div>
                    <div class="input-control">
                        <label for="e-mail">e-mail</label>
                        <input type="e-mail" id="e-mail">
                    </div>
                    <div class="input-control">
                        <label for="company">公司</label>
                        <input type="text" id="company"> 
                    </div>
                    <button class="btn-primary" type="submit">提交</button>
                    <button class="btn" @click="editor_model=false" type="button">取消修改</button>
                </form>
                <div v-else>
                    <div class="row prop-item">
                        <div class="col-lg-3 key">昵称:</div>
                        <div class="col-lg-9 val">没事走两步</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-3 key">公司:</div>
                        <div class="col-lg-9 val">今晚打老虎</div>
                    </div>
                    <div class="row prop-item">
                        <div class="col-lg-3 key">e-mail:</div>
                        <div class="col-lg-9 val">xxxxxxxxxx@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../css/admin.css';

import Nav from "../../components/Nav";
import SettingNav from "../../components/SettingNav";

export default {
  components: {
    Nav,
    SettingNav
  },
  data() {
    return {
      editor_model: false
    };
  }
};
</script>

<style scoped>
.content {
  padding-left: 30px;
  padding-right: 50px;
}

.prop-item {
  padding: 8px 0;
  border-radius: 5px;
}

.prop-item:nth-child(even) {
  background: #f3f5f8;
}

.prop-item .key,
.prop-item .val {
  font-size: 18px;
}
</style>
