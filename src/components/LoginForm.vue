<template>
  <div class="login-form">

  <form @submit.prevent>
    <div>
      <my-input v-model="user.login" inputType="text" placeholder="Логин" />
    </div>
    <div>
      <my-input v-model="user.password" inputType="text" placeholder="Пароль" />
    </div>

    <!-- Блок кнопок -->
    <div class="button-container">
      <my-button @click="login">Войти</my-button>
      <my-button @click="register">Зарегистрироваться</my-button>
    </div>

    <!-- Блок ошибок -->
    <div v-show="error" class="error-message">
      {{ error }}
    </div>
  </form>
  </div>

</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "LoginForm",
  emits: ["authenticate"],
  components: {
    MyInput,
    MyButton,
  },
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
      error: null, // Строка для хранения ошибки
    };
  },

  methods: {
    resetUser() {
      this.user = {
        login: "",
        password: "",
      };
    },

    async sendRequest(url, data) {
      this.error = null; // Сброс ошибки перед отправкой запроса
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // Ожидание текста ошибки
          const errorText = await response.text();
          throw new Error(`${errorText}`);
        }

        const token = await response.text(); // Получаем токен из ответа
        if (token) {
          console.log(token);
          this.$emit("authenticate", token);
          this.resetUser();
        }
      } catch (error) {
        this.error = error.message; // Отображение ошибки
        console.error(`${error.message}`);
      }
    },

    login() {
      console.log(this.user);
      this.sendRequest("http://localhost:8080/login", this.user);
    },

    register() {
      console.log(this.user);
      this.sendRequest("http://localhost:8080/register", this.user);
    },
  },
};
</script>

<style scoped>
/* Стиль кнопок */
.button-container {
  display: flex;
  gap: 10px; /* Отступы между кнопками */
  margin-top: 15px; /* Отступ сверху для блока кнопок */
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>