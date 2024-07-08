<template>
    <div>
        <div class="div-left">
            <el-image style="width: 200px; height: 40px; margin-top: 10px" :src="logoUrl"></el-image>
        </div>
        <div class="div-left">
            <h3 style="margin-top: 0px">虚拟仿真后台管理系统</h3>
        </div>
        <div class="div-right">
            <el-dropdown>
                <el-button class="el-dropdown-link" type="primary" plain>
                    个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><a @click="gotoChangePassword">个人信息</a></el-dropdown-item>
                        <el-dropdown-item divided>
                            <a @click="logout">退出登录</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import logoImage from '@/assets/cquptLogo.jpg';
export default {
    name: "HomeHeader",
    data() {
        return {
            logoUrl: logoImage,
        };
    },
    methods: {
        logout() {
            this.$router.push("/");
        },
        gotoChangePassword() {
            this.$router.push("/user");
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

.el-dropdown-link {
    margin-top: 15px;
}
</style>
