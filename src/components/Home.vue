<template>
  <div class="home">
    <!-- Родительский контейнер с фиксированными размерами -->
    <container>
      <plot-component  @onInteract="onInteract" ref="plotComponent"></plot-component>
    </container>
    <container>
      <point-form @send="send" @updateRadius="updateRadius" ref="pointForm"></point-form>
    </container>
    <container >
    <point-table></point-table>
    </container>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PlotComponent from "@/components/Plot.vue";
import PointForm from "@/components/PointForm.vue";
import Container from "@/components/UI/Container.vue";
import PointTable from "@/components/PointTable.vue";

export default defineComponent({
  components: {PointTable, Container, PointForm, PlotComponent },
  data(){
    return {
      points:[]
    }
  },
  provide: {
    radius: ref(1),
    points: ref([]),
  },
  methods: {
    updateRadius(radius) {
      this.radius = radius;
      this.$refs.plotComponent.updateRadius(radius);
    },
    async sendRequest(url, data) {
      this.error = null; // Сброс ошибки перед отправкой запроса
      try {
        const params = new URLSearchParams(data).toString();
        const fullUrl = `${url}?${params}`;

        const response = await fetch(fullUrl, {
          method: "POST", // Используем GET, так как параметры идут в URL
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${errorText}`);
        }

        const result = await response.json();
        this.result = result.gotIt;
      } catch (error) {
        this.error = error.message; // Отображение ошибки
        console.error(`${error.message}`);
      }
    },
  async send(x,y, radius) {
    // Важно использовать this для обращения к данным в data() компонента
    await this.sendRequest("http://185.195.24.252:80/api/point", {
      x: x,
      y: y,
      r:radius
    });
    console.log(y);
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
      this.sendRequest("http://185.195.24.252:80/api/point", {
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

<style scoped>
.home {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; /* Сделаем выравнивание элементов сверху для мобильных */
  gap: 20px; /* Отступ между элементами */
  flex-wrap: wrap; /* Элементы будут переноситься на новую строку на маленьких экранах */
}

/* Десктопный режим (ширина >= 1062px) */
@media (min-width: 1062px) {
  .home {
    justify-content: flex-start; /* Выравнивание элементов по левому краю */
    align-items: flex-start; /* Элементы будут выровнены по верхнему краю */
  }

  .home > * {
    width: 30%; /* Каждый контейнер будет занимать 30% ширины экрана */
  }
}

/* Планшетный режим (ширина от 771px до 1062px) */
@media (min-width: 771px) and (max-width: 1062px) {
  .home {
    justify-content: flex-start; /* Равномерное распределение элементов с промежутками */
    align-items: flex-start;
  }

  .home > * {
    width: 46%; /* Каждый контейнер будет занимать 48% ширины экрана */
  }
}

/* Мобильный режим (ширина < 771px) */
@media (max-width: 770px) {
  .home {
    flex-direction: column; /* Элементы будут располагаться в колонку */
    justify-content: center; /* Центрируем элементы по вертикали */
    align-items: center; /* Центрируем элементы по горизонтали */
  }

  .home > * {
    width: 100%; /* Каждый контейнер будет занимать всю ширину экрана */
    margin-bottom: 20px; /* Отступы между элементами */
  }
}
</style>