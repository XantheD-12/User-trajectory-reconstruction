import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'//引入axios
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.prototype.$axios = axios

window._AMapSecurityConfig = {
  securityJsCode:"c36025964916f58d0c51d412f23fd016" // 您申请的安全密钥
};
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
