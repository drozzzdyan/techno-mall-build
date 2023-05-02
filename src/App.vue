<template>
  <section class="catalog">
    <ProductList :products="products"></ProductList>
    <!-- Короткая запись, если ничего не указываем внутри блока -->
    <!-- Всё, что написано в cebab case будет само преобразовано в camel case -->
    <AppPagination v-model="page" :current-page.sync="page" :count-all-items="countAllProducts" :items-per-page="productsPerPage" />
  </section>
</template>

<script>
// Импортируем данные и компоненты
import products from './datas/products';
import ProductList from './components/ProductList.vue';
import AppPagination from './components/AppPagination.vue';

export default {
  name: 'app',
  // Указываем какие компоненты мы будем подключать
  components: {
    ProductList,
    AppPagination,
  },

  data() {
    return {
      page: 1,
      productsPerPage: 6,
    };
  },

  computed: {
    products() {
      const firstProductOnPage = (this.page - 1) * this.productsPerPage;
      const lastProductOnPage = firstProductOnPage + this.productsPerPage;
      return products.slice(firstProductOnPage, lastProductOnPage);
    },
    countAllProducts() {
      return products.length;
    },
  },
};
</script>
