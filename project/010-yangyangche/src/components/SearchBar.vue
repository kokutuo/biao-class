<template>
    <form class="search-bar">
        <input type="search" placeholder="请输入搜索关键词，如：别克1.6L···" autocomplete="off" autofocus>
        <button type="submit">搜索</button>
    </form>
</template>

<style scoped>
    .search-bar input {
        width: 35%;
        border-radius: 5px 0 0 5px;
        outline: 0;
    }

    .search-bar [type="submit"] {
        border-left: 0;
        border-radius: 0 5px 5px 0;
    }

    .search-bar [type="submit"]:hover {
        background: #fd5400;
        color: #fff;
    }
</style>
