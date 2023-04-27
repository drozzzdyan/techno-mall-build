<template>
  <section class="catalog">
    <ProductList :products="products"></ProductList>
  </section>
</template>

<script>
// Импортируем данные и компоненты
import products from './datas/products';
import ProductList from './components/ProductList.vue';

export default {
  name: 'app',
  // Указываем какие компоненты мы будем подключать
  components: {
    ProductList,
  },
  data() {
    return {
      products,
    };
  },
};
</script>
