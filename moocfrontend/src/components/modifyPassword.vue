<template>
  <div class="setting-right">
    <div><span class="f-16">修改密码</span></div>
    <div class="split-line" style="margin: 20px 0px;"></div>
    <form action="put" class="oc-form">
      <li>
        <label for="oldPwd">原密码</label>
        <input @focus="handleInput('oldPwd');" type="password" v-model="oldPwd" id="oldPwd" class="input-text">
      </li>
      <li>
        <label for="newPwd">新密码</label>
        <input @focus="handleInput('newPwd');" type="password" v-model="newPwd" id="newPwd" class="input-text">
      </li>
      <li>
        <label for="rePwd">确认密码</label>
        <input @focus="handleInput('rePwd');" type="password" v-model="rePwd" id="rePwd" class="input-text">
      </li>
    </form>
    <li id="errorMsg" class="clearfix" style="display: none;color:red;margin-left:190px;"></li>
    <li class="clearfix" style="margin-top:15px;">
      <input type="button" value="确认修改" class="btn" @click="save();" style="margin-left:190px;">
    </li>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      myErrCode: -1,
      oldPwd: '',
      newPwd: '',
      rePwd: '',
      u_id: ''
    }
  },
  methods: {
    save() { // 保存修改
      var $errorMsg = $('#errorMsg');
      //验证原密码
      if (!this.oldPwd) {
        $errorMsg.fadeIn().html("原密码不能为空");
        this.myErrCode = 0;
        return;
      }

      //验证新密码
      if (!this.newPwd) {
        $errorMsg.fadeIn().html("新密码不能为空");
        this.myErrCode = 1;
        return;
      }

      // 验证确认密码
      if(!this.rePwd) {
        $errorMsg.fadeIn().html("确认密码不能为空");
        this.myErrCode = 2;
        return;
      }

      // 判断输入密码和确认密码是否相同
      if(this.newPwd != this.rePwd) {
        $errorMsg.fadeIn().html("确认密码与新密码不符");
        this.myErrCode = 3;
        return
      }

      let postData = {
        uId: this.u_id,
        oldPwd: this.oldPwd,
        newPwd: this.newPwd
      }
      this.$http({
        method: 'put',
        url: this.baseUrl +'user/password',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
        }else {
          this.$Message.error(res.data.msg);
          this.oldPwd = '';this.newPwd = '';this.rePwd = '';
        }  
      });
    },
    handleInput(field) {
      var $errorMsg = $('#errorMsg');
      if (field==='oldPwd' && this.myErrCode === 0) {
        $errorMsg.fadeOut()
      } else if (field==='newPwd' && this.myErrCode === 1) {
        $errorMsg.fadeOut()
      } else if (field==='rePwd' && (this.myErrCode === 2 || this.myErrCode === 3)) {
        $errorMsg.fadeOut()
      }
    }
  },
  created() {
    let userInfo = sessionStorage.getItem('Authorization');
    this.u_id = JSON.parse(userInfo).id;
  },
}
</script>