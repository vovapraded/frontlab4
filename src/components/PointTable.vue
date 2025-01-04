<template>
  <div>
    <table border="1">
      <thead>
      <tr>
        <th>ID</th>
        <th>X</th>
        <th>Y</th>
        <th>Radius</th>
        <th>Result</th>
      </tr>
      </thead>
      <tbody>
      <!-- Фильтруем, сортируем и отображаем только первые 10 точек -->
      <tr v-for="(point, index) in filteredAndSortedPoints" :key="index">
        <td>{{ point.id }}</td>
        <td>{{ point.x }}</td>
        <td>{{ point.y }}</td>
        <td>{{ point.r }}</td>
        <td>{{ point.gotIt ? 'Yes' : 'No' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PointTable',
  inject: ['points'],
  computed: {
    filteredAndSortedPoints() {
      // Фильтруем массив, оставляем только те элементы, у которых есть id
      const filteredPoints = this.points.filter(point => point.id !== undefined && point.id !== null);

      // Сортируем по убыванию id и берем только первые 10 элементов
      return filteredPoints
          .sort((a, b) => b.id - a.id)  // Сортировка по убыванию id
          .slice(0, 10);  // Берем только первые 10 точек
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>