<template>
  <li class="catalog__item">
    <!-- eslint-disable-next-line -->
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id, product: product } }">
      <img :src="product.image.file.url" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      <!-- фильтры используем через | -->
      {{ product.price | numberFormat }} ₽
    </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <!-- eslint-disable-next-line -->
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.code" v-model="nowColor">
          <span class="colors__value" :style="'background-color:' + color.code + ';'">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      nowColor: '',
    };
  },

  props: ['product'],

  // фильтры, которые можно применять к методам
  filters: {
    numberFormat,
  },
};
</script>
