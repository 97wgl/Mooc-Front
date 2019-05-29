<template>
  <div class="setting-right">
    <div><span class="f-16">修改密码</span></div>
    <div class="split-line" style="margin: 20px 0px;"></div>
    <form action="" class="oc-form">
      <li>
        <label for="email">原密码</label>
        <input type="text" name="email" id="email" class="input-text">
      </li>
      <li>
        <label for="remark">新密码</label>
        <input type="text" name="remark" id="remark" class="input-text">
      </li>
      <li>
        <label for="remark">确认密码</label>
        <input type="text" name="remark" id="remark" class="input-text">
      </li>
    </form>
    <li class="clearfix" style="margin-top:40px;">
      <input type="button" value="确认修改" class="btn" @click="confirm();" style="margin-left:190px;">
    </li>
  </div>
</template>

<script>
export default {
  
}
</script>