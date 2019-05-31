<template lang="jade">
  div
    Row
      Col(span="20")
        h2 评价列表
    div(style="width: 90%; margin: 0 auto;")
      button(v-for="(item,index) in btnList", @click="getComments(item.courseId,index)",
      v-bind:class="{'ivu-btn': 1,'ivu-btn-primary': index == currentIndex}", style='margin:10px 10px 0 0;') {{item.name}}
      Table(:columns="columns", :data="commentList", size="small", style="margin-top: 20px;")
    transition(name="confirm-fade")
      div(v-if="isShowConfirm" class="my-confirm")
        div(class="confirm-content-wrap")
          h3(class="my-confirm-title") 评价回复
          div(class="my-confirm-content")
            textarea(v-model="comment",cols="60",rows="5")
          div(class="my-operation")
            div(class="confirm-btn" @click="clickRegister()")
              p(class="my-btn-text my-border-right") 确认
            div(class="confirm-btn" @click="clickCancel()")
              p(class="my-btn-text") 取消
</template>

<script>
export default {
  data() {
    return {
      isShowConfirm: false.data,
      teacherId: '',
      courseId: '',
      commentId: '',
      comment: '',
      btnList: [],
      currentIndex: 0,
      commentList:[],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '评价',
          width: 800,
          render: (h, params) => {
            return h('span', params.row.content?params.row.content:'');
          }
        },
        {
          title: '评价人',
          render: (h, params) => {
            return h('span', params.row.username?params.row.username:'');
          }
        },
        {
          title: '评价时间',
          width: 200,
          render: (h, params) => {
            return h('span', params.row.time?params.row.time:'');
          }
        },
        {
          title: '回复',
          render: (h, params) => {
            if(params.row.isReply == '0'){
              return h('div', [
                h('button',{
                  class: 'ivu-btn ivu-btn-success',
                  on: {
                    click: ()=>{
                      this.commentOpe(params.row.id);
                    }
                  }
                },'回复')
              ]);
            }else{
              return h('span','已回复')
            }
          }
        }
      ],
    }
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('Authorization'));
    this.teacherId = userInfo.id;
    this.getCourseData();
  },
  methods: {
    getCourseData(){ //获取课程信息
      this.$http({
        method: 'get',
        url: this.baseUrl +'teacher/course?'+this.transformRequest({
            'teacherId': this.teacherId
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.btnList = res.data.data.concat();
          if(this.btnList.length){
            this.getComments(this.btnList[0].courseId,0);
          }
        }
      });
    },
    getComments(courseId,index){ //获取
      if(index !=='') this.currentIndex = index;
      this.courseId = courseId;
      this.$http({
        method: 'get',
        url: this.baseUrl +'course-evaluation?'+this.transformRequest({
            course_id: courseId,
            page: '1',
            limit: '12'
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.commentList = res.data.data.concat();
        }
      });
    },
    commentOpe(id){ //审核课程
      this.isShowConfirm = true;
      this.commentId = id;
    },
    clickCancel() {
      this.isShowConfirm = false,
      this.commentId = '';
    },
    clickRegister(){
      this.$http({
        method: 'put',
        url: this.baseUrl +'course-evaluation',
        data: this.transformRequest({
            'id': this.commentId,
            'tea_id': this.teacherId,
            'reply_content':this.comment
          })
      }).then(res => {
        if(res.data.code == 0){
          this.$Message.success(res.data.msg);
          this.isShowConfirm = false;
          this.getComments(this.courseId);
        }else{
          this.$Message.error(res.data.msg);
        }
      });
    }
  }
}
</script>
<style lang="stylus">
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


