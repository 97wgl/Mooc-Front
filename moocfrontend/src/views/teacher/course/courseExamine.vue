<template lang="jade">
  div
    Row
      Col(span="20")
        h2 课程审核
    div(style="width: 90%; margin: 0 auto;")
      Table(:columns="columns", :data="courseList", size="small", style="margin-top: 20px;")
</template>
<script>
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


