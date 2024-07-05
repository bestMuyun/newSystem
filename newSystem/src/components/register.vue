<template>
    <div class="register-container">
        <el-card class="register">
            <template #header>
                <div class="card-header">
                    <span class="title">虚拟仿真平台注册入口</span>
                </div>
            </template>
            <div class="username">
                <span>用户名</span>
                <el-input v-model="username" style="width: 240px; margin-left: 14px;" placeholder="username" />
            </div>
            <br>
            <div class="password">
                <span>密码</span>
                <el-input v-model="password" style="width: 240px; margin-left: 29px; " type="password"
                    placeholder="Please input password" show-password />
            </div>
            <br>
            <div class="confirm-password">
                <span>确认密码</span>
                <el-input v-model="confirmPassword" style="width: 240px; margin-left: 0" type="password"
                    placeholder="confirm password" show-password />
            </div>
            <br>
            <div class="email">
                <span>email</span>
                <el-input v-model="email" style="width: 240px; margin-left: 20px" placeholder="email" />
            </div>
            <br>
            <div class="address">
                <span>电话号码</span>
                <el-input v-model="phone" style="width: 240px; margin-left: 0" placeholder="phone" />
            </div>
            <template #footer>
                <div class="btn-container">
                    <el-button class="btn-left" type="primary" @click="register()">
                        注册
                    </el-button>
                    <el-button class="btn-right" type="primary" text @click="goToLogin()">
                        去登录
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const phone = ref('');

const goToLogin = () => {
    router.push('/');
};

const register = () => {
    // 简化的注册逻辑示例，实际应用中需要进一步验证和调用后端API
    if (password.value !== confirmPassword.value) {
        ElMessage.error('两次输入的密码不一致！');
        return;
    }
    let data = {
        username: username.value,
        password: password.value,
        email: email.value,
        address: phone.value
    }
    // 注册
    axios.post("http://10.17.226.10:8081/user/register", data).then(res => {
        this.$message.success(res.data.msg);
        this.$router.push("/");
    });
    goToLogin();
};
</script>

<style>
.register-container {
    display: grid;
    place-items: center;
    height: 100vh;
}

.register {
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