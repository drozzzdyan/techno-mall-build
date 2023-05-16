<template>
  <router-link class="header__cart" aria-label="Корзина товаров" :to="{ name: 'cart' }">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Товары">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {

};
</script>
