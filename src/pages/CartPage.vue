<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <ComponentPreloader v-if="$store.state.cartLoading" />

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem :item="item" v-for="item in products" :key="item.productId" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            <ComponentPreloader v-if="$store.state.cartLoading" />

            Итого: <span>{{ formatPrice(totalPrice) }} ₽</span>
          </p>

          <router-link v-if="products.length > 0" tag="button" :to="{ name: 'order' }"
            class="cart__button button button--primery">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import ComponentPreloader from '@/components/ComponentPreloader.vue';

export default {
  data() {
    return {
      counterProducts: 1,
    };
  },

  components: {
    CartItem,
    ComponentPreloader,
  },

  methods: {
    formatPrice(num) {
      return numberFormat(num);
    },
  },

  computed: {
    products() {
      return this.$store.getters.cartDetailsProducts;
    },

    totalPrice() {
      return this.$store.getters.cartTotalPrice;
    },
  },
};
</script>
