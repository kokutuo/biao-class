<template>
    <div class="side-nav">
        <div class="title">管理员设置</div>
            <router-link to="/admin/user" class="nav-item">用户管理</router-link>
            <router-link to="/admin/order" class="nav-item">订单管理</router-link>
            <router-link to="/admin/pet" class="nav-item">宠物管理</router-link>
            <router-link to="/admin/category" class="nav-item">宠物种类管理</router-link>
            <router-link to="/admin/breed" class="nav-item">血统管理</router-link>
        </div>
</template>

<script>
import "../css/sideNav.css";
export default {};
</script>

<style scoped>
</style>
