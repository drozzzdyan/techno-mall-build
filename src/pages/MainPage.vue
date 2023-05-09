<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategorieId" :color.sync="filterColor" />
      <section class="catalog">
        <ProductList :products="products"></ProductList>
        <!-- Короткая запись, если ничего не указываем внутри блока -->
        <!-- Всё, что написано в cebab case будет само преобразовано в camel case -->
        <AppPagination v-model="page" :current-page.sync="page" :count-all-items="countAllProducts"
          :items-per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
// Импортируем данные и компоненты. @ - содержит абсолютный путь к папке src
import products from '@/datas/products';
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  // Указываем какие компоненты мы будем подключать
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
  },

  data() {
    return {
      // данные для фильтрации
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategorieId: 0,
      filterColor: 0,
      // данные для пагинации
      page: 1,
      productsPerPage: 6,
    };
  },

  computed: {
    filtredProducts() {
      let filtredProducts = products;

      if (this.filterPriceFrom > 0) {
        filtredProducts = filtredProducts.filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filtredProducts = filtredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategorieId > 0) {
        filtredProducts = filtredProducts.filter((product) => product.categorieId === this.filterCategorieId);
      }

      if (this.filterColor > 0) {
        filtredProducts = filtredProducts.filter((product) => product.colorsId.includes(this.filterColor));
      }

      return filtredProducts;
    },
    products() {
      const firstProductOnPage = (this.page - 1) * this.productsPerPage;
      const lastProductOnPage = firstProductOnPage + this.productsPerPage;
      return this.filtredProducts.slice(firstProductOnPage, lastProductOnPage);
    },
    countAllProducts() {
      return this.filtredProducts.length;
    },
  },
};
</script>
