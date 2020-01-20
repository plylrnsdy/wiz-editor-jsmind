/// <reference path="../../typings/vue-shims.d.ts" />

import Vue from 'vue';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSave, faCogs, faInfo } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Element);

library.add(faSave, faCogs, faInfo);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue({
  el: '#app',
  render: h => h(App)
});
