<template>
    <div class="side-nav">
        <div class="title">管理员设置</div>
            <router-link to="/admin/user" class="nav-item">用户管理</router-link>
            <router-link to="/admin/vehicle" class="nav-item">车辆管理</router-link>
            <router-link to="/admin/brand" class="nav-item">品牌管理</router-link>
            <router-link to="/admin/model" class="nav-item">型号管理</router-link>
            <router-link to="/admin/design" class="nav-item">车类管理</router-link>
            <router-link to="/admin/location" class="nav-item">地址管理</router-link>
            <router-link to="/admin/report" class="nav-item">质检管理</router-link>
            <router-link to="/admin/appo" class="nav-item">预约管理</router-link>
        </div>
</template>

<script>
import '../css/sideNav.css';
export default {
    
}
</script>

<style scoped>

</style>
