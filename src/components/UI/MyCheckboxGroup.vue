<template>
  <div class="checkbox-group">
    <label
        v-for="(option, index) in options"
        :key="index"
        :class="['checkbox', { checked: isChecked(option) }]"
    >
      <input
          type="checkbox"
          :value="option"
          :checked="isChecked(option)"
          @change="updateInput(option)"
          class="checkbox-input"
      />
      <span class="checkbox-dot"></span> <!-- Точка -->
      <span class="checkbox-label">{{ option }}</span> <!-- Подпись -->
    </label>
  </div>
</template>

<script>
export default {
  name: "MyCheckboxGroup",
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isChecked(value) {
      return this.modelValue === value;
    },

    updateInput(value) {
      // Обновляем значение через v-model
      this.$emit("update:modelValue", this.modelValue === value ? null : value);

      // Эмитируем событие для обновления радиуса в родительском компоненте
    },
  },
};
</script>

<style scoped>
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center; /* Центрируем элементы по горизонтали */
  align-items: center; /* Центрируем элементы по вертикали */
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center; /* Центрируем содержимое внутри чекбокса */
  cursor: pointer;
  text-align: center;
}

.checkbox-input {
  display: none; /* Прячем стандартный чекбокс */
}

.checkbox-dot {
  width: 15px;
  height: 15px;
  background-color: teal;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease;
  margin-right: 7px; /* Отступ от точки */
}

.checkbox.checked .checkbox-dot {
  background-color: green; /* Цвет точки, когда выбрано */
}

/* Равномерное распределение ширины меток для всех значений */
.checkbox-label {
  font-size: 14px;
  color: #333;
  display: inline-block;
  text-align: center; /* Выравнивание текста по центру */
}
</style>