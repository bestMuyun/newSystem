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
            <el-form-item>
                <el-button type="primary" @click="">导出</el-button>
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
            <el-table-column fixed="right" label="操作" width="100">
                <template #header>
                    <el-button size="small" type="primary" @click="addDevice">新增</el-button>
                </template>
                <template #default="scope">
                    <el-button @click="openEdit(scope.row)" link size="small">编辑</el-button>
                    <el-button @click="deleteStudent(scope.row)" link size="small">删除</el-button>
                    <el-button @click="lookup(scope.row)" link size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="设备编辑" v-model="dialogEditEquipment" width="600px">
            <el-form :model="editEquipment">
                <el-form-item label="设备编号" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.equipmentNum" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.equipmentName" autocomplete="off" disable></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.type" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="软件系统" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.softwareOs" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="版本号" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.softwareVersion" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备供应商" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.supplier" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用途" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.usage" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="所在实验室" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.laboratoryId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备状态" :label-width="formLabelWidth">
                    <el-input v-model="editEquipment.status" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogEditEquipment = false">取 消</el-button>
                <el-button type="primary" @click="editEquipmentFun">确 定</el-button>
            </template>
        </el-dialog>

        <el-dialog title="新增设备" v-model="dialogAddEquipment" width="600px">
            <el-form :model="addEquipment">
                <el-form-item label="设备编号" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.equipmentNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.equipmentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="软件系统" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.softwareOs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="版本号" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.softwareVersion" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备供应商" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.supplier" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用途" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.usage" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在实验室" :label-width="formLabelWidth">
                    <el-input v-model="addEquipment.laboratoryId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogEditEquipment = false">取 消</el-button>
                <el-button type="primary" @click="addEquipmentFun">确 定</el-button>
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
    name: "TeacherList",
    setup() {
        const store = useStore();
        const router = useRouter();
        const equipment = reactive({
            equipmentName: '',
            equipmentNum: '',
        });

        const equipment1 = ref([]);

        const formLabelWidth = "100px";

        const dialogEditEquipment = ref(false);
        const dialogAddEquipment = ref(false);

        const editEquipment = reactive({
            equipmentName: '',
            equipmentNum: '',
            type: '',
            softwareOs: '',
            softwareVersion: '',
            supplier: '',
            status: '',
            usage: '',
            laboratoryId: '',
            thumbnailUrl: '',
            createtime: '',
            updatetime: ''
        });

        const addEquipment = reactive({
            equipmentName: '',
            equipmentNum: '',
            type: '',
            softwareOs: '',
            softwareVersion: '',
            supplier: '',
            status: '',
            usage: '',
            laboratoryId: '',
            thumbnailUrl: '',
            createtime: '',
            updatetime: ''
        });
        const searchList = () => {
            axios.post("http://10.17.226.10:8081/equipment/list", equipment).then(res => {
                equipment1.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        }

        const addDevice = () => {
            dialogAddEquipment.value = true;
        };
        const openEdit = (row) => {
            editEquipment.equipmentNum = row.equipmentNum;
            editEquipment.equipmentName = row.equipmentName;
            editEquipment.type = row.type;
            editEquipment.softwareOs = row.softwareOs;
            editEquipment.softwareVersion = row.softwareVersion;
            editEquipment.supplier = row.supplier;
            editEquipment.status = row.status;
            editEquipment.usage = row.usage;
            editEquipment.laboratoryId = row.laboratoryId;
            editEquipment.thumbnailUrl = row.thumbnailUrl;
            editEquipment.createtime = row.createtime;
            editEquipment.updatetime = row.updatetime;
            dialogEditEquipment.value = true;
        }
        const deleteStudent = (row) => {
            ElMessageBox.confirm(`此操作将永久删除<span style='color: red'>${row.equipmentName}</span>设备, 是否继续?`, "设备信息删除", {
                dangerouslyUseHTMLString: true
            }).then(() => {
                axios.delete("http://10.17.226.10:8081/equipment/delete/" + row.equipmentNum).then(res => {
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
        const editEquipmentFun = () => {
            axios.post("http://10.17.226.10:8081/equipment/update", editEquipment).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    dialogAddEquipment.value = false;
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
        const addEquipmentFun = () => {
            axios.post("http://10.17.226.10:8081/equipment/update", addEquipment).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    dialogEditEquipment.value = false;
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
            dialogAddEquipment,
            dialogEditEquipment,
            equipment,
            editEquipment,
            addEquipment,
            addEquipmentFun,
            equipment1,
            openEdit,
            searchList,
            deleteStudent,
            editEquipmentFun,
            onMounted,
            lookup,
            addDevice,
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
