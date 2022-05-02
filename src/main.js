import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import axios from 'axios'//引入axios
import qs from 'qs'
import vuetify from './plugins/vuetify'

Vue.prototype.$echarts = echarts

// 解决跨越问题
// 配置代理 config 下的index.js 文件
// 可以参考：https://juejin.cn/post/6844903718085722119
Vue.prototype.$axios = axios.create({
  // 本地
  // baseURL:'http://localhost:8003/',
  // 服务器
  baseURL:'http://127.0.0.1:5000/',
});//把axios挂载到vue上,使用方法为:this.$axios
Vue.prototype.$qs = qs //解决axios的post问题

import AmapVue from '@amap/amap-vue';
AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = 'f93bc0130ba2e65581dd067f234e8adc';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
