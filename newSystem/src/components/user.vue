<template>
    <el-container>
        <el-header>
            <home-header />
        </el-header>
        <el-container>
            <el-container>
                <el-main id="userMain">
                    <div class="userBack">
                        <el-card style="width: 480px">
                            <el-descriptions title="个人信息" direction="vertical" :column="3" :size="size" border>
                                <el-descriptions-item label="姓名">{{ userData.name }}</el-descriptions-item>
                                <el-descriptions-item label="用户名">{{ userData.account }}</el-descriptions-item>
                                <el-descriptions-item label="电话号码">{{ userData.phone }}</el-descriptions-item>
                                <el-descriptions-item label="email" :span="2">{{ userData.email
                                    }}</el-descriptions-item>
                                <el-descriptions-item label="身份">
                                    <el-tag>{{ userData.roles[0].roleName }}</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-divider />
                            <el-button round>修改信息</el-button>
                            <el-divider direction="vertical" />
                            <el-button round>修改密码</el-button>
                        </el-card>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        HomeHeader
    },
    setup() {
        const store = useStore();
        const userData = ref('');
        userData.value = store.state.user;

        return {
            userData
        }
    }
}

</script>

<style>
#userMain {
    background: url("@/assets/img/user_banground.png") !important;
    background-size: contain;
    background-repeat: no-repeat;
}

.userBack {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40vh;
}
</style>