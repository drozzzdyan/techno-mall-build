<template>
  <!-- eslint-disable -->
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
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО" :error="formErrors.name" v-model="formDatas.name"
              placeholder="Введите ваше полное имя" />

            <BaseFormText title="Адрес доставки" :error="formErrors.address" v-model="formDatas.address"
              placeholder="Введите ваш адрес" />

            <BaseFormText title="Телефон" :error="formErrors.phone" v-model="formDatas.phone"
              placeholder="Введите ваш телефон" />

            <BaseFormText title="Email" :error="formErrors.email" v-model="formDatas.email"
              placeholder="Введите ваш Email" />

            <BaseFormTextarea title="Комментарий к заказу" v-model="formDatas.comment" :error="formErrors.comment"
              placeholder="Ваши пожелания" />
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <div v-if="!$store.state.cartProducts.length" class="cart__empty">В корзине пусто :(</div>
            <ProductItemOrder v-if="!$store.state.cartLoading" v-for="el in products" :title="el.product.title"
              :key="el.productId" :price="el.product.price" :quantity="el.amount" :id="el.productId" />
          </ul>

          <div v-if="!$store.state.cartLoading && $store.state.cartProducts.length" class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ formatPrice(totalPrice) }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorsMess" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorsMess }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import ProductItemOrder from '@/components/ProductItemOrder.vue';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    ProductItemOrder,
  },

  data() {
    return {
      formDatas: {},
      formErrors: {},
      formErrorsMess: '',
    };
  },

  methods: {
    formatPrice(num) {
      return numberFormat(num);
    },
    order() {
      this.formErrors = {};
      this.formErrorsMess = '';

      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formDatas,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: {
              id: response.data.id,
            },
          });
        })
        .catch((error) => {
          this.formErrors = error.response.data.error.request || {};
          this.formErrorsMess = error.response.data.error.message;
        });
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
