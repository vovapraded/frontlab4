<template>
  <div class="home">
    <!-- Родительский контейнер с фиксированными размерами -->
    <container>
      <plot-component @onInteract="onInteract" ref="plotComponent"></plot-component>
    </container>
    <container>
      <point-form @updateRadius="updateRadius" ref="pointForm"></point-form>
    </container>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PlotComponent from "@/components/Plot.vue";
import PointForm from "@/components/PointForm.vue";
import Container from "@/components/UI/Container.vue";

export default defineComponent({
  components: {Container, PointForm, PlotComponent },
  provide: {
    radius: ref(1),
  },
  methods: {
    updateRadius(radius) {
      this.radius = radius;
      this.$refs.plotComponent.updateRadius(radius);
    },
    onSendClick() {
      this.$refs.plotComponent.updatePlot();
    },
    onInteract(point){
      const svg = this.$refs.plotComponent.$refs.mySvg;
      console.log("aboba",point)

      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

      const viewBox = svg.viewBox.baseVal;
      const x = ((svgPoint.x - viewBox.width / 2) / this.$refs.plotComponent.MULTIPLIER * this.$refs.pointForm.radius).toFixed(2);  // Масштабируем координаты X
      const y = (-(svgPoint.y - viewBox.height / 2) / this.$refs.plotComponent.MULTIPLIER * this.$refs.pointForm.radius).toFixed(2);
      console.log("aboba2",x,y)
      this.$refs.pointForm.sendRequest("http://localhost:8080/point", {
        x:x,
        y:y,
        r: this.$refs.pointForm.radius
      });
      setTimeout(() => {
        this.$refs.plotComponent.updatePlot();
      }, 500) // Задержка 1000 миллисекунд (1 секунда)    }
  }
}
});
</script>

<style>
.home {
  display: flex; /* Используем Flexbox для выравнивания элементов в строку */
  justify-content: flex-start; /* Выравнивание элементов по левому краю */
  align-items: center; /* Выравнивание по центру по вертикали */
  gap: 20px; /* Отступ между элементами */
}


</style>