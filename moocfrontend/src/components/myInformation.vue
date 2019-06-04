<template lang="jade">
  div(class='myInformation' style="padding-left: 200px;")
    h2 我的通知
    div(style="padding: 20px 50px;")
      Tabs(value="comment")
        TabPane(label="评价通知" name="comment")
          Table(:columns="columns", :data="commentsList", size="small")
        TabPane(label="留言通知" name="message")
          Table(:columns="column", :data="messageList", size="small")
</template>
<script>
export default {
  data() {
    return {
      name: '',
      comment: '',
      commentsList: [],
      messageList: [],
      column: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '用户',
          render: (h, params) => {
            return h('div', params.row.replyUName)
          }
        },
        {
          title: '留言内容', 
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  'marginRight': '10px'
                },
                on: {
                  click: () => {
                    this.$router.push(`/sections_detail/${params.row.sectionId}`); // 跳到course_detail 界面 根据params.row.courseId获取所有列表和留言信息 
                  }
                }
              }, params.row.content),
            ]) 
          }
        },
        {
          title: '留言时间',
          render: (h, params) => {
            return h('div', params.row.createTime)
          }
        }
      ],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '老师',
          render: (h, params) => {
            return h('div', params.row.teacherName)
          }
        },
        
        {
          title: '评价内容',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  'marginRight': '10px'
                },
                on: {
                  click: () => {
                    this.$router.push(`/course_detail/${params.row.courseId}`); // 跳到course_detail 界面 根据params.row.courseId获取所有列表和留言信息 
                  }
                }
              }, params.row.replyContent),
            ])
          }
        },
        {
          title: '评价时间',
          render: (h, params) => {
            return h('div', params.row.replyTime)
          }
        }
      ]
    }
    
  },
  created() {
    if(!this.isLogin()) { // 没有登录则跳转到登录界面
      this.$router.push('/login')
    }
    this.getAllMyComment()
    this.getAllMessageList()
    
  },
  methods: {
    getAllMyComment() { // 获取我的所有评价
      let user = JSON.parse(sessionStorage.getItem('Authorization'))
      this.$http({
        method: 'get',
        url: this.baseUrl + `user/course-evaluation?uId=${user.id}`
      }).then(res => {
        if(res.data.code == 0) {
          this.commentsList = res.data.data
        }else {

        }
        
      })
    },
    getAllMessageList() {
      let user = JSON.parse(sessionStorage.getItem('Authorization'))
      this.$http({
        method: 'get',
        url: this.baseUrl + `user/course-comment-reply?uId=${user.id}`
      }).then(res => {
        if(res.data.code == 0) {
          this.messageList = res.data.data
        }else {

        }
        
      })
    }
  }
}
</script>
<style lang="stylus">

</style>


