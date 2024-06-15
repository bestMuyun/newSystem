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
            <div class="username">
                <span>确认密码</span>
                <el-input v-model="username_2" style="width: 240px; margin-left: 0" placeholder="ensure password" />
            </div>
            <br>
            <div class="username">
                <span>email</span>
                <el-input v-model="email" style="width: 240px; margin-left: 20px" placeholder="email" />
            </div>
            <br>
            <div class="username">
                <span>家庭住址</span>
                <el-input v-model="address" style="width: 240px; margin-left: 0" placeholder="address" />
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
    name: "register",
    setup() {
        const username = ref('')
        const password = ref('')
        const username_2 = ref('')
        const email = ref('')
        const address = ref('')
        return {
            username,
            password,
            username_2,
            email,
            address

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