import { createRouter, createWebHistory } from 'vue-router';
import { auth } from './../auth'; // Импортируем глобальное состояние
import Home from '../components/Home.vue';
import Start from '../components/Start.vue';

const routes = [
    {
        path: '/',
        name: 'start',
        component: Start,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true, // Защищенный маршрут
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log(auth)
        if (!auth.currentUser.isAuthenticated) {
            console.warn("Не авторизован!");
            next("/");
        } else {
            console.log("Авторизован!");
            next();
        }
    } else {
        next();
    }
});

export default router;