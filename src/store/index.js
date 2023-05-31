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

    userAccessKey: null,

    cartProductsData: [],

    orderInfo: null,
  },

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

    syncCartProducts(state) {
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

  getters: {
    cartDetailsProducts(state) {
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

  actions: {
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
