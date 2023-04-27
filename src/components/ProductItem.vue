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
  </li>
</template>

<script>
export default {
  props: ['product'],
};
</script>
