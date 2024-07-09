<template>
    <el-menu :default-openeds="['1']">
        <el-sub-menu v-for="(item, index) in useMenu" :index="(index + 1) + ''" :key="index">
            <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(menu, ix) in item.children" :index="(index + 1) + '-' + ix" :key="ix">
                <router-link :to="menu.path">{{ menu.name }}</router-link>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'HomeMenu',
    setup() {
        const menus = ref([
            {
                name: '用户管理',
                roles: ['admin'],
                children: [
                    {
                        name: '学生列表',
                        path: '/user/student',
                    },
                    {
                        name: '教师列表',
                        path: '/user/teacher',
                    },
                ],
            },
            {
                name: '仿真设备',
                children: [
                    {
                        name: '仿真设备管理',
                        path: '/equipment/list',
                        roles: ['admin', 'teacher']
                    },
                    {
                        name: '仿真设备列表',
                        path: '/equipment/search',
                        roles: ['student']
                    }
                ]
            }, {
                name: '实验室管理',
                roles: ['admin', 'teacher'],
                children: [
                    {
                        name: '实验室管理',
                        path: '/laboratory',
                        roles: ['admin', 'teacher']
                    },
                    {
                        name: '实验室审批',
                        path: '/laboratory/approvals',
                        roles: ['admin', 'teacher']
                    }
                ]
            },
            {
                name: '实验室借用',
                icon: '',
                children: [
                    {
                        name: '实验室借用',
                        path: '/laboratory/stu/list',
                        roles: ['student', 'teacher']
                    },
                    {
                        name: '我的实验室',
                        path: '/laboratory/use',
                    }
                ]
            }
        ]);

        const getMenu = (items, roles) => {
            return items.filter(item => {
                if (item.roles) {
                    const include = includeRole(roles, item.roles);
                    if (!include) {
                        return false;
                    }
                    if (item.children) {
                        item.children = getMenu(item.children, roles);
                    }
                    return true;
                } else {
                    if (item.children) {
                        item.children = getMenu(item.children, roles);
                    }
                    return true;
                }
            });
        };

        const includeRole = (roles, owerRoles) => {
            for (let i = 0; i < roles.length; i++) {
                if (owerRoles.includes(roles[i])) {
                    return true;
                }
            }
            return false;
        };

        const roles = ref(JSON.parse(localStorage.getItem('user_roles')) || []);
        const useMenu = computed(() => getMenu(menus.value, roles.value));

        return {
            menus,
            useMenu,
        };
    },
};
</script>

<style scoped></style>
