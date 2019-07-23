import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import bus from './bus';
import './registerServiceWorker';
import VuePageTransition from 'vue-page-transition';

import '@/scss/index.scss';
Vue.use(VuePageTransition);
Vue.config.productionTip = false;

Vue.filter('timeformat', function(time) {
  let second = time % 60; // 秒數
  let minute = Math.floor(time / 60) % 60; // 分鐘
  let hour = Math.floor(Math.floor(time / 60) / 60);
  if (second.toString().length === 1) second = '0' + second.toString();
  if (minute.toString().length === 1) minute = '0' + minute.toString();
  if (hour.toString().length === 1) hour = '0' + hour.toString();
  return `${minute}:${second}`;
});

new Vue({
  data: () => ({ bus: bus }),
  router,
  store,
  render: h => h(App)
}).$mount('#app');
