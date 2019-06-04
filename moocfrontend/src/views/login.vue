<template>
  <div class="login">
    <div class="f-main">
      <div class="types-block clearfix" style="text-align: center;">
        <h3 class="types-title">登录</h3>
        <form method="post" class="oc-form" id="infoForm"
              style="text-align: center;border: 1px solid #CCC;width: 600px;margin:0 auto;padding:20px;">
          <li>
            <label>用户名</label>
            <input @focus="handleInput('username');" v-model="username" type="text" class="input-text" placeholder="请输入用户名">
          </li>
          <li>
            <label>密码</label>
            <input @focus="handleInput('password');" v-model="password" type="password" class="input-text" placeholder="请输入密码" autocomplete="off"/>
          </li>

          <!-- <%--提示信息--%> -->
          <li id="errorMsg" class="clearfix" style="display: none;color:red;"></li>

          <li class="clearfix" style="margin-top: 20px;margin-left:100px;">
            <input type="button" value="登录" class="btn" style="margin-right:20px;" @click="doSubmit">
            <input type="button" value="注册" class="btn"  @click="$router.push('register')">
            <a href="javascript:void(0)" @click="$router.push('/teacher_login')" class="link">后台管理入口</a>
          </li>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      myErrCode: -1,
      username: '',
      password: '',
      message: '',
      showModal: false,
    }
  },
  methods: {
    doSubmit() {
      var $errorMsg = $('#errorMsg');

      //验证用户名
      if (!this.username) {
        $errorMsg.fadeIn().html("用户名不能为空");
        this.myErrCode = 1;
        return;
      }

      //验证密码
      if (!this.password) {
        $errorMsg.fadeIn().html("密码不能为空");
        this.myErrCode = 2;
        return;
      }

      let postData = {
        username: this.username,
        password: this.password,
      }
      
      this.$http({
        method: 'post',
        url: this.baseUrl + 'user/login',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          let data = res.data.data
          this.$store.commit("setUser", {
            username: data.userInfo,
            type: data.type,
            id: data.id
          })
          this.$Message.success(res.data.msg)
          sessionStorage.setItem('Authorization', JSON.stringify(data));
          this.$router.push('/index')
        }else{
          this.$Message.error(res.data.msg)
        }
      })
    },
    handleInput(field) {
      var $errorMsg = $('#errorMsg');
      if (field==='username' && this.myErrCode === 1) {
        $errorMsg.fadeOut()
      } else if (field==='password' && this.myErrCode === 2) {
        $errorMsg.fadeOut()
      } else if (field==='identiryCode' && this.myErrCode === 3) {
        $errorMsg.fadeOut()
      } else if (this.myErrCode === 0) {
        $errorMsg.fadeOut()
      }
    },
  },
  created() {

  }
}
</script>
<style>
  .toast span{
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    bottom: 0;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: white;
    text-align: center;
    border-radius: 4px;
  }
  .link{
    color: blue;
    cursor: pointer;
    display: inline-block;
    margin-left: 40px;
  }
</style>


