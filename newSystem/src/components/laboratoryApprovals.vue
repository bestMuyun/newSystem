<template>
    <div>
        <div class="title" style="margin-bottom: 20px; color:#303133; font-size: 20px">待审批申请</div>
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
                    <el-button @click="pass(scope.row)" link size="small" type="success">通过</el-button>
                    <el-button @click="notPass(scope.row)" link size="small" type="danger">不通过</el-button>
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
    name: "laboratoryApprovals",
    setup() {

        const approvals = reactive({
            laboratoryNum: '',
            status: '',
        })

        const laboratoryApprovals = ref([]);

        const searchList = () => {
            axios.get("http://10.17.226.10:8081/laboratory/labunderreview").then(res => {
                laboratoryApprovals.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };
        const pass = (row) => {
            approvals.laboratoryNum = row.laboratoryNum
            approvals.status = 1;
            axios.post("http://10.17.226.10:8081/laboratory/reviewlab", approvals).then(res => {
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
        const notPass = (row) => {
            approvals.laboratoryNum = row.laboratoryNum
            approvals.status = 0;
            axios.post("http://10.17.226.10:8081/laboratory/reviewlab", approvals).then(res => {
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
            notPass,
            laboratoryApprovals,
            approvals,
        }
    }
}
</script>
