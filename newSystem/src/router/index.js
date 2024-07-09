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
        path: "/hello",
        name: "hello",
        component: () => import("@/components/hello.vue")
    }, {
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
        path: "/equipment/search",
        name: "equipmentSearch",
        component: () => import("@/components/equipmentSearch.vue")
    }, {
        path: "/equipment/list",
        name: 'laboratoryList.vue',
        component: () => import("@/components/equipmentList.vue")
    }, {
        path: "/laboratory",
        name: "laboratory",
        component: () => import("@/components/laboratory.vue")
    }, {
        path: "/laboratory/approvals",
        name: "laboratoryApprovals",
        component: () => import("@/components/laboratoryApprovals.vue")
    }, {
        path: "/laboratory/stu/list",
        name: "laboratoryStuList",
        component: () => import("@/components/laboratoryStuList.vue")
    }, {
        path: "/laboratory/use",
        name: "laboratoryUse",
        component: () => import("@/components/laboratoryUse.vue")
    }]
}, {
    path: "/equipment",
    name: "equipment",
    component: () => import("@/components/equipment.vue")
},
{
    path: "/user",
    name: "user",
    component: () => import("@/components/user.vue")
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;