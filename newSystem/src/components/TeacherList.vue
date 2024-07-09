<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="教师工号">
                <el-input v-model="form.teacherNo" placeholder="请输入工号"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="users" stripe style="width: 100%">
            <el-table-column prop="teacherNo" label="教师工号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)" link size="small" type="warning">编辑</el-button>
                    <el-button link size="small" type="danger" @click="deleteTeacher(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹出框 -->
        <el-dialog title="教师编辑" v-model="dialogFormVisible" width="600px">
            <el-form :model="editForm">
                <el-form-item label="教师工号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.teacherNo" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autoycomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号类型" :label-width="formLabelWidth">
                    <el-select v-model="editForm.role" placeholder="请选择角色类型">
                        <el-option label="学生" value="student"></el-option>
                        <el-option label="教师" value="teacher"></el-option>
                        <el-option label="管理员" value="admin"></el-option>
                    </el-select>
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
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editUser">确定</el-button>
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
    name: "TeacherList",
    setup() {
        const form = reactive({
            name: '',
            phone: '',
            account: '',
            teacherNo: ''
        });

        const formLabelWidth = "100px";

        const editForm = reactive({
            id: '',
            name: '',
            phone: '',
            account: '',
            email: '',
            teacherNo: '',
            role: '',
            type: '',
        });

        const dialogFormVisible = ref(false); // 默认不显示
        const roleDialogVisible = ref(false);
        const users = ref([]);



        const searchList = async () => {
            try {
                const res = await axios.post("http://10.17.226.10:8081/user/teacher/list", form);
                users.value = res.data.data;
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            }
        };

        const editRoles = async () => {
            try {

                const res = await axios.post("http://10.17.226.10:8081/user/editRoles", roleForm);
                if (res.data.code === 200) {
                    ElMessage.success("修改成功");
                    roleDialogVisible.value = false;
                    searchList(); // 刷新一下数据
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            }
        };

        const handleClick = (row) => {
            dialogFormVisible.value = true;
            editForm.name = row.name;
            editForm.teacherNo = row.teacherNo;
            editForm.email = row.email;
            editForm.account = row.account;
            editForm.phone = row.phone;
            editForm.id = row.userId;
            if (row.type == 0) {
                editForm.role = "admin";
            } else if (row.type == 1) {
                editForm.role = "student";
            } else if (row.type == 2) {
                editForm.role = "teacher";
            }
        };

        const editUser = async () => {
            try {
                if (editForm.role == "admin") {
                    editForm.type = 0;
                } else if (editForm.role == "teacher") {
                    editForm.type = 2;
                } else if (editForm.role == "student") {
                    editForm.type = 1;
                }
                const res = await axios.post("http://10.17.226.10:8081/user/edit", editForm);
                if (res.data.code == 200) { // 正常情况
                    ElMessage.success(res.data.msg);
                    dialogFormVisible.value = false; // 关闭弹出框
                    searchList(); // 刷新页面
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            }
        };

        const deleteTeacher = async (row) => {
            try {
                await ElMessageBox.confirm(`你确定要删除<span style='color: red'><b>${row.name}</b></span>教师吗?`, "提示", {
                    dangerouslyUseHTMLString: true
                });
                const res = await axios.delete(`http://10.17.226.10:8081/user/teacher/delete/${row.id}`);
                if (res.data.code == 200) {
                    ElMessage.success(res.data.msg);
                    searchList();
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
                ElMessage.info(`已取消删除${row.name}`);
            }
        };

        onMounted(async () => {
            searchList();
        });

        return {
            form,
            formLabelWidth,
            editForm,
            dialogFormVisible,
            users,
            searchList,
            editRoles,
            handleClick,
            editUser,
            deleteTeacher
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
