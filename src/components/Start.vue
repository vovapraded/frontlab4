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

<style scoped>
/* Центрирование login-form */
.start-wrapper {
  display: flex; /* Включаем Flexbox */
  justify-content: center; /* Центрируем по горизонтали */
  align-items: center; /* Центрируем по вертикали */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>