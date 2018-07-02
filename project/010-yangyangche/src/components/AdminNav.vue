<template>
    <div class="side-nav">
        <div class="title">管理员设置</div>
            <router-link to="/admin/user" class="nav-item">用户管理</router-link>
            <router-link to="/admin/vehicle" class="nav-item">车辆管理</router-link>
            <router-link to="/admin/brand" class="nav-item">车辆品牌</router-link>
            <!-- <router-link to="/admin/vehicle" class="nav-item">质检管理</router-link> -->
        </div>
</template>

<script>
import '../css/sidenav.css';
export default {
    
}
</script>

<style scoped>

</style>
