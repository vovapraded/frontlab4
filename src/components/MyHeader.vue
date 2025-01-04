<template>
  <div class="header">
    <!-- Используем v-show, чтобы скрыть таблицу, но оставить её в DOM -->

    <table v-show="!isCollapsed" class="table">
      <thead>
      <tr>
        <th>ФИО</th>
        <th>Номер группы</th>
        <th>Номер варианта</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Прадед Владимир Владимирович</td>
        <td>P3206</td>
        <td>115225</td>
      </tr>
      </tbody>
    </table>

    <div class="button-box">
      <my-button  @click="toggleTable">
        {{ isCollapsed ? 'Показать таблицу' : 'Скрыть таблицу' }}
      </my-button>
      <my-button v-if="auth.currentUser.isAuthenticated" @click="exit">
        Выход
      </my-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MyButton from "@/components/UI/MyButton.vue";
import { auth } from "@/auth.js";

export default defineComponent({
  data() {
    return {
      isCollapsed: false, // Состояние таблицы: свёрнуто или нет
    };
  },
  computed: {
    auth() {
      return auth;
    },
  },
  components: { MyButton },
  emits: ["exit"],
  props: {
    currentUser: Object,
  },
  methods: {
    exit() {
      this.$emit("exit");
    },
    toggleTable() {
      this.isCollapsed = !this.isCollapsed; // Переключаем состояние
    },
  },
});
</script>

<style scoped>
/* Общий стиль таблицы */
table {
  width: 100%; /* Ширина таблицы на всю страницу */
  height: auto;
  text-align: center;
  border-collapse: collapse;
  table-layout: fixed;
  transition: opacity 0.5s ease; /* Плавное скрытие */
}

th, td {
  color: hwb(0 40% 100%);
  padding: 10px;
  border: 1px solid grey;
}

th {
  background-color: #4caf50;
}
td {
  background-color: lightgreen;
}

/* Контейнер кнопок */
.button-box {
  width: 100%; /* Ширина на всю доступную область */
  text-align: right;
  display: inline-block;
  box-sizing: border-box;
  padding-top: 10px;
  transition: margin-top 0.3s ease;
}

/* Стили для хедера */
.header {
  width: 100%;
}
</style>