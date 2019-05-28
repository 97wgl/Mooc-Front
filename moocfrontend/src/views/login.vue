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

          <li class="clearfix" style="margin-top: 20px;">
            <input type="button" value="登录" class="btn" style="margin-right:20px;" @click="doSubmit">
            <input type="button" value="注册" class="btn"  @click="$router.push('register')">
          </li>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      myErrCode: -1,
      username: '',
      password: '',
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
        url: this.baseUrl + 'admin/login',
        data: this.transformRequest(postData)
      }).then(res => {
        console.log(this.transformRequest(postData));
        console.log('res', res)
        // if(res.code == 0) {
        //   this.$router.push('index')
        // }else if(res.code == 1) {
        //   $errorMsg.fadeIn().html("验证码错误");
        //   reloadIndityImg('indeityImgLogin');
        //   this.myErrCode = 0;
        //   $identiryCode.val('')
        // }else if(res.errcode == 2) {
        //   $errorMsg.fadeIn().html("用户不存在");
        //   reloadIndityImg('indeityImgLogin');
        //   this.myErrCode = 0;
        //   $identiryCode.val('')
        // }else if(res.errcode == 3) {
        //   $errorMsg.fadeIn().html("密码错误");
        //   reloadIndityImg('indeityImgLogin');
        //   this.myErrCode = 0;
        //   $identiryCode.val('')
        // }
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

</style>


