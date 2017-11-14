// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueMoment from 'vue-moment';
import VeeValidate from 'vee-validate';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueMoment);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
