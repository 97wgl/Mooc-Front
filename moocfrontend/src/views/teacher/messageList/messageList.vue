<template lang="jade">
  div(style="padding-left: 50px;")
    div(class="course", style="margin-top: 20px;")
      课程：
      Button(
        style="margin-right: 10px",
        shape="circle",
        size="small",
        v-for="(item,index) in courseList",
        :key="index",
        @click="selectButton(item, index)",
        :class="{'ivu-btn-primary': index == currentIndex, 'ive-btn-default': index != currentIndex}") {{item.name}}
    Table(:columns="columns", :data="messageList", size="small", style="margin-top: 20px;", ref="selection")
</template>
<script>
export default {
  data() {
    return {
      courseList: [],
      currentIndex: 0,
      messageList: [],
      columns: [{
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '用户',
          render: (h, params) => {
            return h('div', params.row.username)
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
            return h('span', params.row.createTime);
          }
        },
        // {
        //   title: '课程时长',
        //   render: (h, params) => {
        //     return h('span', params.row.duration);
        //   }
        // },
        // {
        //   title: '课程价钱',
        //   render: (h, params) => {
        //     return h('span', params.row.price);
        //   }
        // },
      ]
    }
  },
  created() {
    this.getAllCourseList()
  },
  methods: {
    selectButton(item, index) {
      this.currentIndex = index
      this.getAllMessage(item)
    },
    getAllCourseList() {
      let teacher = JSON.parse(sessionStorage.getItem('Authorization'))
      this.$http({
        method: 'get',
        url: this.baseUrl + `teacher/course?teacherId=${teacher.id}`
      }).then(res => {
        if(res.data.code == 0) {
          this.courseList = res.data.data
          this.getAllMessage(this.courseList[0])
        }else {
          this.courseList = []
        }
      })
    },
    getAllMessage(item) { // 获取课程所有的留言
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-comment/section/all?courseId=${item.courseId}`
      }).then(res => {
        if(res.data.code == 0) {
          this.messageList = res.data.data
        }
      })
    }
  },
}
</script>
<style lang="stylus">
  .ivu-btn-primary
    span
      color #ffffff !important
  .ive-btn-default
    span
      color blue !important
</style>


