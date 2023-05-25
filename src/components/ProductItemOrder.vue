<template>
  <li class="cart__order">
    <h3>{{ title }}</h3>
    <b>{{ format(price) }} ₽ x {{ quantity }}</b>
    <span>Артикул: {{ id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['title', 'price', 'id', 'quantity'],

  methods: {
    format(num) {
      return numberFormat(num);
    },
  },
};
</script>
