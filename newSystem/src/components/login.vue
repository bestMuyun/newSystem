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
                <el-input v-model="username" style="width: 240px; margin-bottom: 15px" placeholder="username" />
            </div>
            <br>
            <div class="password">
                <span>密码</span>
                <el-input v-model="password" style="width: 240px; margin-left: 14px" type="password"
                    placeholder="Please input password" show-password />
            </div>
            <template #footer>
                <div class="btn-container">
                    <el-button class="btn-left" type="primary">登录</el-button>
                    <el-button class="btn-right" type="primary" text @click="goRegister()">
                        去注册
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    data() {

    },
    name: "login",
    setup() {
        const username = ref('')
        const password = ref('')
        return {
            username,
            password
        }
    },
    methods: {
        goRegister() {
            let title = document.querySelector('.title');
            if (title.innerHTML === '虚拟仿真平台登录入口') {
                this.$router.push({ path: '/register' });
            } else {
                this.$router.push({ path: '/' });
            }
        }
    }
}
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