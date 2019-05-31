<template>
  <div class="infoArea">
    <div><span class="f-16">个人信息</span></div>
    <div class="split-line" style="margin: 20px 0px;"></div>
    <form action="put" class="oc-form">
      <li>
        <label for="name">用户名</label>
        <input @focus="handleInput('name')" type="text" id="name" class="input-text" v-model="name">
      </li>
      <li>
        <label>性别</label>
        <input @focus="handleInput('sex')" type="radio" id="man" value="F" class="input-radio" v-model="sex">
        <label for="man" class="radioLabel">男</label>
        <input @focus="handleInput('sex')" type="radio" id="woman" value="M" class="input-radio" v-model="sex">
        <label for="woman" class="radioLabel">女</label>
      </li>
      <li>
        <label for="organization">单位</label>
        <input @focus="handleInput('organization')" type="text" id="organization" class="input-text" v-model="organization">
      </li>
      <li>
        <label for="position">职位</label>
        <input @focus="handleInput('position')" type="text" id="position" class="input-text" v-model="position">
      </li>
      <li>
        <label for="tel">电话</label>
        <input @focus="handleInput('tel')" type="text" id="tel" class="input-text" v-model="tel">
      </li>
      <li>
        <label for="email">邮箱</label>
        <input @focus="handleInput('email')" type="text" id="email" class="input-text" v-model="email">
      </li>
      <li>
        <label for="remark">个性签名</label>
        <input type="text" id="remark" class="input-text" v-model="remark">
      </li>
    </form>
    <li id="errorMsg" class="clearfix" style="display: none;color:red;margin-left:190px;"></li>
    <li class="clearfix" style="margin-top:15px;">
      <input type="button" value="保存" class="btn" @click="save();" style="margin-left:190px;">
    </li>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      myErrCode: -1,
      name: '',
      sex: '',
      organization: '',
      position: '',
      email: '',
      tel:'',
      remark: '',
      teacherId: ''
    }
  },
  methods: {
    save() { // 保存修改
      var $errorMsg = $('#errorMsg');
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
      var reTel = /^1(3|4|5|7|8)\d{9}$/;
      //验证用户名
      if (!this.name) {
        $errorMsg.fadeIn().html("用户名不能为空");
        this.myErrCode = 0;
        return;
      }
      
      // 验证性别
      if(!this.sex) {
        $errorMsg.fadeIn().html("性别不能为空");
        this.myErrCode = 1;
        return;
      }
      
      // 验证单位
      if(!this.sex) {
        $errorMsg.fadeIn().html("单位名称不能为空");
        this.myErrCode = 6;
        return;
      }
      
      // 验证职位
      if(!this.sex) {
        $errorMsg.fadeIn().html("职位不能为空");
        this.myErrCode = 7;
        return;
      }

      // 验证手机
      if(!this.tel) {
        $errorMsg.fadeIn().html("手机号不能为空");
        this.myErrCode = 2;
        return;
      }

      if(!reTel.test(this.tel)) {
        $errorMsg.fadeIn().html("手机号码格式不正确");
        this.myErrCode = 3;
        return;
      }
      
      // 验证邮箱格式
      if(!this.email) {
        $errorMsg.fadeIn().html("邮箱不能为空");
        this.myErrCode = 4;
        return;
      }

      if(!re.test(this.email)) {
        $errorMsg.fadeIn().html("邮箱格式不正确");
        this.myErrCode = 5;
        return;
      }

      let postData = {
        teaId: this.teacherId,
        name: this.name,
        sex: this.sex,
        orgnization: this.organization,
        position: this.position,
        email: this.email,
        tel: this.tel,
        remark: this.remark
      }
      this.$http({
        method: 'put',
        url: this.baseUrl +'teacher/info',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
        }else {
          this.$Message.error(res.data.msg)
        }  
      })
    },
    handleInput(field) {
      var $errorMsg = $('#errorMsg');
      if (field==='name' && this.myErrCode === 0) {
        $errorMsg.fadeOut()
      } else if (field==='sex' && this.myErrCode === 1) {
        $errorMsg.fadeOut()
      }else if (field==='organization' && this.myErrCode === 6) {
        $errorMsg.fadeOut()
      } else if (field==='position' && this.myErrCode === 7) {
        $errorMsg.fadeOut()
      } else if (field==='tel' && (this.myErrCode === 2 || this.myErrCode == 3)) {
        $errorMsg.fadeOut()
      } else if (field==='email' && (this.myErrCode === 4 || this.myErrCode === 5)) {
        $errorMsg.fadeOut()
      }
    }
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('Authorization'));
    this.teacherId = userInfo.id;
    this.$http({
      method: 'get',
      url: this.baseUrl +'teacher/info?'+this.transformRequest({
        'teacherId': this.teacherId
        }),
    }).then(res => {
      if(res.data && res.data.data){
        let userData = res.data.data;
        this.name = userData.name;
        this.sex = userData.sex;
        this.organization = userData.orgnization;
        this.position = userData.position;
        this.tel = userData.tel;
        this.email = userData.email;
        this.remark = userData.remark;
      }
    });
  },
}
</script>

<style scoped>
.infoArea{
  height: 100%;
  width: 70%;
  margin: 30px auto;
}
</style>
