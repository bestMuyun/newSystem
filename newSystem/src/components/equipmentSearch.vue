<template>
    <div>
        <el-form :inline="true" :model="equipment" class="demo-form-inline">
            <el-form-item label="设备名称">
                <el-input v-model="equipment.equipmentName" placeholder="请输入设备名称"></el-input>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input v-model="equipment.equipmentNum" placeholder="请输入设备编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="equipment1" stripe style="width: 100%">
            <el-table-column prop="equipmentName" label="设备名称">
            </el-table-column>
            <el-table-column prop="type" label="类别">
            </el-table-column>
            <el-table-column prop="softwareOs" label="软件系统">
            </el-table-column>
            <el-table-column prop="softwareVersion" label="版本号">
            </el-table-column>
            <el-table-column prop="supplier" label="设备供应商">
            </el-table-column>
            <el-table-column prop="usage" label="用途">
            </el-table-column>
            <el-table-column prop="laboratoryId" label="所在实验室">
            </el-table-column>
            <el-table-column prop="status" label="设备状态">
            </el-table-column>
            <el-table-column prop="updatetime" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button @click="lookup(scope.row)" link size="small" type="success">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "laboratorySearch",
    setup() {
        const store = useStore();
        const router = useRouter();
        const equipment = reactive({
            equipmentName: '',
            equipmentNum: '',
        });

        const equipment1 = ref([]);

        const formLabelWidth = "100px";

        const searchList = () => {
            axios.post("http://10.17.226.10:8081/equipment/list", equipment).then(res => {
                equipment1.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        }
        const lookup = (row) => {
            axios.post("http://10.17.226.10:8081/equipment/list", { equipmentName: row.equipmentName }).then(res => {
                if (res.data.code == 200) {
                    console.log(res.data.data);
                    store.commit('setEquipment', res.data.data[0]);
                    router.push("/equipment");
                } else {
                    ElMessage.error(res.data.msg);
                }
            })
        };
        onMounted(() => {
            searchList();
        });

        return {
            formLabelWidth,
            equipment,
            equipment1,
            searchList,
            lookup,
        };
    }
};
</script>

<style scoped>
.transfer {
    text-align: left;
    vertical-align: baseline;
}
</style>
