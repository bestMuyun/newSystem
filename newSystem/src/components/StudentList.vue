<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="form.stuNo" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="users" stripe style="width: 100%">
            <el-table-column prop="stuNo" label="学号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template #default="scope">
                    <el-button @click="openEdit(scope.row)" link size="small">编辑</el-button>
                    <el-button link size="small" @click="deleteStudent(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹出框 -->
        <el-dialog title="学生编辑" v-model="dialogFormVisible" width="600px">
            <el-form :model="editForm">
                <el-form-item label="学生学号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.stuNo" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.account" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </template>
        </el-dialog>
        <!-- 编辑end -->
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "UserList",
    setup() {
        const form = reactive({
            name: '',
            phone: '',
            account: '',
            stuNo: ''
        });

        const dialogFormVisible = ref(false);
        const editForm = reactive({
            id: '',
            name: '',
            email: '',
            phone: '',
            account: '',
            stuNo: ''
        });

        const formLabelWidth = '100px';
        const users = ref([]);

        const searchList = () => {
            axios.post("http://10.17.226.10:8081/user/student/list", form).then(res => {
                users.value = res.data.data;
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };

        const editUser = () => {
            axios.post("http://10.17.226.10:8081/user/edit", editForm).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    dialogFormVisible.value = false;
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

        const openEdit = (row) => {
            editForm.id = row.userId; // 确认使用 row.id 而不是 row.userId
            editForm.name = row.name;
            editForm.phone = row.phone;
            editForm.account = row.account;
            editForm.email = row.email;
            editForm.stuNo = row.stuNo;
            dialogFormVisible.value = true;
        };

        const deleteStudent = (row) => {
            ElMessageBox.confirm(`此操作将永久删除<span style='color: red'>${row.name}</span>学生, 是否继续?`, "学生信息删除", {
                dangerouslyUseHTMLString: true
            }).then(() => {
                axios.delete("http://10.17.226.10:8081/user/student/delete/" + row.id).then(res => {
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
        };

        onMounted(() => {
            searchList();
        });

        return {
            form,
            dialogFormVisible,
            editForm,
            formLabelWidth,
            users,
            searchList,
            editUser,
            openEdit,
            deleteStudent
        };
    }
};
</script>

<style scoped></style>
