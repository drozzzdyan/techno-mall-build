// Создание хранилища на vuex

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    cartLoading: false,

    productsCategories: [],

    cartProducts: [],

    // под уникальный номер юзера
    userAccessKey: null,

    // под корзину пользователя
    cartProductsData: [],

    orderInfo: null,
  },

  // в мутациях не должно быть асинхронных операций
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },

    updateProductsCategories(state, categories) {
      state.productsCategories = categories;
    },

    changeCartProductAmount(state, { productId, amount }) {
      const cart = state.cartProducts;
      cart.find((el) => el.productId === productId).amount = amount;
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    // подгоним данные с api под свой формат
    syncCartProducts(state) {
      // eslint-disable-next-line
      state.cartProducts = state.cartProductsData.map((el) => {
        return {
          productId: el.product.id,
          amount: el.quantity,
        };
      });
    },

    syncCartLoading(state, loadState) {
      state.cartLoading = loadState;
    },
  },

  // похоже на вычисляемое свойство
  getters: {
    cartDetailsProducts(state) {
      // eslint-disable-next-line
      return state.cartProducts.map((item) => {
        return {
          ...item,
          product: state.cartProductsData.find((el) => el.product.id === item.productId).product,
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },

  // действия (у них нет ограничений по асинхронности)
  actions: {
    // в contex прилетает всё из этого экземпляра Store (доступны commit и все другие методы)
    loadOrderInfo(contex, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: contex.state.userAccessKey,
          },
        })
        .then((response) => {
          contex.commit('updateOrderInfo', response.data);
        });
    },

    loadCart(contex) {
      contex.commit('syncCartLoading', true);

      // проверим userKey в localtorage
      const userAccessKey = localStorage.getItem('userAccessKey');
      if (userAccessKey !== null) {
        contex.commit('updateUserAccessKey', userAccessKey);
      }

      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: contex.state.userAccessKey,
          },
        })
        .then((response) => {
          // если не было ключа, то записываем его
          if (contex.state.userAccessKey === null) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            contex.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          contex.commit('updateCartProductsData', response.data.items);
          contex.commit('syncCartProducts');
          contex.commit('syncCartLoading', false);
        });
    },

    loadCategories(contex) {
      return axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          contex.commit('updateProductsCategories', response.data.items);
        });
    },

    addProductToCart(contex, { productId, amount }) {
      // добавляем return для возврата promise
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: contex.state.userAccessKey,
          },
        })
        .then((response) => {
          contex.commit('updateCartProductsData', response.data.items);
          contex.commit('syncCartProducts');
        });
    },

    updateCartProductAmount(contex, { productId, amount }) {
      contex.commit('changeCartProductAmount', { productId, amount });

      if (amount < 1) {
        return 0;
      }

      // добавляем return для возврата promise
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: contex.state.userAccessKey,
          },
        })
        .then((response) => {
          contex.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          contex.commit('syncCartProducts');
        });
    },

    deleteCartProduct(contex, productId) {
      // добавляем return для возврата promise
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: contex.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          contex.commit('updateCartProductsData', response.data.items);
          contex.commit('syncCartProducts');
        });
    },
  },
});
