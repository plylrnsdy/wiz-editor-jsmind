/// <reference path="../../typings/vue-shims.d.ts" />

import Vue from 'vue';
import App from './index.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fontawesome from '@fortawesome/fontawesome';
import { faSave, faCogs, faInfo } from '@fortawesome/fontawesome-free-solid';


fontawesome.library.add(faSave, faCogs, faInfo);

Vue.use(Element);

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
