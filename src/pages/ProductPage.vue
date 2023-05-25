<template>
  <main class="content container">
    <div v-if="!productLoading" class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <ComponentPreloader v-if="productLoading" />
      <LoadingError v-if="productLoadingFailed" />

      <div v-if="!productLoading" class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <div class="item__row">
              <CountChanger :counter.sync="productAmount" />

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Товар добавлется...</div>

          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Какое-то описание товара
          </p>

          <h3>Дизайн</h3>

          <p>
            Ещё описание товара
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import CountChanger from '@/components/CountChanger.vue';
import ComponentPreloader from '@/components/ComponentPreloader.vue';
import LoadingError from '@/components/LoadingError.vue';

import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    CountChanger,
    ComponentPreloader,
    LoadingError,
  },

  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },

  computed: {
    product() {
      return this.productData ? this.productData : {};
    },
    category() {
      return this.productData ? this.productData.category : {};
    },
  },

  methods: {
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      // передаём 2 аргумента: название мутации и значение
      this.$store
        .dispatch(
          'addProductToCart',
          {
            productId: this.product.id,
            amount: this.productAmount,
          },
        )
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
          const timeout = setTimeout(() => {
            this.productAdded = false;
            clearTimeout(timeout);
          }, 2000);
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;

      // из роутера берём параметры и вытаскиваем id
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => { this.productData = response.data; })
        .catch(() => { this.productLoadingFailed = true; })
        .then(() => { this.productLoading = false; });
    },
  },

  created() {
    this.loadProduct();
  },

  // ставим наблюдатель на динамический сегмент роутера
  watch: {
    // eslint-disable-next-line
    '$route.params.id'() {
      this.loadProduct();
    },
  },

  // во vue 3 уже не существует
  filters: {
    numberFormat,
  },
};
</script>
