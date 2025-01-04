<template>
  <input
      :value="modelValue"
      @input="updateInput"
      :type="inputType"
      class="input"
  >
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number], // Значение может быть строкой или числом
    inputType: {
      type: String,
      default: "text", // Устанавливаем значение по умолчанию
      validator: (value) => ["text", "number", "email", "password", "tel", "url", "date"].includes(value),
    },
    defaultValue: {
      type: [String, Number],
      default: null, // Значение по умолчанию для пустого ввода
    }
  },
  methods: {
    updateInput(e) {
      let value = e.target.value;
      // Преобразуем в число, если тип — number
      if (this.inputType === "number") {
        console.log("aboba") // Это для тестирования
        value = value ? parseFloat(value) : parseFloat(this.defaultValue); // Используем defaultValue, если значение пустое
      } else {
        console.log(this.inputType);
        console.log("non-number input"); // Логирование для других типов
      }
      this.$emit("update:modelValue", value);
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
  border: 1px solid teal;
  box-sizing: border-box; /* Учитываем padding и border в расчете ширины */
}
</style>