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
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $store.state.orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <ProductItemOrder v-for="el in $store.state.orderInfo.basket.items"
              :key="el.product.id" :id="el.product.id"
              :title="el.product.title" :price="el.price" :quantity="el.quantity" />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
              <b>{{ $store.state.orderInfo.basket.items.length }}</b> товара на сумму
              <b>{{ formatPrice($store.state.orderInfo.totalPrice) }}₽</b>
            </p>
          </div>

          <router-link tag="button" :to="{ name: 'main' }"
            class="cart__button button button--primery" type="submit">
            Перейти на главную
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import ProductItemOrder from '@/components/ProductItemOrder.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: {
    ProductItemOrder,
  },

  created() {
    // если перешли из корзины и инфа есть, то не делаем лишний запрос
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }

    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },

  methods: {
    formatPrice(num) {
      return numberFormat(num);
    },
  },
};
</script>
