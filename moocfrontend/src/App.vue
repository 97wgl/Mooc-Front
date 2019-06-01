<template>
  <div id="app">
    <div class="f-header">
      <div class="f-header-box clearfix">
        <a href="/yourmooc/" class="logo" title="在线教育平台--yourmooc"></a>
        <nav class="header-nav" v-if="userInfo.type == 'user'">
          <span class="header-nav-item" @click="$router.push('/index')">首页</span>
          <span class="header-nav-item" @click="$router.push('/list')">分类</span>
          <span class="header-nav-item" @click="$router.push('/myArea')">我的</span>
        </nav>
        <nav class="header-nav" v-if="userInfo.type == 'teacher'">
          <span class="header-nav-item" @click="$router.push('/course_list')">课程管理</span>
          <span class="header-nav-item" @click="$router.push('/comments_list')">评价管理</span>
          <span class="header-nav-item" @click="$router.push('/message_list')">留言管理</span>
          <span class="header-nav-item" @click="$router.push('/my_information')">个人信息管理</span>
        </nav>
        <nav class="header-nav" v-if="userInfo.type == 'admin'">
          <span class="header-nav-item" @click="$router.push('/course_examine')">课程管理</span>
          <span class="header-nav-item" @click="$router.push('/teacher_examine')">教师管理</span>
        </nav>
        <nav>
           <span style="margin-top: 30px;" class="header-nav-item" @click="$router.push('/login')" v-if="!this.$store.state.userInfo.username">用户登录</span>
        </nav>
        <nav>
          <span class="header-nav-item" style="float: right; margin-top: 30px;" @click="logout" v-if="this.$store.state.userInfo.username"> 退出登录 </span>
        </nav>
        <nav>
          <span class="header-nav-item" style="float: right; margin-top: 30px;"> {{this.$store.state.userInfo.username }}</span>
        </nav>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户看得到这个表头
      userInfo: null
    }
  },
  created() { // 每次刷新页面，执行以下代码
    // 检验进入任何页面之前是否有登录，如果登录了，那么存入Authorization
     if (sessionStorage.getItem('Authorization')) { // 如果登陆了
      this.userInfo = JSON.parse(sessionStorage.getItem('Authorization')); // 拿到登录返回的结果，
     }else { // 未登录 默认为用户界面
      this.userInfo = {
        type: 'user'
      }
      this.gotoLogin();
     }
     console.log('userInfo', this.$store.state.userInfo)
  },
  methods: {
    // 跳转到登录界面
    gotoLogin() {
      sessionStorage.removeItem('Authorization');
      this.userInfo = {
        type: 'user'
      }
      this.$router.push('/index');
    },
    // // 注销
    logout() {
      this.gotoLogin();
        this.$store.commit("setUser", {
          username: '',
          type: '',
          id: ''
        })
    },
  },
}
</script>

<style>
@import url(../static/css/reset.css)
</style>
