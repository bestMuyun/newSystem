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


</script>

<style>
html {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}

.el-header,
.el-footer {
    background-color: #79bbff;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #a0cfff;
    color: #333;
    text-align: center;
    line-height: 200px;
}

#app>.el-container {
    height: 100%;
}

.el-main {
    background-color: #d9ecff;
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
