<template>
  <div class="app">
    <!-- Header, растянутый на всю ширину сверху -->
    <header>
      <!-- Header вашего приложения -->
      <MyHeader @exit="exit"/>
        <div class="nav">
          <router-link to="/">Начальная</router-link>
          <router-link v-if="auth.currentUser.isAuthenticated" to="/home">Основная</router-link>
        </div>
    </header>

    <!-- Контент, выводимый через router-view -->
    <main>
      <router-view @authenticate="authenticate"></router-view>
    </main>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';
import {auth} from "@/auth.js";

export default {
  name: 'App',
  computed: {
    auth() {
      return auth
    }
  },
  components: {
    MyHeader,
  },
  data() {
    return {
      intervalId: null,  // Хранение ID интервала
    };
  },
  methods: {
    exit() {
      this.$router.push('/');
      auth.currentUser = {
        token: '',
        isAuthenticated: false,
      };
      this.stopAuthorization()

    },
    authenticate(token){
      console.log('authenticate');
      console.log(token);
      auth.currentUser={
        token: token,
        isAuthenticated: true,
      }
      this.startAuthorization()
    },
    async authorization(){
      console.log('authorization');
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: auth.currentUser.token,
      });
      if (!response.ok || !await response.json()) {
        this.exit()
      }
    },
    startAuthorization() {
      if (!this.intervalId) {  // Проверяем, если интервал еще не был запущен
        this.intervalId = setInterval(this.authorization, 6000); // 60000 миллисекунд = 60 секунд
        console.log('authorization interval started.');
      }
    },

    // Метод для остановки отправки запросов
    stopAuthorization() {
      if (this.intervalId) {
        clearInterval(this.intervalId); // Останавливаем интервал
        this.intervalId = null;  // Обнуляем идентификатор интервала
        console.log('authorization interval stopped.');
      }
    },

  },
  // mounted() {
  //   // Прокручиваем страницу в верх
  //   window.scrollTo(0, 0);
  // },
};
</script>

<style>
/* Стили для Header */
header {
  background-color: teal;
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
  width: 100vw;  /* Растягиваем Header на всю ширину */
  box-sizing: border-box;  /* Учитываем отступы в расчете ширины */
}

/* Навигация */
nav {
  margin-top: 20px; /* Отступ сверху для навигации */
}

.nav {
  display: flex;
  justify-content: center; /* Центрируем ссылки */
  gap: 20px; /* Отступы между ссылками */
}

.nav a {
  text-decoration: none;
  color: white;
}

.nav a:hover {
  text-decoration: underline; /* Эффект наведения на ссылки */
}

/* Стили для основного контента */
.app {
  height: 100vh; /* Растягиваем на всю высоту экрана */
  display: inline-block;
  justify-content: center; /* Центрируем контент по горизонтали */
  align-items: center; /* Центрируем контент по вертикали */
}

/* Убираем отступы на странице */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
main {
  margin-top: 20px;
  margin-left: 20px;
}


</style>