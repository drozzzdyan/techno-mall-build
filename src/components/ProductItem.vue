<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.name">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">
      <!-- фильтры используем через | -->
      {{ product.price | numberFormat }} ₽
    </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in productsColors" :key="color">
        <label for="#color" class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="hex(color)" v-model="nowColor">
          <span id="color" class="colors__value" :style="'background-color:' + hex(color) + ';'">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '@/datas/colors';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      nowColor: '',
      productsColors: this.product.colorsId,
    };
  },

  props: ['product'],

  methods: {
    gotoPage,
    hex(colorId) {
      return colors.find((el) => el.colorId === colorId).colorHex;
    },
  },

  // фильтры, которые можно применять к методам
  filters: {
    numberFormat,
  },
};
</script>
