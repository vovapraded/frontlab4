import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Импорт вашего маршрутизатора

createApp(App)
    .use(router)  // Подключаем маршрутизатор
    .mount('#app');