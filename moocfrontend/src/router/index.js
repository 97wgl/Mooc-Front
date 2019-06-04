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
      path: '/index',
      name: 'index',
      component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['../views/register.vue'], resolve)
    },
    {
      path: '/course_detail/:id', // 后面需要加参数
      name: 'course_Detail',
      component: (resolve) => require(['../views/courseDetail.vue'], resolve)
    },
    {
      path: '/sections_detail/:sectionId', // 章节详情
      name: 'sections_detail',
      component: (resolve) => require(['../views/sectionsDetail.vue'], resolve)
    },
    {
      path: '/teacher_login', // 教师和管理员登录
      name: 'teacher_login',
      component: (resolve) => require(['../views/teacher/teacherLogin.vue'], resolve)
    }, 
    {
      path: '/teacher_info', // 教师个人信息管理
      name: 'teacher_info',
      component: (resolve) => require(['../views/teacher/teacherInfo.vue'], resolve)
    }, 
    {
      path: '/course_list', // 课程列表
      name: 'course_list',
      component: (resolve) => require(['../views/teacher/course/courseList.vue'], resolve)
    },
    {
      path: '/course_create', // 课程列表
      name: 'course_create',
      component: (resolve) => require(['../views/teacher/course/courseCreate.vue'], resolve)
    },
    {
      path: '/course_detail_tea/:courseId/:status', // 课程详情
      name: 'course_detail_tea',
      component: (resolve) => require(['../views/teacher/course/courseDetail.vue'], resolve)
    },
    { // 留言列表
      path: '/message_list',
      name: 'message_list',
      meta: {
  
      },
      component: (resolve) => require(['../views/teacher/messageList/messageList.vue'], resolve)
    }
    ,{
      path: '/list',
      component: (resolve) => require(['../views/list.vue'], resolve)
    },
    {
      path: '/myArea',//我的
      component: (resolve) => require(['../views/stuArea.vue'], resolve),
      children: [
        {
            path: '/',
            component: resolve => require(['../components/studyRecord.vue'], resolve)
        },
        {
            path: '/userInfo',
            component: resolve => require(['../components/userInfo.vue'], resolve)
        },
        {
            path: '/modifyPassword',
            component: resolve => require(['../components/modifyPassword.vue'], resolve)
        },
        {
          path: '/my_information',
          component: resolve => require(['../components/myInformation.vue'], resolve)
        }
      ]
    },
    {
      path: '/course_detail/:id',
      name: 'course_detail',
      component: (resolve) => require(['../views/teacher/course/courseDetail.vue'], resolve)
    },
    { //管理员 —— 教师管理
      path: '/teacher_examine',
      component: (resolve) => require(['../views/teacher/teacherExamine.vue'], resolve)
    },
    { //管理员 —— 课程审核
      path: '/course_examine',
      component: (resolve) => require(['../views/teacher/course/courseExamine.vue'], resolve)
    },
    { //教师 —— 个人信息
      path: '/myInfo',
      component: (resolve) => require(['../views/teacher/teacherInfo.vue'], resolve)
    },
    { //教师 —— 评价管理
      path: '/comments_list',
      component: (resolve) => require(['../views/teacher/commentList.vue'], resolve)
    }
  ]
})
