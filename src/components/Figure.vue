<template>
  <path :d="pathData" class="figure" />
</template>

<script>
export default {
  name: "Figure",
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    multiplier: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pathData() {
      // В зависимости от типа фигуры возвращаем нужную команду path
      switch (this.type) {
        case 'rectangle':
          return this.getRectanglePath();
        case 'triangle':
          return this.getTrianglePath();
        case 'quarterCircle':
          return this.getQuarterCirclePath();
        default:
          return '';
      }
    },
  },
  methods: {
    // Получаем путь для прямоугольника
    getRectanglePath() {
      let width = this.width * this.multiplier / this.radius;
      let height = this.height * this.multiplier / this.radius;
      console.log("rad",this.radius)
      return `M 50 50
              L ${50 + width} 50
              L ${50 + width} ${50 - height}
              L 50 ${50 - height}
              Z`;
    },
    // Получаем путь для треугольника
    getTrianglePath() {
      let bigCatheter = this.width;
      let smallCatheter = this.height;
      return `M 50 50
              L 50 ${50 - smallCatheter * this.multiplier / this.radius}
              L ${50 - bigCatheter * this.multiplier / this.radius} 50
              Z`;
    },
    // Получаем путь для четверти круга
    getQuarterCirclePath() {
      return `M 50 50
              L ${50 - this.multiplier / 2} 50
              A ${this.multiplier / 2} ${this.multiplier / 2} 0 0 0 50 ${50 + this.multiplier / 2}
              Z`;
    },
  },
};
</script>

<style scoped>
.figure {
  fill: lightgray;
  stroke: gray;
  stroke-width: 1;
}
</style>