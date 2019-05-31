<template lang="jade">
  div 
    h2 添加课程
    Form(ref="courseForm",
         :model="course",
         :label-width="100",
         style="width: 40%; margin-left: 20px; margin-top: 20px;",)
      FormItem(label="课程名称")
        Input(v-model="course.name", placeholder="请输入课程名称")
      FormItem(style="position: relative", label="课程类别",)
        Select(v-model="course.classify", placeholder="请选择类别", @on-change="selectClassify")
          Option(v-for="(item,index) in classifyList", :value="item", :label="item", :key="index")
            .option-box
              span {{ item }}
      FormItem(style="position: relative", label="课程难度",)
        Select(v-model="course.level", placeholder="请选择难度", @on-change="selectLevel")
          Option(v-for="item in levelList", :value="item.id", :label="item.name", :key="item.id")
            .option-box
              span {{ item.name }}
      FormItem(label="课程描述")
        Input(type="textarea", :rows="4", v-model="course.brief", style="width: 400px;")
      FormItem(label="上传课程封面")
        <input type="file" @change="addImg" ref="inputer"> 上传封面
      FormItem(style="margin-top: 20px;")
        Button(type="success", style="margin-right: 20px;", @click="saveCourse") 保存
        Button(type="error", @click="$router.push('course_list')") 取消
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      course: {
        name: '',
        classify: '',
        level: '',
        brief: '',
        teacherId: '',
        file: ''
      },
      classifyList: ['前端开发','后端开发','移动开发','算法','前沿技术','云计算','大数据','运维','测试','数据库','UI设计','多媒体'],
      levelList: [{
        id: 1,
        name: '初级'
      },
      {
        id: 2,
        name: '中级'
      },
      {
        id: 3,
        name: '高级'
      }],
    }
  },
  created() {
    this.course.teacherId = JSON.parse(sessionStorage.getItem('Authorization')).id
  },
  methods: {
    selectClassify(item) {
      this.course.classify = item
    },
    selectLevel(id) {
      this.course.level = id
    },
    onRemoveGuideImage() {
      this.guideImage = ''
    },
    onUploadGuideImageSuccess(res) {
      this.guideImage = res.data.url
    },
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.course.file = inputDOM.files[0];
    },
    saveCourse() {
      console.log('this.course', this.course)
      let formData = new FormData();
      formData.append('teacherId', this.course.teacherId)
      formData.append('courseName', this.course.name)
      formData.append('classify', this.course.classify)
      formData.append('level', this.course.level)
      formData.append('brief', this.course.brief)
      formData.append('picture', this.course.file)

      this.$http.post(this.baseUrl + 'teacher/course',formData).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
          this.$router.push('/course_list')
        }else {
          this.$Message.err(res.data.msg)
        }
      })
      
    }
  }
}
</script>
<style lang="stylus">

</style>


