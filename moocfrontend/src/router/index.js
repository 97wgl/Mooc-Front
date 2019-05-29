import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/course_detail', // 后面需要加参数
      name: 'course_Detail',
      component: (resolve) => require(['../views/courseDetail.vue'], resolve)
    },
    {
      path: '/sections_detail',
      name: 'sections_detail',
      component: (resolve) => require(['../views/sectionsDetail.vue'], resolve)
    },
    {
      path: '/teacher_login', // 教师和管理员登录
      name: 'teacher_login',
      component: (resolve) => require(['../views/teacher/teacherLogin.vue'], resolve)
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
      path: '/course_detail/:id',
      name: 'course_detail',
      component: (resolve) => require(['../views/teacher/course/courseDetail.vue'], resolve)
    }
  ]
})
