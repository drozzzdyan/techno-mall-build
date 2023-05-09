<template>
  <component :is="currentPageComponent" :page-props="currentPageProps" />
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import eventBus from './eventBus';

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

  // хук жизненного цикла
  created() {
    // тлавливаем событие из шины событий, первый параметр - название события, второй - исполняемая функция
    eventBus.$on('gotoPage', (pageName, pageProps) => this.gotoPage(pageName, pageProps));
  },
};
</script>
