<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: white;
  border: 1px solid paleturquoise;
  border-radius: 5px; /* Добавляет немного сглаживания углов */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень для реалистичности */
  transition: transform 0.2s, box-shadow 0.2s; /* Плавный переход для нажатия */
  cursor: pointer;
  /*;margin: 10px;*/
}

.btn:active {
  transform: translateY(2px); /* Имитация продавливания */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Уменьшаем тень при нажатии */
}
</style>