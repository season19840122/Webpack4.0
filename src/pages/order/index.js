// 框架库部分
import 'es6-promise/auto'; // 最优先引用的，否则 IE 会报没有 promise
import '@styles/lib/base.scss';
import '@styles/lib/common.scss';
import Vue from 'vue';
import store from '../../store';
import { DatePicker, Select, Pagination } from 'ant-design-vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Cookies from 'js-cookie';
// 逻辑部分
// 独立成一个文件，或者放在 common 里
// import axios from '@scripts/lib/axios/json'; // 本地
import axios from '@scripts/lib/axios/interface'; // 线上
import common from '@scripts/lib/common';
import '@scripts/lib/vue-filter';
import Tpl from './index.vue';
// IE polyfill
import '@babel/polyfill';
Object.setPrototypeOf = require('setprototypeof');

Vue.config.productionTip = false;
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Pagination);

// 全局挂载
window.$ = $;
window.axios = axios;
window.common = common;
window.Cookies = Cookies;

new Vue({
  store,
  render: h => h(Tpl),
}).$mount('#app');
