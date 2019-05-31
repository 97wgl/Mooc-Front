<template lang="jade">
  div
    Row
      Col(span="20")
        h2 课程列表
      Col(span="4")
        Button(type="primary", style="margin-top: 20px;", @click="$router.push('course_create')") +添加课程
    div(style="width: 90%; margin: 0 auto;")
      Table(:columns="columns", :data="courseList", size="small", style="margin-top: 20px;", ref="selection", @on-selection-change="handleSelectRow()")
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      courseList:[],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '课程名称',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  'marginRight': '10px'
                },
                on: {
                  click: () => {
                    this.$router.push(`/course_detail_tea/${params.row.courseId}/${params.row.status}`); 
                  }
                }
              }, params.row.name),
            ])
          }
        },
        {
          title: '课程类别',
          render: (h, params) => {
            return h('span', params.row.classify);
          }
        },
        {
          title: '课程级别',
          render: (h, params) => {
            return h('span', params.row.level == '1' ? '初级' : (params.row.level == '2' ? '中级' : '高级' ) );
          }
        },
        {
          title: '课程描述',
          render: (h, params) => {
            return h('span', params.row.brief);
          }
        },
        {
          title: '课程发布时间',
          render: (h, params) => {
            return h('span', moment(params.row.publish_time).format('YYYY-MM-DD HH:mm:ss'));
          }
        },
        {
          title: '课程审核状态', // 初始 0 1 通过 2 驳回 3 审核中
          render: (h, params) => {
            let status = params.row.status
            let options = []
            if (status == 3) { //未提交审核
              options.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '操作确认',
                      content: `是否将课程${params.row.name}提交管理员审核？`,
                        onOk: () => {
                          this.updataStatus(params.row.id, 0);  // 将未提交变为审核中
                        },
                        onCancel: () => {
                        }
                    });
                  }
                }
              }, '提交审核'))
            }else if(status == 0) {
              options.push(h('Tag', {
                props: {
                  type: 'border',
                  size: 'small',
                  color: 'warning'
                },
                style: {
                  marginRight: '5px',
                },
                
              }, '审核中'))
            }else if(status == 1) {
              options.push(h('Tag', {
                props: {
                  type: 'border',
                  size: 'small',
                  color: 'success'
                },
                style: {
                  marginRight: '5px',
                },
                
              }, '审核通过'))
            }else if(status == 2) {
              options.push(h('Tag', {
                props: {
                  type: 'border',
                  size: 'small',
                  color: 'error'
                },
                style: {
                  marginRight: '5px',
                },
                
              }, '被驳回'))
              options.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '操作确认',
                      content: `是否将课程${params.row.name}提交管理员审核？`,
                        onOk: () => {
                          this.updataStatus(params.row.id, 0);  // 将未提交变为审核中
                        },
                        onCancel: () => {
                        }
                    });
                  }
                }
              }, '提交审核'))
            }
            return h('div', options)
          },
        }
      ],
    }
  },
  created() {
    this.getAllCourseList()
  },
  methods: { // todo 审核通过的课程不允许再添加 章和节  // 审核中的课程也不允许添加章和节
    updateStatus() {

    },
    handleSelectRow(selection, index) {
      if(this.$refs.selection.getSelection().length > 5) {
        this.$Message.error('只能选择最多5张课程封面');
        return  
      }
    },
    // 获取教师课程列表
    getAllCourseList() {
      let user = JSON.parse(sessionStorage.getItem('Authorization'))
      this.$http({
        method: 'get',
        url: this.baseUrl + `teacher/course?teacherId=${user.id}` 
      }).then(res => {
        this.courseList = res.data.data
      })
    }
  }
}
</script>
<style lang="stylus">

</style>


