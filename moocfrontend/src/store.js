import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn.js';
moment.locale('zh-cn');

Vue.use(Vuex);

// const arrange = {
//   state: {
//
//
//   },
//   mutations: {
//
//   },
//   actions: {
//
//   },
//   getters: {
//
//   }
// }

const store = new Vuex.Store({
    state: {
      gymList: [],
      gymId: null,
      roomId: null,
      room: null,
      currentWeek: [moment().startOf('week'), moment().endOf('week')],  //当前周
      freezeDate: '', // 用来展示【复制上周课表按钮】，只赋值一次
      user: {
        username: null,   // 登录用户名
        type: null        // 角色
      },
      equipment: {
        equipmentId: null,
        equipmentName: null
      }
    },
    //plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    getters: {
      currentGym: state => {
        return _.find(state.gymList, {gym: {id: state.gymId}})
      },
    },
    mutations: {
      setGymList(state, payload) {
        state.gymList = payload;
      },
      setGymId(state, payload) {
        state.gymId = payload;
      },
      setRoomId(state, payload) {
        state.roomId = payload;
      },
      setRoom(state, payload) {
        state.room = payload;
      },
      setUser(state, payload) {
        state.user = payload
      },
      setEquipment(state, payload) {
        state.equipment = payload
      },
      setCurrentWeek(state, payload) {
        state.currentWeek = payload
      },
      setFreezeDate(state, payload) {
        state.freezeDate = payload
      }
    },
    actions: {
      fetchGymList(context) {
        axios.get(`${api_host}/lego/manage/gym/list`).then((res) => {
          let gymList = res.data.data;
          let state = context.state;
          if (!state.gymId) {
            context.commit('setGymId', gymList[0].gym.id)
          }
          if (!state.roomId) {
            context.commit('setRoom', gymList[0].roomList[0]);
            context.commit('setRoomId', gymList[0].roomList[0].id);
          }

          context.commit('setGymList', gymList)
        });
      }
    },
    modules: {

    }
});

export default store;