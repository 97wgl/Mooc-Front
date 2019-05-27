<template>
  <div class="login">
    <div class="f-main">
      <div class="types-block clearfix" style="text-align: center;">
        <h3 class="types-title">登录</h3>
        <form method="post" action="<%=path %>/auth/doLogin" class="oc-form" id="infoForm"
              style="text-align: center;border: 1px solid #CCC;width: 600px;margin:0 auto;padding:20px;">
          <li>
            <label>用户名</label>
            <input onfocus="handleInput('username');" id="username" name="username" type="text" class="input-text" placeholder="请输入用户名">
          </li>
          <li>
            <label>密码</label>
            <input onfocus="handleInput('password');" id="password" name="password" type="password" class="input-text" placeholder="请输入密码" autocomplete="off"/>
          </li>
          <li>
            <label>验证码</label>
            <input onfocus="handleInput('identiryCode');" id="identiryCode" name="identiryCode" maxlength="6" class="input-text" type="text" style="width: 150px;"
                  placeholder="请输入验证码"/>
              <a class="vali-base">
                <img onclick="reloadIndityImg('indeityImgLogin');" id="indeityImgLogin"
                    src="<%=path %>/identiry/code"
                    style="width:80px;height:40px;float:left;margin-left:10px;"/>
            </a>
          </li>

          <!-- <%--提示信息--%> -->
          <li id="errorMsg" class="clearfix" style="display: none;color:red;"></li>

          <li class="clearfix" style="margin-top: 20px;">
            <input type="button" value="登录" class="btn" style="margin-right:20px;" onclick="doSubmit();">
            <div class="btn" onclick="window.location.href='<%=path %>/auth/register'">注册</div>
          </li>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus">

</style>

