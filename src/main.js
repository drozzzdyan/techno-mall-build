import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { demoConst1, demoConst2 } from './constans';
import alertMessage from './utils';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

alertMessage(demoConst1);
alertMessage(demoConst2);
