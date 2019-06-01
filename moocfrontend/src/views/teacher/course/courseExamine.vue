<template lang="jade">
  div
    Row
      Col(span="20")
        h2 课程审核
          Button(@click="setCourseWeight" type="primary" style="margin-left: 20px;") 设置封面
    div(style="width: 90%; margin: 0 auto;")
      Table(:columns="columns", :data="courseList", size="small", style="margin-top: 20px;", ref="selection", @on-selection-change="handleSelectRow()")
</template>
<script>
export default {
  data() {
    return {
      courseList:[],
      courseId: '',
      courseWeight: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '',
          width: 60,
          align: 'center',
          type: 'selection'
        },
        {
          title: '课程名',
          render: (h, params) => {
            return h('span', params.row.name?params.row.name:'');
          }
        },
        {
          title: '课程分类',
          render: (h, params) => {
            return h('span', params.row.classify?params.row.classify:'');
          }
        },
        {
          title: '课程简介',
          render: (h, params) => {
            return h('span', params.row.brief?params.row.brief:'');
          }
        },
        {
          title: '上传时间',
          render: (h, params) => {
            return h('span', params.row.publishTime?params.row.publishTime:'');
          }
        },
        {
          title: '课程审核',
          render: (h, params) => {
            if(params.row.status == '0'){
              return h('div', [
                h('button',{
                  class: 'ivu-btn ivu-btn-success',
                  on: {
                    click: ()=>{
                      this.examineOpe(params.row.courseId,1);
                    }
                  }
                },'通过'),
                h('button',{
                  style: 'margin-left:10px',
                  class: 'ivu-btn ivu-btn-error',
                  on: {
                    click: ()=>{
                      this.examineOpe(params.row.courseId,2);
                    }
                  }
                },'驳回')
              ]);
            }else{
              return h('span','已审核')
            }
          }
        }
      ],
    }
  },
  created() {
    this.getCourseData();
  },
  methods: {
    setCourseWeight() { // 设置权重 
      let arr = []
      this.courseWeight.forEach(item => {
        if(item.status != 1) {
          this.$Message.error('只能设置已审核的课程为轮播图封面！')
        }
      });
      this.courseWeight = this.courseWeight.filter(item => item.status == 1) // 得到审核
      this.courseWeight.forEach(item => {
        arr.push(item.courseId)
      })
      if(this.courseWeight.length < 5) {
        this.$Message.error('请至少选择5张图片！')
        return
      }
      let postData = {
        courseIds: arr.join()
      }
      this.$http({
        method: 'put',
        url: this.baseUrl + 'admin/courseWeight',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
        }else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    handleSelectRow() { // 设置封面
      this.courseWeight = this.$refs.selection.getSelection()
      // console.log('this.$refs.selection.getSelection()', this.$refs.selection.getSelection())
    },
    getCourseData(){ //获取列表信息
      this.$http({
        method: 'get',
        url: this.baseUrl +'course?'+this.transformRequest({
            'page': '1',
            'rows': '12'
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.courseList = res.data.data.concat();
        }
      });
    },
    examineOpe(id,flag){ //审核课程
      this.$http({
        method: 'put',
        url: this.baseUrl +'course/status',
        data: this.transformRequest({
            'courseId': id,
            'res': flag
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.$Message.success(res.data.msg);
          this.getCourseData();
        }else{
          this.$Message.error(res.data.msg);
        }
      });
    }
  }
}
</script>
<style lang="stylus">

</style>


