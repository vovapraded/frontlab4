<template>
  <div class="start-wrapper">
    <!-- Центрируем login-form -->
    <login-form @authenticate="handleAuthenticate" v-show="!auth.currentUser.isAuthenticated"></login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import { auth } from "@/auth.js";

export default {
  name: "Start",
  emits: ["authenticate"], // Объявляем, что компонент эмитирует событие "authenticate"
  computed: {
    auth() {
      return auth;
    },
  },
  components: {
    LoginForm,
  },
  methods: {
    handleAuthenticate(token) {
      this.$emit("authenticate", token);
    },
  },
};
</script>

<style>
/* Базовые стили для стартовой страницы */
.start-wrapper {
  display: flex; /* Включаем Flexbox */
  justify-content: center; /* Центрируем по горизонтали */
  align-items: flex-start; /* Центрируем по вертикали */
  height: 100vh; /* Высота контейнера на весь экран */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* Стиль для формы входа */
.login-form {
  width: 100%;
  max-width: 400px; /* Ограничиваем максимальную ширину для десктопа */
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Медиазапросы */

/* Для мобильных устройств (ширина < 771px) */
@media (max-width: 770px) {
  .start-wrapper {
    padding: 10px; /* Добавляем отступы для мобильных устройств */
  }

  .login-form {
    width: 100%;
    max-width: 100%; /* Форма будет занимать 100% ширины */
    padding: 15px;
  }
}

/* Для планшетов (ширина от 771px до 1062px) */
@media (min-width: 771px) and (max-width: 1062px) {
  .start-wrapper {
    padding: 20px;
  }

  .login-form {
    width: 100%;
    max-width: 90%; /* Ограничиваем ширину до 90% */
    padding: 20px;
  }
}

/* Для десктопов (ширина >= 1062px) */
@media (min-width: 1062px) {
  .start-wrapper {
    padding: 30px;
  }

  .login-form {
    width: 100%;
    max-width: 400px; /* Форма остается 400px для десктопов */
    padding: 25px;
  }
}
</style>