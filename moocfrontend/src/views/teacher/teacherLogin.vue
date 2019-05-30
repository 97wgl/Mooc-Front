<template lang="jade">
  .login-page
    .board
      Card(style="width:320px", :padding="0", class="login-card")
        .title 登录
        Form(ref="loginForm",
             :model="login",
             :rules="loginValidate",
             label-position="right",
             :label-width="50",
             class="login-form")
          FormItem(label="角色")
            RadioGroup(v-model="login.type")
              Radio(label="teacher") 教师
              Radio(label="admin") 管理员
          FormItem(label="账号", prop="username")
            Input(v-model="login.username", placeholder="请输入账号", ruquired, name="username")
          FormItem(label="密码", prop="password")
            Input(v-model="login.password", type="password", placeholder="请输入密码", @keyup.enter.native="submit()", name="userpwd")
          FormItem
            Button(type="success", @click="submitLogin(login.type)", style="margin-right: 20px;") 登录
</template>

<script>
export default {
  data() {
    return {
      login: {
        type: 'teacher',
        username: '',
        password: ''
      },
      loginValidate: {
        username: [
            { required: true, message: '账号名不得为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() { // 在登录页的时候，将存在本地的Authorization清除
  },
  methods: {
    submitLogin(type) {
      let postData = {
        username: this.login.username,
        password: this.login.password
      }
      this.$http({
        method: 'post',
        url: type == 'teacher' ? this.baseUrl + 'teacher/login' : this.baseUrl + 'admin/login',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          let data = res.data.data
          this.$Message.success(res.data.msg)
          sessionStorage.setItem('Authorization', JSON.stringify(data));
          var route = type == 'teacher' ? '/course_list' : '/course_examine';
          this.$router.push(route);
        }
      })
      
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-page
  position: absolute
  left: 0
  right: 0
  top: 50%
  transform: translateY(-50%)
  -webkit-transform: translateY(-50%)
  .board
    padding: 40px
    background: url("https://static1.keepcdn.com/2017/11/08/1510134228332.jpg") no-repeat center center
    background-size: cover
    overflow: hidden
    position: relative
    &::after
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
      content: ''
      background: rgba(0, 0 , 0, .2)
.login-card
  z-index: 2
  float: right
  .title
    background-image: linear-gradient(-135deg, #57a3f3 0%, #47cb89 100%)
    background-image: -webkit-linear-gradient(-135deg, #57a3f3 0%, #47cb89 100%)
    color: #fff
    padding: 12px 20px
    font-size: 17px
    font-weight: bold
    letter-spacing: 1px
  .login-form
    padding: 20px 20px 0
</style>


