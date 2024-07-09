<template>
    <div id="background">
        <el-image style="width: 200px; height: 40px; margin-top: 10px" :src="logoUrl"></el-image>
        <div class="login-container">
            <el-card class="login">
                <template #header>
                    <div class="card-header">
                        <span class="title">虚拟仿真平台登录入口</span>
                    </div>
                </template>
                <div class="username">
                    <span>账号</span>
                    <el-input id="account" v-model="account"
                        style="width: 240px; margin-left: 14px; margin-bottom: 15px"
                        placeholder="Please input account" />
                </div>
                <br>
                <div class="password">
                    <span>密码</span>
                    <el-input id="password" v-model="password" style="width: 240px; margin-left: 14px" type="password"
                        placeholder="Please input password" show-password />
                </div>
                <template #footer>
                    <div class="btn-container">
                        <el-button class="btn-left" type="primary" @click="login()">登录</el-button>
                        <el-button class="btn-right" type="primary" text @click="goRegister()">
                            去注册
                        </el-button>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import logoImage from '@/assets/cquptLogo.jpg';
import backgroundImage from '@/assets/img/login-background.jpg';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "Login",
    setup() {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()
        const logoUrl = logoImage;
        const username = ref('');
        const account = ref('');
        const password = ref('');

        const goRegister = () => {
            router.push(route.meta.isLogin ? '/' : '/register');
        };

        const login = async () => {
            try {
                const response = await axios.post("http://10.17.226.10:8081/user/login", {
                    account: account.value,
                    password: password.value,
                });
                store.commit('setUser', response.data.data);
                // 登录成功的处理
                ElMessage.success(response.data.msg);
                localStorage.setItem("user_info", JSON.stringify(response.data.data));
                let roles = response.data.data.roles;
                let roleNames = roles.map(role => role.roleName);
                localStorage.setItem("user_roles", JSON.stringify(roleNames));

                // 页面跳转
                router.push("/hello");
            } catch (error) {
                ElMessage.error("登录失败");
                console.error('登录失败:', error);
            }
        };

        // 返回需要在模板中使用的数据和方法
        return {
            username,
            password,
            account,
            goRegister,
            login,
            logoUrl,
        };
    },
};
</script>

<style>
#background {
    background-image: url("@/assets/img/login-background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

.login-container {
    display: grid;
    place-items: center;
    height: 80vh;
}

.login {
    width: 400px;
    text-align: center;
}

.btn-container {
    position: relative;
}

.btn-right {
    position: absolute;
    right: 10px;
}
</style>