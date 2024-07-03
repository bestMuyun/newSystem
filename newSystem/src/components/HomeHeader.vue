<template>
    <div>
        <div class="div-left">
            <el-image style="width: 40px; height: 40px; margin-top: 10px" :src="logoUrl"></el-image>
        </div>
        <div class="div-left">
            <h3 style="margin-top: 0px">虚拟仿真后台管理系统</h3>
        </div>
        <div class="div-right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item divided><a @click="logout">退出登录</a></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import logoImage from '@/assets/logo.png';
export default {
    name: "HomeHeader",
    data() {
        return {
            logoUrl: logoImage,
        }
    },
    methods: {
        logout() {
            this.$router.push("/");
            localStorage.removeItem("token")
        }
    }

}
</script>

<style scoped>
.div-left {
    float: left;
}

.div-right {
    float: right;
}
</style>
