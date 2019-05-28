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
              Radio(label="user") 用户
              Radio(label="admin") 健身房管理员
              Radio(label="coach") 教练
          FormItem(label="账号", prop="username")
            Input(v-model="login.username", placeholder="请输入账号", ruquired, name="username")
          FormItem(label="密码", prop="password")
            Input(v-model="login.password", type="password", placeholder="请输入密码", @keyup.enter.native="submit()", name="userpwd")
          FormItem
            Button(type="success", @click="submitLogin()", style="margin-right: 20px;") 登录
            Button(type="success", @click="registSubmit()") 注册
</template>

<script>

export default {
  data() {
    return {
      login: {
        type: 'user',
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
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  created() { // 在登录页的时候，将存在本地的Authorization清除
    localStorage.removeItem('Authorization');
    this.$store.commit('setUser', {
      username: null,
      type: null
    });
  },
  methods: {
    loginSuccess(token, username, userpwd, role) {
      console.log('token', token)
      let postData = {
        token: token,
        username: username,
        type: role,
        userpwd: userpwd
      }
      localStorage.setItem('Authorization', JSON.stringify(postData));
      this.$store.commit('setUser', {
        username: username,
        type: role
      });
      window.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
      if(this.user.type == 'admin') {
        let _url = this.$route.query.redirect ? this.$route.query.redirect : '/'
        this.$router.push('/course_list')
      }else if(this.user.type == 'user'){
        this.$router.push('/gym_detail')
      }else {
        this.$router.push('/coach_can_arrange')
      }
      this.$refs['loginForm'].resetFields();
    },
    submitLogin() {
      let postData = {
        username: this.login.username,
        userpwd: this.login.password,
        type: this.login.type
      }
      this.$http({
        method:'post',
        url:this.$util.baseUrl+'users/userLogin',
        data:{
          username:this.login.username.trim(),
          userpwd:this.login.password.trim(),
          type: this.login.type.trim()
        }
      }).then(res => {
        console.log('res', res)
        if(res.data.code == '800000') {
          // localStorage.setItem('Authorization', JSON.stringify(res.data.data)); // 登录成功即将返回值保存
          // this.$store.commit('setUser', {
          //   username: this.login.username,
          //   role: this.login.password
          // });
          // let _url = this.$route.query.redirect ? this.$route.query.redirect : '/'
          // this.$router.push(_url)
          // this.$refs['loginForm'].resetFields();
          // console.log('res.data.token', res.data.token)
          this.loginSuccess(res.data.token, res.data.data.username, res.data.data.userpwd,res.data.data.type);
        }else { // 登录失败
          this.$refs['loginForm'].resetFields();
          this.$Message.error(res.data.mess)
        }
      }).then((err) => {
        console.log(err)
      })
    },
    registSubmit() {
      this.$router.push('/register');
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


