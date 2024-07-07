<template>
    <el-container>
        <el-header>
            <home-header />
        </el-header>
        <el-container>
            <el-aside width="190px">
                <home-menu />
            </el-aside>
            <el-container>
                <el-main>
                    <router-view /><!-- 用来路由其他的子页面 -->
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HomeMenu from "@/components/HomeMenu.vue";
import HomeHeader from "@/components/HomeHeader.vue";

const router = useRouter();
const route = useRoute();

onMounted(() => {
    const item = localStorage.getItem("token");
    if (!item) {
        router.push("/");
    }
});
</script>

<style>
html {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

#app>.el-container {
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
}

body>.el-container {
    margin-bottom: 40px;
    height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
