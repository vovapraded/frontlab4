<template>
  <form @submit.prevent>
    <!-- Используем v-model для привязки радиуса -->
    <label>R:</label>
    <my-checkbox-group
        v-model="radius"
        :options="checkboxOptions"
        @update:modelValue="handleRadiusChange"
    />

    <!-- Контейнер для сообщения (ошибки или радиуса) -->
    <div class="message-container">
      <p v-if="!errorRadius">Выбранный радиус: {{ radius }}</p>
      <div v-if="errorRadius" class="error-message">
        {{ errorRadius }}
      </div>
    </div>

    <!-- Отступы для метки x -->
    <label>x:</label>
    <my-checkbox-group
        v-model="x"
        :options="checkboxOptions"
    />

    <!-- Отступы для метки y -->
    <label>y:</label>
    <my-input v-model="y" inputType="number" placeholder="y"/>
    <div/>
    <my-button @click="handleSend">Отправить</my-button>
    <div class="message-container">
      <p v-if="!error">Результат: {{ result }}</p>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import MyCheckboxGroup from "@/components/UI/MyCheckboxGroup.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default defineComponent({
  components: { MyButton, MyInput, MyCheckboxGroup },
  methods: {

    handleRadiusChange(radius) {
      if (!radius || radius <= 0) {
        this.radius = 1;
        this.errorRadius = "Радиус должен быть больше 0!";
      } else {
        this.errorRadius = null;
      }
      this.$emit("updateRadius", radius);
    },
    handleSend() {
      console.log("клик произошёл");
      this.$emit("send",this.x,this.y,this.radius);
    }
  },
  data() {
    return {
      radius: 1,
      x: 0,
      y: 0,
      errorRadius: null,
      error:null,
      result: null,
    };
  },
  setup() {
    const checkboxOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    return {
      checkboxOptions,
    };
  },
});
</script>

<style scoped>
/* Общие стили для контейнера сообщения */
.message-container {
  display: flex;
  justify-content: center; /* Центрируем содержимое по горизонтали */
  align-items: center; /* Центрируем содержимое по вертикали */
  height: 30px; /* Задаем высоту контейнера для сообщений */
  margin-top: 10px; /* Отступ сверху для отделения от чекбоксов */
}

/* Стили для ошибки */
.error-message {
  color: red;
}

/* Общие стили для метки label */
label {
  display: block; /* Обеспечиваем, чтобы метки располагались на новой строке */
  margin-top: 15px; /* Отступ сверху */
  margin-bottom: 5px; /* Отступ снизу для разделения от элемента */
  font-size: 14px; /* Размер шрифта */
  color: #333; /* Цвет текста */
}

/* Стили для обычного текста p */
p {
  color: black;
}

</style>