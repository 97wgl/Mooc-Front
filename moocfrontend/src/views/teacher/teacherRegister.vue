<template>
  <transition name="confirm-fade">
    <div v-if="isShowConfirm" class="my-confirm">
      <div class="confirm-content-wrap">
        <h3 class="my-confirm-title">老师注册</h3>
        <form method="post" class="my-confirm-content">
          <li>
            <label for="depart">单位</label>
            <input type="text" id="depart" class="input-text" v-model="depart" @focus="handleInput('depart')">
          </li>
          <li>
            <label for="position">职位</label>
            <input type="text" id="position" class="input-text" v-model="position" @focus="handleInput('position')">
          </li>
          <li>
            <label>证明材料</label>
            <input type="file" multiple @change="addFile" ref="inputer">
           <!-- <input type="file" @change="addFile" ref="inputer"> -->
          </li>
        </form>
        <li id="errorMsg" class="clearfix" style="display:none;color:red;margin-left:190px;"></li>
        <div class="my-operation">
          <div class="confirm-btn" @click="clickRegister()">
            <p class="my-btn-text my-border-right">注册</p>
          </div>
          <div class="my-cancel-btn" @click="clickCancel()">
            <p class="my-btn-text">取消</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery';
export default {
  data () {
    return {
      isShowConfirm: false,
      userId: '',
      depart: '',
      position: '',
      // temp: [],
      applyMaterial: ''
    }
  },
  methods: {
    show () {
      this.depart = '';
      this.position = '';
      // this.temp= [];
      this.applyMaterial = [];
      this.isShowConfirm = true;
    },
    hidden () {
      this.isShowConfirm = false
    },
    clickCancel() {
      this.hidden()
    },
    addFile(){
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      //  this.temp = inputDOM.files[0];
      // for(let key in this.temp){
      //   if(!Number.isNaN(parseInt(key))){
      //     this.applyMaterial.push(this.temp[key]);
      //   }
      // }
      this.applyMaterial = inputDOM.files
      console.log("applyMaterial", this.applyMaterial);
    },
    clickRegister(){
      var $errorMsg = $('#errorMsg');
      //验证单位名称
      if (!this.depart) {
        $errorMsg.fadeIn().html("单位名称不能为空");
        this.myErrCode = 0;
        return;
      }
      
      // 验证职位
      if(!this.position) {
        $errorMsg.fadeIn().html("职位不能为空");
        this.myErrCode = 1;
        return;
      }

      var formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('position', this.position);
      formData.append('organization', this.depart);
      formData.append('applyMaterial', this.applyMaterial);
      console.log('formData', this.applyMaterial instanceof Array) 
      this.$http.post(this.baseUrl +'user/apply', formData).then(res => {
        for(let i =0; i<this.file.length; i++) {
          formData.append('applyMaterial', this.file[i]);
        } 
        this.$http({
          method: 'post',
          url: this.baseUrl +'user/apply',
          data: formData
        }).then(res => {
          if(res.data.code == 0) {
            this.$Message.success(res.data.msg);
            this.hidden();
          }else {
            this.$Message.error(res.data.msg)
          }  
        });
      })
    },
    handleInput(field) {
      var $errorMsg = $('#errorMsg');
      if (field==='depart' && this.myErrCode === 0) {
        $errorMsg.fadeOut()
      } else if (field==='position' && this.myErrCode === 1) {
        $errorMsg.fadeOut()
      }
    },
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('Authorization'));
    this.userId = userInfo.id;
  }
}
</script>

<style scoped>
  .my-confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }
  .confirm-fade-enter-active .confirm-content-wrap {
    animation: scale 0.3s;
  }
  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }

  /* 包裹层容器样式 */
  .confirm-content-wrap {
    position: absolute;
    top: 28%;
    left: 0;
    right: 0;
    width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5px;
    z-index: 999;
    user-select: none;
  }

  /* 顶部标题部分 */
  .my-confirm-title {
    padding-top: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }

  /* 中间内容部分 */
  .my-confirm-content {
    padding: 0 15px;
    padding-top: 20px;
    margin-bottom: 32px;
    text-align: center;
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }

  /* 底部按钮样式 */
  .my-operation {
    display: flex;
    border-top: 1px solid #eee;
  }
  .my-operation .my-cancel-btn, .confirm-btn {
    flex: 1;
  }
  .my-operation .confirm-btn {
    color: #ffb000;
  }
  .my-operation .my-btn-text {
    text-align: center;
    font-size: 16px;
    margin: 14px 0;
    padding: 6px 0;
  }

  /* 其他修饰样式 */
  .my-border-right {
    border-right: 1px solid #eee;
  }

  /* 进来的动画 */
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(0);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  /* 出去的动画 */
  @keyframes outOpacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
