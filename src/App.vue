<template>
  <component :is="currentPageComponent" :page-props="currentPageProps" @gotoPage="(pageName, pageProps) => gotoPage(pageName, pageProps)" />
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Список с отображаемыми компонентами
const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageProps: {},
    };
  },

  methods: {
    gotoPage(pageName, pageProps) {
      this.currentPage = pageName;
      this.currentPageProps = pageProps;
    },
  },

  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },

  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
};
</script>
