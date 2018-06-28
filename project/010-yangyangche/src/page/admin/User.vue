<template>
    <div>
        <Nav :push-down="true"/>
        <div class="container row">
            <div class="col-lg-3">
                <AdminNav/>
            </div>
            <div class="col-lg-9 content">
                <div class="header">
                    <div class="title">用户管理</div>
                </div>
                <div class="table">
                    <table>
                        <thead>
                        <th>用户名</th>
                        <th>手机号</th>
                        <th>邮箱</th>
                        <th>近期卖车</th>
                        <th>近期买车</th>
                        </thead>
                        <tbody>
                        <tr>
                        <td>whh</td>
                        <td>18399998888</td>
                        <td>whh@yo.com</td>
                        <td>是</td>
                        <td>否</td>
                        </tr>
                        <tr>
                        <td>lsd</td>
                        <td>18399998888</td>
                        <td>lsd@yo.com</td>
                        <td>是</td>
                        <td>否</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Nav";
import AdminNav from "../../components/AdminNav";

export default {
  components: {
    Nav,
    AdminNav
  }
};
</script>

<style scoped>
.header .title {
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.table {
  padding: 10px 20px;
  overflow: auto;
}

table {
  border: 1px solid #f3f5f8;
}

thead,
tr {
    border-bottom: 1px solid #f3f5f8;
}

th,
td {
  text-align: left;
  padding: 5px 10px;
}

/* th:nth-child(odd),
td:nth-child(even) {
    background: #fd521d;
} */
</style>


