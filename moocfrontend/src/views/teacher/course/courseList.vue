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
export default {
  data() {
    return {
      courseList:[
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        },
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        },
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        },
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        },
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        },
        {
          id: 1,
          name: 'aaa',
          classify_id: 'aaa',
          level: 'aaa',
          brief: 'aaa',
          publish_time: 'aaa',
          status: 0
        }
      ],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center',
        // },
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
                    this.$router.push(`/course_detail/${params.row.id}`);  // 跳转到健身房详情页
                  }
                }
              }, params.row.name),
            ])
          }
        },
        {
          title: '课程类别',
          render: (h, params) => {
            return h('span', params.row.classify_id);
          }
        },
        {
          title: '课程级别',
          render: (h, params) => {
            return h('span', params.row.level);
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
            return h('span', params.row.publish_time);
          }
        },
        {
          title: '课程审核状态',
          render: (h, params) => {
            return h('span', params.row.status);
          }
        },
        // {
        //   title: '课程操作',
        //   render: (h, params) => {
        //     let status = params.row.status
        //     let options = []
        //     if(new Date().getTime() <= moment(params.row.startTime).unix() * 1000) { // 当前时间大于开始时间时可以取消预约
        //       options.push(h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         on: {
        //           click: () => {
        //             this.$Modal.confirm({
        //               title: '操作确认',
        //               content: `是否取消预约${moment(params.row.startTime).format('YYYY.MM.DD HH:mm')}-${moment(params.row.endTime).format('YYYY.MM.DD HH:mm')}-${params.row.equipmentName}？`,
        //                 onOk: () => {
        //                   this.cancelReservation(params.row.id, params.row.arrangeId)
                          
        //                 },
        //                 onCancel: () => {
        //                 }
        //             });
        //           }
        //         }
        //       }, '取消预约'))
        //     }
        //     return h('div', options) 
        //   }
          
        // },
      ],
    }
  },
  created() {

  },
  methods: {
    handleSelectRow(selection, index) {
      if(this.$refs.selection.getSelection().length > 5) {
        this.$Message.error('只能选择最多5张课程封面');
        return  
      }
    },
  }
}
</script>
<style lang="stylus">

</style>


