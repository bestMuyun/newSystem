<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline" style="float: left">
            <el-form-item label="角色名称">
                <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input v-model="form.roleDesc" placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="roles" stripe style="width: 100%">
            <el-table-column prop="roleName" label="角色名称" width="180">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template #header>
                    <el-button size="small" type="primary" @click="showDialog">新增</el-button>
                </template>
                <template #default="scope">
                    <el-button @click="showDialog(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增/编辑弹出框 -->
        <el-dialog :title="addOrEditTitle" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="editForm">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addOrEditRole">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑end -->
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "RoleList",
    data() {
        return {
            form: {
                roleName: "",
                roleDesc: ""
            },
            addOrEditTitle: '',
            roles: [],
            editForm: {
                id: '',
                roleName: '',
                roleDesc: ''
            },
            dialogFormVisible: false,
            formLabelWidth: "70px"
        }
    },
    methods: {
        async searchList() {
            try {
                const res = await axios.post("http://localhost:8081/role/list", this.form);
                if (res.data.code === 200) {
                    this.roles = res.data.data;
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            }
        },
        async deleteRole(row) {
            try {
                await ElMessageBox.confirm("此操作将永久删除该角色, 是否继续?", "提示", {});
                const res = await axios.delete("http://localhost:8081/role/delete/" + row.id);
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    this.searchList();
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
                ElMessage.info("删除已取消");
            }
        },
        async addOrEditRole() {
            if (!this.editForm.roleName) {
                ElMessage.error("角色名称不能为空");
                return;
            }

            try {
                let res;
                if (!this.editForm.id) {
                    // 新增
                    res = await axios.post("http://localhost:8081/role/add", this.editForm);
                } else {
                    // 编辑
                    res = await axios.post("http://localhost:8081/role/edit", this.editForm);
                }
                if (res.data.code === 200) {
                    ElMessage.success(res.data.msg);
                    this.searchList();
                    this.dialogFormVisible = false;
                    return;
                }
                ElMessage.error(res.data.msg);
            } catch (err) {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            }
        },
        showDialog(row = {}) {
            this.addOrEditTitle = "新增角色";
            this.clearEditForm();
            this.dialogFormVisible = true;
            if (row.id) {
                this.addOrEditTitle = "编辑角色";
                this.editForm = { ...row };
            }
        },
        clearEditForm() {
            this.editForm = {
                id: '',
                roleName: '',
                roleDesc: ''
            };
        }
    },
    mounted() {
        this.searchList();
    }
}
</script>

<style scoped></style>
