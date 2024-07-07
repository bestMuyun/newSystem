import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: 'login',
    component: () => import('@/components/login.vue')
}, {
    path: '/register',
    name: 'register',
    component: () => import('@/components/register.vue')
}, {
    path: '/home',
    name: 'home',
    component: () => import("@/components/index.vue"),
    children: [{
        path: "/user/student",
        name: "student",
        component: () => import("@/components/StudentList.vue")
    },
    {
        path: "/user/teacher",
        name: "teacher",
        component: () => import("@/components/TeacherList.vue")
    },
    {
        path: "/role/list",
        name: "role",
        component: () => import("@/components/role/RoleList.vue")
    }, {
        path: "/admin/list",
        name: 'admin',
        component: () => import("@/components/AdminList.vue")
    }, {
        path: "/laboratory/list",
        name: "laboratory",
        component: () => import("@/components/laboratory.vue")
    }, {
        path: "/laboratory/approvals",
        name: "laboratoryApprovals",
        component: () => import("@/components/laboratoryApprovals.vue")
    }]
}, {
    path: "/equipment",
    name: "equipment",
    component: () => import("@/components/equipment.vue")
},
{
    path: "/changePassword",
    name: "changePassword",
    component: () => import("@/components/changePassword.vue")
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;