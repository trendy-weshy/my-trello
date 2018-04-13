import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
// eslint-disable-next-line
import router from './router';
import store from './store';
import './registerServiceWorker';
import './vuetify';
import '../node_modules/vuetify/src/stylus/app.styl';

sync(store, router, { moduleName: 'RouteModule' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
