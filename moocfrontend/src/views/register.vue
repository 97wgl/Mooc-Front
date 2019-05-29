<template>
  <div class="register">
    <div class="f-main">
      <div class="types-block clearfix" style="text-align: center;">
        <h3 class="types-title">注册</h3>
        <form id="registerForm" method="post" class="oc-form"
              style="text-align: center;border: 1px solid #CCC;width: 600px;margin:0 auto;padding:20px;">
          <li>
            <label>邮箱</label>
            <input @focus="handleInput('email');" maxlength="20" v-model="email" type="email" class="input-text"
                  placeholder="请输入邮箱">
          </li>
          <li style="padding-right: 0px">
            <label>验证码</label>
            <input @focus="handleInput('code');" maxlength="20" v-model="validCode" type="text" class="input-text"
                  placeholder="请输入验证码">
            <input type="button" value="发送" class="btn" @click="getValidCode">
          </li>
          <li>
            <label>用户名</label>
            <input @focus="handleInput('username');" maxlength="20" v-model="username" type="text" class="input-text"
                  placeholder="请输入用户名">
          </li>
          <li>
            <label>密码</label>
            <input @focus="handleInput('password');" maxlength="20" v-model="password" type="password" class="input-text" placeholder="请输入密码"
                  autocomplete="off"/>
          </li>
          <li>
            <label>确认密码</label>
            <input @focus="handleInput('repassword');" maxlength="20" v-model="repassword" type="password" class="input-text" placeholder="请确认密码"
                  autocomplete="off"/>
          </li>

          <!-- <%--提示信息--%> -->
          <li id="errorMsg" class="clearfix" style="display: none;color:red;">用户名密码不能为空</li>

          <li class="clearfix">
            <input type="button" value="注册保存" class="btn" @click="doSubmit();">
          </li>
          <li>
            <span style="float: left; color: blue"  @click="$router.push('login')">已有账号，去登录</span>
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
      email: '',
      validCode: '',
      username: '',
      password: '',
      repassword: '',
    }
  },
  created() {

  },
  methods: {
    getValidCode() { // 获取验证码
      let postData = {
        email: this.email
      }
      console.log('postData', postData)
      this.$http({
        method: 'post',
        url: this.baseUrl + 'user/regist/valid',
        data: this.transformRequest(postData)
      }).then(res => {
        console.log('res')
      })
    },
    doSubmit() { // 注册
      var $errorMsg = $('#errorMsg');
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 

      // 验证邮箱格式
      if(!this.email) {
        $errorMsg.fadeIn().html("邮箱不能为空");
        this.myErrCode = 1;
        return;
      }

      if(!re.test(this.email)) {
        $errorMsg.fadeIn().html("邮箱格式不正确");
        this.myErrCode = 0;
        return;
      }

      // 填写验证码
      if(!this.validCode) {
        $errorMsg.fadeIn().html("验证码不能为空");
        this.myErrCode = 2;
        return;
      }

      //验证用户名
      if (!this.username) {
        $errorMsg.fadeIn().html("用户名不能为空");
        this.myErrCode = 3;
        return;
      }

      //验证密码
      if (!this.password) {
        $errorMsg.fadeIn().html("密码不能为空");
        this.myErrCode = 4;
        return;
      }

      // 验证确认密码
      if(!this.repassword) {
        $errorMsg.fadeIn().html("确认密码不能为空");
        this.myErrCode = 5;
        return;
      }

      // 判断输入密码和确认密码是否相同
      if(this.password != this.repassword) {
        $errorMsg.fadeIn().html("再次确认密码与原密码不符");
        this.myErrCode = 6;
        return
      }

      let postData = {
        email: this.email,
        validCode: this.validCode,
        username: this.username,
        password: this.password,
      }
      
      this.$http({
        method: 'post',
        url: this.baseUrl +'user/regist',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
          this.$router.push('/login')
        }else {
          this.$Message.error(res.data.msg)
        }  
      })
    },
    handleInput(field) {
      var $errorMsg = $('#errorMsg');
      if (field==='email' && (this.myErrCode === 1 || this.myErrCode == 0)) {
        $errorMsg.fadeOut()
      } else if (field==='validCode' && this.myErrCode === 2) {
        $errorMsg.fadeOut()
      } else if (field==='username' && this.myErrCode === 3) {
        $errorMsg.fadeOut()
      } else if (field==='password' && this.myErrCode === 4) {
        $errorMsg.fadeOut()
      }else if (field==='repassword' && (this.myErrCode === 5 || this.myErrCode == 6)) {
        $errorMsg.fadeOut()
      }
    }
  },
}
</script>
<style>

</style>

