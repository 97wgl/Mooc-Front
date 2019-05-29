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
        Select(v-model="course.classify_id", placeholder="请选择类别", @on-change="selectClassify")
          Option(v-for="item in classifyList", :value="item.id", :label="item.name", :key="item.id")
            .option-box
              span {{ item.name }}
      FormItem(style="position: relative", label="课程难度",)
        Select(v-model="course.level", placeholder="请选择难度", @on-change="selectClassify")
          Option(v-for="item in levelList", :value="item.id", :label="item.name", :key="item.id")
            .option-box
              span {{ item.name }}
      FormItem(label="课程描述")
        Input(type="textarea", :rows="4", v-model="course.brief", style="width: 400px;")
      FormItem(label="导航说明")
        .cover-wrap
          Card(:padding="3" class="cover-item" v-if="guideImage")
            Icon(class="delete-btn", type="android-delete", @click.native="onRemoveGuideImage()")
            .img(:style="{backgroundImage: `url(${guideImage})`}")
          Upload(:action="upload_host",
                 class="upload-item",
                 :show-upload-list="false",
                 type="drag",
                 :format="['jpg', 'jpeg', 'png', 'gif']",
                 :max-size="5120",
                 :on-success="onUploadGuideImageSuccess",
                 :headers="uploadHeader")
             .upload-inner(v-if="!guideImage")
               Icon(type="android-upload", size="25")
               div(style="font-size: 13px;") 上传图片
        FormItem(style="margin-top: 20px;")
          Button(type="success", style="margin-right: 20px;") 保存
          Button(type="error", @click="$router.push('course_list')") 取消
</template>
<script>
export default {
  data() {
    return {
      course: {
        name: 'aaa',
        classify_id: '',
        level: '',
        brief: '',
        pics: ''
      },
      classifyList: [],
      levelList: [],
      guideImage: '',
      upload_host: '',
      uploadHeader: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTAxYWJkNmFiMmM3YzViMzBlZDk5NzEiLCJ1c2VybmFtZSI6Iuagk-agk-agk-WtkCIsImF2YXRhciI6Imh0dHA6Ly9zdGF0aWMxLmdvdG9rZWVwLmNvbS9hdmF0YXIvMjAxNi8wNy8yMC8yMi9jMDU4YzVlYzMyNzcwZWIyMzhkMTNiZTlmMmExZDE4MmZhYzI2NWU0LmpwZyIsImdlbmRlciI6Ik0iLCJkZXZpY2VJZCI6ImRhNWM1Y2NjOTc2YzQzZGQ5YTUxYTVjMGQ5MDVmYTU3ZDQwZjJmNzEiLCJpc3MiOiJodHRwOi8vd3d3LmdvdG9rZWVwLmNvbS8iLCJleHAiOjE1MTg2OTIzOTYsImlhdCI6MTUxMDA1MjM5Nn0.QUZLVCV3p25AAy_jVfgL3hdT_9D85MjHtz_0BW8yH0Q'
      },
    }
  },
  methods: {
    selectClassify() {

    },
    onRemoveGuideImage() {
      this.guideImage = ''
    },
    onUploadGuideImageSuccess(res) {
      this.guideImage = res.data.url
    },
  }
}
</script>
<style lang="stylus">

</style>


