import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper)

import axios from 'axios'
Vue.use(axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
      path: '/list',
      component: (resolve) => require(['../views/list.vue'], resolve)
    },
  ]
})
