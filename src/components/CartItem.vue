<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image.file.url" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.productId }}
    </span>

    <CountChanger :counter.sync="amount" />

    <b class="product__price">
      {{ formatPrice(item.amount * item.product.price) }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар"
      @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import CountChanger from '@/components/CountChanger.vue';
// import { mapMutations } from 'vuex';

export default {
  props: ['item'],

  components: {
    CountChanger,
  },

  methods: {
    formatPrice(num) {
      return numberFormat(num);
    },

    // ...mapMutations({ deleteProduct: 'deleteCartProductAmount' }),
    // Тоже самое, что и с помощью mapMutations
    // Создаём, чтобы не создавать много вычисляемых свойств

    deleteProduct(id) {
      this.$store.dispatch(
        'deleteCartProduct',
        id,
      );
    },
  },

  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch(
          'updateCartProductAmount',
          {
            productId: this.item.productId,
            amount: value,
          },
        );
      },
    },
  },
};
</script>
