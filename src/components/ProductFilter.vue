<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilter()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label for="#from" class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span id="from" class="form__value">От</span>
        </label>
        <label for="#to" class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span id="to" class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label for="#category" class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="currentCategoryId">
            <option id="category" value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.code">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" :value="color.code" v-model="currentColorCode">
              <span class="colors__value" :style="'background-color:' + color.code">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" @click.prevent="resetFilter()">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorCode: '',

      colorsData: null,
      categoryData: null,
    };
  },

  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],

  computed: {
    categories() {
      return this.$store.state.productsCategories;
    },
    colors() {
      return this.colorsData ? this.colorsData.items.slice(0, -1) : [];
    },
    currentColorId() {
      return this.colorsData ? this.colorsData.items.find((el) => el.code === this.currentColorCode).id : '';
    },
  },

  methods: {
    submitFilter() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColorId);
    },
    resetFilter() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', 0);
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentColorId = 0;
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((responce) => { this.colorsData = responce.data; });
    },
  },

  created() {
    this.loadColors();
  },
};
</script>
