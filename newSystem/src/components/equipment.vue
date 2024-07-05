<template>
    <div class="common-layout">
        <el-container class="container">
            <el-header class="header">
                <el-button class="back" @click="goBack">返回</el-button>
                设备详情
            </el-header>
            <el-main class="main">
                <img id="photo" :src="photoUrl" alt="Original Image">
                <div>
                    <h1 class="name">设备名称：{{ equipment.equipmentName }}</h1>
                    <div class="equ">
                        设备编号：{{ equipment.equipmentNum }}<br>
                        所在实验室：{{ equipment.laboratoryId }}<br>
                        设备状态：{{ equipment.status }}
                        类别：{{ equipment.type }}，软件系统：{{ equipment.softwareOs }}，版本号：{{ equipment.softwareVersion
                        }}，设备供应商：{{ equipment.supplier }}
                    </div>
                </div>
            </el-main>
            <el-footer class="footer" :style="{ backgroundImage: `url(${backgroundImage})` }"></el-footer>
        </el-container>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import backgroundImage from '../assets/img/225947-1670079587af3a.jpg';

export default {
    name: "equipment",
    setup() {
        const store = useStore();
        const photoUrl = ref('');
        const equipment = ref('');
        const router = useRouter();
        equipment.value = store.state.Equipment;
        onMounted(() => {
            photoUrl.value = store.state.Equipment.thumbnailUrl;
        });

        const goBack = () => {
            router.push("/admin/list");
        }

        return {
            photoUrl,
            backgroundImage,
            equipment,
            goBack,
        };
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

html,
body,
#app,
.common-layout {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
}

.header {
    height: 60px;
    /* 可以根据需要调整 */
}

.main {
    flex: 1;
    position: relative;
}

.footer {
    height: 30%;
    background-size: cover;
    background-position: center;
}

#photo {
    width: 400px;
    height: 300px;
    object-fit: cover;
    position: absolute;
    left: 12%;
    top: 10%;
}

.name {
    position: absolute;
    top: 10%;
    left: 45%;
}

.equ {
    position: absolute;
    top: 15%;
    left: 40%;
    font-size: 20px;
    width: 500px;
}

.back {
    width: 100px;
    height: 50px;
    position: absolute;
    left: 5px;
    top: 5px;
}
</style>
