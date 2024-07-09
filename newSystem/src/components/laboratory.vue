<template>
    <div>
        <el-form :inline="true" :model="laboratoryList" class="demo-form-inline">
            <el-form-item label="实验室名称">
                <el-input v-model="laboratoryList.laboratoryName" placeholder="请输入实验室名称"></el-input>
            </el-form-item>
            <el-form-item label="实验室编号">
                <el-input v-model="laboratoryList.laboratoryNum" placeholder="请输入实验室编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询实验室</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchNull">查询空闲实验室</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="laboratory" stripe style="width: 100%">
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
            <el-table-column prop="status" label="实验室状态">
            </el-table-column>
            <el-table-column prop="user" label="使用人">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #header>
                    <el-button size="small" type="primary" @click="add">新增</el-button>
                </template>
                <template #default="scope">
                    <el-button @click="openEdit(scope.row)" link size="small" type="warning">编辑</el-button>
                    <el-button @click="deleteLaboratory(scope.row)" link size="small" type="danger">删除</el-button>
                    <el-button @click="useOpen(scope.row)" link size="small" type="success">借用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="实验室编辑" v-model="dialogEditLaboratory" width="600px">
            <el-form :model="editLaboratory">
                <el-form-item label="实验室编号" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.laboratoryNum" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="实验室名称" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.laboratoryName" autocomplete="off" disable></el-input>
                </el-form-item>
                <el-form-item label="组织机构" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.organization" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.admin" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.adminPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="工位数" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.workstationNum" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="实验室状态" :label-width="formLabelWidth">
                    <el-select v-model="editLaboratory.status" placeholder="请选择实验室状态">
                        <el-option label="已占用" value="已占用"></el-option>
                        <el-option label="未占用" value="未占用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="使用人" :label-width="formLabelWidth">
                    <el-input v-model="editLaboratory.user" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogEditLaboratory = false">取 消</el-button>
                <el-button type="primary" @click="editLaboratoryFun">确 定</el-button>
            </template>
        </el-dialog>

        <el-dialog title="新增实验室" v-model="dialogAddLaboratory" width="600px">
            <el-form :model="addLaboratory">
                <el-form-item label="实验室编号" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.laboratoryNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="实验室名称" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.laboratoryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组织机构" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.organization" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.admin" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.adminPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="工位数" :label-width="formLabelWidth">
                    <el-input v-model="addLaboratory.workstationNum" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogAddLaboratory = false">取 消</el-button>
                <el-button type="primary" @click="addLaboratoryFun">确 定</el-button>
            </template>
        </el-dialog>

        <el-dialog title="借用实验室" v-model="dialogUseLaboratory" width="600px">
            <el-form :model="useLaboratory">
                <el-form-item label="实验室编号" :label-width="formLabelWidth">
                    <el-input v-model="useLaboratory.laboratoryNum" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="实验室名称" :label-width="formLabelWidth">
                    <el-input v-model="useLaboratory.laboratoryName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="使用人" :label-width="formLabelWidth">
                    <el-input v-model="useLaboratory.user" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogUseLaboratory = false">取 消</el-button>
                <el-button type="primary" @click="useLaboratoryFun">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "laboratory",
    setup() {
        const store = useStore();
        const router = useRouter();

        const laboratory = ref([]);
        const dialogEditLaboratory = ref(false);
        const dialogAddLaboratory = ref(false);
        const dialogUseLaboratory = ref(false);

        const laboratoryList = reactive({
            laboratoryName: '',
            laboratoryNum: '',
        });

        const editLaboratory = reactive({
            laboratoryName: '',
            laboratoryNum: '',
            workstationNum: '',
            createtime: '',
            updatetime: '',
            status: '',
            admin: '',
            adminPhone: '',
            organization: '',
            user: '',
        });

        const addLaboratory = reactive({
            laboratoryName: '',
            laboratoryNum: '',
            workstationNum: '',
            createtime: '',
            updatetime: '',
            status: '',
            admin: '',
            adminPhone: '',
            organization: '',
            user: '',
        });

        const useLaboratory = reactive({
            laboratoryName: '',
            laboratoryNum: '',
            workstationNum: '',
            createtime: '',
            updatetime: '',
            status: '',
            admin: '',
            adminPhone: '',
            organization: '',
            user: '',
        });

        const searchList = () => {
            axios.post("http://10.17.226.10:8081/laboratory/listByCondition", laboratoryList).then(res => {
                laboratory.value = res.data.data;
                console.log(laboratory.value);
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };

        const add = () => {
            dialogAddLaboratory.value = true;
        };
        const deleteLaboratory = (row) => {
            ElMessageBox.confirm(`此操作将永久删除<span style='color: red'>${row.laboratoryName}</span>设备, 是否继续?`, "实验室信息删除", {
                dangerouslyUseHTMLString: true
            }).then(() => {
                axios.delete("http://10.17.226.10:8081/laboratory/" + row.laboratoryNum).then(res => {
                    if (res.data.code === 200) {
                        ElMessage.success(res.data.msg);
                        searchList();
                    } else {
                        ElMessage.error(res.data.msg);
                    }
                }).catch(err => {
                    if (err.response && err.response.data) {
                        ElMessage.error(err.response.data.msg);
                    }
                });
            }).catch(() => {
                ElMessage.info("删除已取消");
            });
        }
        const openEdit = (row) => {
            editLaboratory.laboratoryName = row.laboratoryName;
            editLaboratory.laboratoryNum = row.laboratoryNum;
            editLaboratory.workstationNum = row.workstationNum;
            editLaboratory.status = row.status;
            editLaboratory.admin = row.admin;
            editLaboratory.adminPhone = row.adminPhone;
            editLaboratory.organization = row.organization;
            editLaboratory.user = row.user;
            dialogEditLaboratory.value = true;
        };
        const useOpen = (row) => {
            if (row.status == "未占用") {
                useLaboratory.laboratoryName = row.laboratoryName;
                useLaboratory.laboratoryNum = row.laboratoryNum;
                useLaboratory.workstationNum = row.workstationNum;
                useLaboratory.status = row.status;
                useLaboratory.admin = row.admin;
                useLaboratory.adminPhone = row.adminPhone;
                useLaboratory.organization = row.organization;
                useLaboratory.user = row.user;
                dialogUseLaboratory.value = true;
            } else {
                ElMessage.error(`${row.laboratoryName}已被占用，无法申请`);
            }

        };
        const searchNull = () => {
            axios.get("http://10.17.226.10:8081/laboratory/list").then(res => {
                laboratory.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };

        const editLaboratoryFun = () => {
            axios.post("http://10.17.226.10:8081/laboratory/update", editLaboratory).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    dialogEditLaboratory.value = false;
                    searchList();
                } else {
                    ElMessage.error(res.data.msg);
                }
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };
        const addLaboratoryFun = () => {
            axios.post("http://10.17.226.10:8081/laboratory/add", addLaboratory).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    dialogAddLaboratory.value = false;
                    searchList();
                } else {
                    ElMessage.error(res.data.msg);
                }
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };
        const useLaboratoryFun = () => {
            useLaboratory.status = 2;
            axios.post("http://10.17.226.10:8081/laboratory/update", useLaboratory).then(res => {
                if (res.data.code == 200) {
                    ElMessage.success("申请成功");
                    searchList();
                } else {
                    ElMessage.error("申请失败");
                }
                dialogUseLaboratory.value = false;
            })
        };
        onMounted(() => {
            searchList();
        });

        return {
            add,
            useLaboratory,
            laboratoryList,
            laboratory,
            dialogUseLaboratory,
            dialogEditLaboratory,
            dialogAddLaboratory,
            editLaboratory,
            addLaboratory,
            searchList,
            openEdit,
            searchNull,
            deleteLaboratory,
            editLaboratoryFun,
            addLaboratoryFun,
            useOpen,
            useLaboratoryFun,
        }
    }
}
</script>