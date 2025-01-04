<template>
  <div class="container">
    <slot></slot>  <!-- Слот для вставки содержимого -->

  </div>
</template>
<script>
  export default {
    name: 'Container',
  }
</script>



<style scoped>
.container {
  display: grid;
  border: teal 2px solid;
  border-radius: 10px;
  padding: 10px;
  place-items: center;
;
}
</style>