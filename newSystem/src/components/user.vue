<template>
    <el-container>
        <el-header>
            <home-header />
        </el-header>
        <el-container>
            <el-container>
                <el-main id="userMain">
                    <div class="userBack">
                        <el-card style="width: 480px">
                            <el-page-header @back="goBack"><template #content>
                                    <span class="text-large font-600 mr-3"> 返回 </span>
                                </template></el-page-header>
                            <el-divider />
                            <el-descriptions title="个人信息" direction="vertical" :column="3" :size="size" border>
                                <el-descriptions-item label="姓名">{{ userData.name }}</el-descriptions-item>
                                <el-descriptions-item label="用户名">{{ userData.account }}</el-descriptions-item>
                                <el-descriptions-item label="电话号码">{{ userData.phone }}</el-descriptions-item>
                                <el-descriptions-item label="email" :span="2">{{ userData.email
                                    }}</el-descriptions-item>
                                <el-descriptions-item label="身份">
                                    <el-tag>{{ userData.roles[0].roleName }}</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-divider />
                            <el-button round @click="changUserInfo">修改信息</el-button>
                            <el-divider direction="vertical" />
                            <el-button round @click="changePassword">修改密码</el-button>
                        </el-card>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>

    <el-dialog title="修改个人信息" v-model="dialogUserInfo" width="400px">
        <el-form :model="editUserInfo">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="editUserInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="editUserInfo.account" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="email" :label-width="formLabelWidth">
                <el-input v-model="editUserInfo.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input v-model="editUserInfo.phone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogUserInfo = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </template>
    </el-dialog>

    <el-dialog title="修改密码" v-model="dialogPassword" width="400px">
        <el-form :model="editPassword">
            <el-form-item label="请输入原始密码" :label-width="formLabelWidth">
                <el-input v-model="editPassword.password" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" :label-width="formLabelWidth">
                <el-input v-model="editPassword.newPassword" autocomplete="off" type="password"
                    show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" :label-width="formLabelWidth">
                <el-input v-model="editPassword.newPasswordCom" autocomplete="off" type="password"
                    show-password></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogPassword = false">取 消</el-button>
            <el-button type="primary" @click="editUserPassword">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
export default {
    components: {
        HomeHeader
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const userData = ref('');
        const userAccount = reactive({
            account: '',
        });
        const dialogUserInfo = ref(false);
        const dialogPassword = ref(false);

        const editUserInfo = reactive({
            name: '',
            account: '',
            phone: '',
            email: '',
            type: ''
        });
        const editPassword = reactive({
            account: '',
            password: '',
            newPassword: '',
            newPasswordCom: '',
            type: '',
        })
        const userInfo = reactive({
            account: '',
            password: ''
        })
        userData.value = store.state.user;
        const goBack = () => {
            router.push("/hello");
        };

        const getUserInfo = () => {
            editUserInfo.account = userData.value.account;
            editUserInfo.name = userData.value.name;
            editUserInfo.email = userData.value.email;
            editUserInfo.phone = userData.value.phone;
            editUserInfo.type = userData.type;
            userAccount.account = userData.value.account;
        }
        const searchUser = (account) => {
            axios.post("http://10.17.226.10:8081/user/info", account).then(res => {
                if (res.data.code == 200) {
                    userData.value = res.data.data;
                }
            })
        }

        const changUserInfo = () => {
            dialogUserInfo.value = true;
        };
        const changePassword = () => {
            dialogPassword.value = true;
        }

        const editUser = () => {
            axios.post("http://10.17.226.10:8081/user/edit", editUserInfo).then(res => {
                if (res.data.code == 200) {
                    ElMessage.success("提交成功！");
                    searchUser(userAccount);
                    dialogUserInfo.value = false;
                }
            }).catch(err => {
                if (err.response && err.response.data) {
                    ElMessage.error(err.response.data.msg);
                }
            });
        };

        const editUserPassword = () => {
            if (editPassword.newPassword == editPassword.newPasswordCom) {
                userInfo.account = userData.value.account;
                userInfo.password = editPassword.password;
                axios.post("http://10.17.226.10:8081/user/login", userInfo).then(res => {
                    if (res.data.code == 0) {
                        userInfo.password = editPassword.newPassword;
                        axios.post("http://10.17.226.10:8081/user/changepassword", userInfo).then(res => {
                            if (res.data.code == 200) {
                                ElMessage.success("修改成功,请重新登录");
                                dialogPassword.value = false;
                                router.push('/');
                            } else {
                                ElMessage.error(res.data.msg);
                            }
                        })
                    } else {
                        ElMessage.error("原始密码错误");
                    }
                })
            }
        };
        onMounted(() => {
            getUserInfo();
        })


        return {
            userData,
            dialogUserInfo,
            editUserInfo,
            userInfo,
            changUserInfo,
            getUserInfo,
            searchUser,
            changePassword,
            editUserPassword,
            goBack,
            editUser,
            userAccount,
            editPassword,
            dialogPassword,
        }
    }
}

</script>

<style>
#userMain {
    background: url("@/assets/img/user_banground.png") !important;
    background-size: contain;
    background-repeat: no-repeat;
}

.userBack {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60vh;
}
</style>