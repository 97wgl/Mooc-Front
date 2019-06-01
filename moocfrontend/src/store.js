import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn.js';
moment.locale('zh-cn');

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({
    state: {
      userInfo: {
        username: '',   // 登录用户名
        type: '',        // 角色
        id: '' // id
      },
    },
    mutations: {
      setUser(state, payload) {
        state.userInfo = payload
      },
    },
    actions: {
    },
    modules: {

    }
});

export default store;