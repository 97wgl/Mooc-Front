<template lang="jade">
  div
    Row
      Col(span="20")
        h2 教师审核
    div(style="width: 90%; margin: 0 auto;")
      Table(:columns="columns", :data="teacherList", size="small", style="margin-top: 20px;")
</template>
<script>
export default {
  data() {
    return {
      teacherList:[],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          render: (h, params) => {
            return h('span', params.row.name?params.row.name:'');
          }
        },
        {
          title: '性别',
          render: (h, params) => {
            return h('span', params.row.sex?params.row.sex:'');
          }
        },
        {
          title: '单位',
          render: (h, params) => {
            return h('span', params.row.orgnization?params.row.orgnization:'');
          }
        },
        {
          title: '职位',
          render: (h, params) => {
            return h('span', params.row.position?params.row.position:'');
          }
        },
        {
          title: '电话',
          render: (h, params) => {
            return h('span', params.row.tel?params.row.tel:'');
          }
        },
        {
          title: '邮箱',
          render: (h, params) => {
            return h('span', params.row.email?params.row.email:'');
          }
        },
        {
          title: '教师审核',
          render: (h, params) => {
            if(params.row.status == '2'){
              return h('div', [
                h('button',{
                  class: 'ivu-btn ivu-btn-success',
                  on: {
                    click: ()=>{
                      this.examineOpe(params.row.teaId,1);
                    }
                  }
                },'通过'),
                h('button',{
                  style: 'margin-left:10px',
                  class: 'ivu-btn ivu-btn-error',
                  on: {
                    click: ()=>{
                      this.examineOpe(params.row.teaId,0);
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
    this.getTeacherData();
  },
  methods: {
    getTeacherData(){ //获取列表信息
      this.$http({
        method: 'get',
        url: this.baseUrl +'teacher?'+this.transformRequest({
            'page': '1',
            'rows': '12'
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.teacherList = res.data.data.concat();
        }
      });
    },
    examineOpe(id,flag){ //审核教师
      this.$http({
        method: 'put',
        url: this.baseUrl +'teacher/status',
        data: this.transformRequest({
            'teaId': id,
            'res': flag
          }),
      }).then(res => {
        if(res.data.code == 0){
          this.$Message.success(res.data.msg);
          this.getTeacherData();
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


