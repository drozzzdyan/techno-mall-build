<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.name">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in productsColors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="getColorHex(color)" v-model="currentColor">
          <span class="colors__value" :style="'background-color:' + getColorHex(color) + ';'">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '@/datas/colors';

export default {
  data() {
    return {
      currentColor: '',
      productsColors: this.product.colorsId,
    };
  },
  props: ['product'],
  methods: {
    getColorHex(colorId) {
      return colors.find(el => el.colorId === colorId).colorHex;
    },
  },
};
</script>
