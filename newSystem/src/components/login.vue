<template>
    <div class="login-container">
        <el-card class="login">
            <template #header>
                <div class="card-header">
                    <span class="title">虚拟仿真平台登录入口</span>
                </div>
            </template>
            <div class="username">
                <span>用户名</span>
                <el-input id="username" v-model="username" style="width: 240px; margin-bottom: 15px"
                    placeholder="username" />
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
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
    name: "Login",
    setup() {
        const router = useRouter()
        const route = useRoute()

        const username = ref('');
        const password = ref('');

        const goRegister = () => {
            router.push(route.meta.isLogin ? '/' : '/register');
        };

        const login = async () => {
            try {
                const response = await axios.post("http://localhost:8081/user/login", {
                    account: username.value,
                    password: password.value,
                });

                // 登录成功的处理
                alert(response.data.msg); // 使用alert代替message组件，实际应使用Vue的消息提示组件
                localStorage.setItem("user_info", JSON.stringify(response.data.data));
                let roles = response.data.data.roles;
                let roleNames = roles.map(role => role.roleName);
                localStorage.setItem("user_roles", JSON.stringify(roleNames));
                localStorage.setItem("token", response.data.data.token);

                // 页面跳转
                router.push("/home");
            } catch (error) {
                console.error('登录失败:', error);
            }
        };

        // 返回需要在模板中使用的数据和方法
        return {
            username,
            password,
            goRegister,
            login
        };
    },
};
</script>

<style>
.login-container {
    display: grid;
    place-items: center;
    height: 100vh;
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