<template>
    <div>
        <el-form :inline="true" :model="device" class="demo-form-inline">
            <el-form-item label="设备名称">
                <el-input v-model="device.name" placeholder="请输入设备名称"></el-input>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input v-model="device.account" placeholder="请输入设备编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="devices" stripe style="width: 100%">
            <el-table-column prop="deviceName" label="设备名称">
            </el-table-column>
            <el-table-column prop="" label="类别">
            </el-table-column>
            <el-table-column prop="" label="软件系统">
            </el-table-column>
            <el-table-column prop="" label="版本号">
            </el-table-column>
            <el-table-column prop="" label="设备供应商">
            </el-table-column>
            <el-table-column prop="" label="用途">
            </el-table-column>
            <el-table-column prop="" label="所在实验室">
            </el-table-column>
            <el-table-column prop="" label="设备状态">
            </el-table-column>
            <el-table-column prop="" label="更新时间">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template #header>
                    <el-button size="small" type="primary" @click="addDevice">新增</el-button>
                </template>
                <template #default="scope">
                    <el-button @click="openEdit(scope.row)" link size="small">编辑</el-button>
                    <el-button link size="small" @click="deleteStudent(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "TeacherList",
    methods:{
        addDevice(){
            //新增设备
        }
    },
    setup() {
        const device = reactive({
            deviceName: '',
            sort: '',
            deviceStatus: '',
            updateDate: ''
        });

        const formLabelWidth = "100px";

        const devices = ref([]);

        return {
            device,
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
