import { createRouter, createWebHashHistory } from 'vue-router'
import { compile } from 'vue'

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('@/components/login.vue')
}, {
    path: '/register',
    name: 'register',
    component: () => import('@/components/register.vue')
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;