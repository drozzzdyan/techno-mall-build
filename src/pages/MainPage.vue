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
        :category-id.sync="filterCategorieId" :color.sync="filterColorId" />
      <section class="catalog">
        <ComponentPreloaderVue v-if="productsLoading" />
        <LoadingError v-if="productsLoadingFailed" />

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
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ComponentPreloaderVue from '@/components/ComponentPreloader.vue';
import LoadingError from '@/components/LoadingError.vue';

import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  // Указываем какие компоненты мы будем подключать
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
    ComponentPreloaderVue,
    LoadingError,
  },

  data() {
    return {
      // данные для фильтрации
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategorieId: 0,
      filterColorId: 0,
      // данные для пагинации
      page: 1,
      productsPerPage: 6,

      // переменная для ответа из http запроса
      productsData: null,

      // индикатор для загрузки данныз с API
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },

  computed: {
    products() {
      // Так как на момент загрузки productsData ещё null
      return this.productsData ? this.productsData.items : [];
    },
    countAllProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  methods: {
    loadProducts() {
      // предотвращаем повторный вызов вотчерами
      clearTimeout(this.loadTimerOut);
      this.loadTimerOut = setTimeout(() => {
        this.productsLoading = true;
        this.productsLoadingFailed = false;
        // этот метод сразу переводит JSON
        axios
          .get(
            `${API_BASE_URL}/api/products`,
            {
              // чтобы не писать огромную строчку из параметров
              params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.filterCategorieId,
                colorId: this.filterColorId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
              },
            },
          )
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },

  created() {
    this.loadProducts();
    this.$store.dispatch('loadCategories');
  },

  // следим за изменениями свойств, чтобы перерисовать страницу при необходиомсти
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategorieId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },

};
</script>
