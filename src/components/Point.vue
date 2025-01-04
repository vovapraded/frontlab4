<template>
  <svg>
    <!-- Текст с вычисленным содержимым -->
    <text :x="cx + 2" :y="cy - 2" class="point-text">{{ textContent }}</text>
    <!-- Круг -->
    <circle
        :class="customClass"
        :cx="cx"
        :cy="cy"
        r="2">
    </circle>
  </svg>
</template>

<script>
export default {
  name: "Point",
  props: {
    x: {
      type: Number, // Координата X в пользовательской системе координат
      required: true,
    },
    y: {
      type: Number, // Координата Y в пользовательской системе координат
      required: true,
    },
    customClass: {
      type: String, // Имя CSS-класса для оформления
      default: "",
    },
    r: {
      type: Number, // Радиус графика (масштабирование)
      required: true,
    },
  },
  data() {
    return {
      textContent: "", // Текст подписи для точки
      cx: 0, // Преобразованная координата X для SVG
      cy: 0, // Преобразованная координата Y для SVG
    };
  },
  methods: {
    // Метод для нахождения максимального по модулю числа
    maxByAbsolute(a, b) {
      return Math.abs(a) > Math.abs(b) ? a : b;
    },

    // Метод для вычисления текста
    calculateTextContent() {
      if (this.customClass === "tick") {
        this.textContent = this.maxByAbsolute(this.x, this.y); // Подпись для "tick"
      } else {
        this.textContent = `(${this.x}, ${this.y})`; // Подпись для остальных случаев
      }
    },

    // Метод для преобразования пользовательских координат в SVG-координаты
    calculateCxCy(x, y) {
      const viewBoxSize = 100; // Размер viewBox (должен соответствовать масштабу SVG)
      const scale =  37.5 / this.r ; // Масштабирование относительно радиуса

      // Преобразование координат
      this.cx = x * scale + viewBoxSize / 2;
      this.cy = viewBoxSize / 2 - y * scale;
    },
  },
  created() {
    // Вычисляем текст и координаты при создании компонента
    this.calculateTextContent();
    this.calculateCxCy(this.x, this.y);
  },
};
</script>

<style scoped>
/* Стили текста */
svg .point-text {
  font-size: 6px; /* Уменьшаем текст */
  fill: gray; /* Цвет текста */
  text-anchor: start; /* Привязываем текст к началу координаты */
  dominant-baseline: central; /* Вертикальное выравнивание */
  font-family: Arial, sans-serif; /* Шрифт Arial */
  font-weight: bold; /* Жирный текст */
}

/* Стили точек для разных классов */
svg .tick {
  fill: black;
}
svg .point-away {
  fill: blue;
}
svg .point-got {
  fill: red;
}
</style>