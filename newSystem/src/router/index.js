import { createRouter, createWebHashHistory } from 'vue-router'
import { compile } from 'vue'
import Home from "../components/index.vue"

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
    component: Home,
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
    }]
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;