<template>
    <div class="side-nav">
        <div class="title">个人设置</div>
            <router-link to="/me/setting" class="nav-item">账户设置</router-link>
            <router-link to="/me/safe" class="nav-item">安全设置</router-link>
            <router-link to="/me/order" class="nav-item">我的订单</router-link>
        </div>
</template>

<script>
import "../css/sideNav.css";
export default {};
</script>

<style scoped>
</style>
