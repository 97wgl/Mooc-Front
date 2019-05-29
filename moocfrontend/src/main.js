import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {baseUrl, transformRequest} from './assets/js/util'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
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
