import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from './utils/util'
import api from './utils/api'
import 'view-design/dist/styles/iview.css'
import '@/styles/index.less'
import '@/styles/iconfont/iconfont.css' //使用阿里图标库

// 业务组件全局引用
import { GoodsImg, GoodsTip, SellInfo, PlaceOrder, GoodsInfoText } from 'liby-mobile'
Vue.component('GoodsImg', GoodsImg);
Vue.component('GoodsTip', GoodsTip);
Vue.component('SellInfo', SellInfo);
Vue.component('PlaceOrder', PlaceOrder);
Vue.component('GoodsInfoText', GoodsInfoText);

//阻止启动生产消息
Vue.config.productionTip = false;

//公共方法
Vue.prototype.$util = util;

//公共api
Vue.prototype.$api = api;

//全局引入iview
import ViewUI from 'view-design'
Vue.use(ViewUI);

//引入ajax请求方法
import {post,get,patch,put} from './utils/http'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

//全局注册过滤器
import filters from './utils/filters.js';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
