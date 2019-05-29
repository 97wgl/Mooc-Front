<template>
  <div class="setting-right">
    <div><span class="f-16">个人信息</span></div>
    <div class="split-line" style="margin: 20px 0px;"></div>
    <form action="" class="oc-form">
      <li>
        <label for="name">用户名</label>
        <input type="text" name="name" id="name" class="input-text">
      </li>
      <li>
        <label>性别</label>
        <input type="radio" name="sex" id="man" class="input-radio">
        <label for="man" class="radioLabel">男</label>
        <input type="radio" name="sex" id="woman" class="input-radio">
        <label for="woman" class="radioLabel">女</label>
      </li>
      <li>
        <label for="tel">电话</label>
        <input type="text" name="tel" id="tel" class="input-text">
      </li>
      <li>
        <label for="email">邮箱</label>
        <input type="text" name="email" id="email" class="input-text">
      </li>
      <li>
        <label for="remark">个性签名</label>
        <input type="text" name="remark" id="remark" class="input-text">
      </li>
    </form>
    <li class="clearfix" style="margin-top:40px;">
      <input type="button" value="保存" class="btn" @click="save();" style="margin-left:190px;">
    </li>
  </div>
</template>

<script>
export default {
  
}
</script>