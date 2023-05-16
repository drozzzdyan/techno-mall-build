// Создание хранилища на vuex

import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/datas/products';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },

  mutations: {
    addProductToCart(state, { productId, amount }) {
      const cart = state.cartProducts;
      let countProducts = 0;

      for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].productId === productId) {
          cart[i].amount += amount;
          countProducts = 0;
          break;
        } else {
          countProducts += 1;
        }
      }

      if (countProducts === cart.length) {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },

    changeCartProductAmount(state, { productId, amount }) {
      const cart = state.cartProducts;
      cart.find((el) => el.productId === productId).amount = amount;
    },

    deleteCartProductAmount(state, productId) {
      state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
    },
  },

  // похоже на вычисляемое свойство
  getters: {
    cartDetailsProducts(state) {
      // eslint-disable-next-line
      return state.cartProducts.map((item) => {
        return {
          ...item,
          product: products.find((el) => el.id === item.productId),
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
