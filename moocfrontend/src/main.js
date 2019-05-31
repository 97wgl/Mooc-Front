import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import {baseUrl, transformRequest, isLogin, toTreeData} from './assets/js/util'
import store from './store'

Vue.use(iView);
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.prototype.baseUrl = baseUrl
Vue.prototype.isLogin = isLogin
// Vue.prototype.$store = store
Vue.prototype.transformRequest = transformRequest
Vue.prototype.toTreeData = toTreeData

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
