import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import {baseUrl, transformRequest} from './assets/js/util'

Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.baseUrl = baseUrl
Vue.prototype.transformRequest = transformRequest

// window.$axios = axios;
// Object.defineProperty(Vue.prototype, '$axios', { value: axios });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
