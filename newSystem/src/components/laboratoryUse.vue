<template>
    <div>
        <div class="title" style="margin-bottom: 20px; color:#303133; font-size: 20px">我的实验室</div>
        <el-table :data="laboratoryApprovals" stripe style="width: 100%">
            <el-table-column prop="laboratoryNum" label="实验室编号">
            </el-table-column>
            <el-table-column prop="laboratoryName" label="实验室名称">
            </el-table-column>
            <el-table-column prop="organization" label="组织机构">
            </el-table-column>
            <el-table-column prop="admin" label="负责人">
            </el-table-column>
            <el-table-column prop="adminPhone" label="联系电话">
            </el-table-column>
            <el-table-column prop="workstationNum" label="工位数">
            </el-table-column>
            <el-table-column prop="user" label="借用人">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button @click="pass(scope.row)" link size="small" type="success">归还</el-button>
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
    name: "laboratoryUse",
    setup() {
        const store = useStore();
        const labUser = ref();
        labUser.value = store.state.user;
        const approvals = reactive({
            laboratoryNum: '',
            status: '',
            user: '',
        })

        const laboratoryApprovals = ref([]);

        const searchList = () => {
            axios.post("http://10.17.226.10:8081/laboratory/borrowed", { user: labUser.value.name }).then(res => {
                laboratoryApprovals.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };
        const pass = (row) => {
            axios.post("http://10.17.226.10:8081/laboratory/returnLaboratory", { laboratoryNum: row.laboratoryNum }).then(res => {
                if (res.data.code == 200) {
                    ElMessage.success("操作成功");
                    searchList();
                }
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };
        onMounted(() => {
            searchList();
        });

        return {
            searchList,
            pass,
            labUser,
            laboratoryApprovals,
            approvals,
        }
    }
}
</script>
