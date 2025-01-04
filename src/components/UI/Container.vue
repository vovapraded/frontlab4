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



<style >
.container {
  display: flex;
  border: teal 2px solid;
  border-radius: 10px;
  padding: 10px;
;
}
</style>