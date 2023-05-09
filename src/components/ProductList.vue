<template>
  <ul class="catalog__list">
    <!-- Реагируем на событие вызванное в productItem, и пользуемся анонимной функцией, чтобы принять два параметра и передать их -->
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <ProductItem :product="product"></ProductItem>
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>
