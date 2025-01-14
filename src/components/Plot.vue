<template>
  <div>
    <svg :key="svgKey" ref="mySvg" @click.stop="handleClick" width="200" height="200" viewBox="0 0 100 100" class="svg">
      <g class="grid">
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
      </g>

      <!-- Рендеринг фигур через v-for -->
      <Figure
          v-for="(figure, index) in figures"
          :key="index"
          :type="figure.type"
          :width="figure.width"
          :height="figure.height"
          :multiplier="MULTIPLIER"
          :radius="radius"
      />

      <!-- Рендеринг точек -->
      <Point
          v-for="(point, index) in points"
          :key="index"
          :x="point.x"
          :y="point.y"
          :customClass="point.customClass"
          :r="radius"
      />
    </svg>



  </div>
</template>

<script>
import Point from "./Point.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import Figure from "@/components/Figure.vue";

export default {
  name: "PlotComponent",
  components: {
    MyInput,
    MyButton,
    Point,
    Figure,
  },
  emits: ["onInteract"],
  inject: ["points"],
  data() {
    return {
      error: null, // Сообщение об ошибке
      svgKey: 0, // Ключ для принудительного обновления SVG
      radius: 1,
      MULTIPLIER: 37.5, // Множитель, который передаем дочерним компонентам
    };
  },
  computed: {
    figures() {
      // Создаем массив фигур при каждом изменении svgKey
      return [
        {type: 'rectangle', width: this.radius, height: this.radius},
        {type: 'triangle', width: this.radius, height: this.radius / 2},
        {type: 'quarterCircle', width: this.radius / 2, height: this.radius / 2},
      ];
    },
  },
  methods: {
    updateRadius(radius) {
      this.radius = radius;
      this.updatePlot()
    },
    updatePlot() {
      if (!this.radius || this.radius <= 0) {
        this.radius = 1
        this.error = "Введите корректный радиус";
      }else{
        this.error = null;
        this.updatePoints();
      }
    },

    updatePoints() {
      this.clearPoints();

      this.create4Points(this.radius);
      this.create4Points(this.radius / 2);
      this.createPoint(0, 0, "tick");
      this.getPoints()

      this.svgKey += 1;
    },
    async getPoints() {
      try {
        const response = await fetch("http://185.195.24.252/api/points", {
          method: "GET", // Указываем метод GET
          headers: {
            "Content-Type": "application/json", // Устанавливаем тип данных
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Ошибка при получении точек: ${errorText}`);
        }

        // Обрабатываем JSON-ответ
        const points = await response.json();

        // Добавляем точки с соответствующим классом в зависимости от gotIt
        const processedPoints = points.map((point) => ({
          ...point,
          customClass: point.gotIt ? "point-got" : "point-away", // Присваиваем класс
        }));

        // Добавляем новые точки в массив
        this.points.push(...processedPoints);
      } catch (error) {
        this.error = error.message; // Отображаем ошибку
        console.error(error.message);
      }
    },

    createPoint(x, y, customClass) {
      this.points.push({x, y, customClass});
    },

    create4Points(shift) {
      this.createPoint(shift, 0, "tick");
      this.createPoint(-shift, 0, "tick");
      this.createPoint(0, shift, "tick");
      this.createPoint(0, -shift, "tick");
    },

    clearPoints() {
      this.points = [];
    },
    handleClick(event){
      console.log("Клик зафиксирован!");
      console.log(event,"event")

      // Создаем SVGPoint для хранения координат клика
      const svg = this.$refs.mySvg;
      const point = svg.createSVGPoint();

      // Устанавливаем координаты клика (экранные координаты)
      point.x = event.clientX;
      point.y = event.clientY;
      this.$emit("onInteract", point);

    }


  },
  mounted() {
    this.updateRadius(1);

  }
}
</script>


<style>

svg {
  border: 1px solid black;
  max-width: 100%; /* Максимальная ширина 100% от родителя */
  height: auto; /* Автоматическая высота для сохранения пропорций */
}

svg .grid {
  stroke: gray;
  stroke-width: 0.5;
}

/* Стили для всех элементов с классом 'label' внутри svg */
svg .label {
  font-size: 6px;
  text-anchor: middle;
  dominant-baseline: middle;
  font-weight: normal;
}

svg .figure {
  fill: lightgray;
  stroke: gray; /* Цвет границы */
  stroke-width: 1;
}
</style>