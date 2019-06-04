<template>
  <div>
    <h2> 课程详情页 
      <Button type="primary" style="margin-left: 20px;" @click="sectionAdd" :disabled="isDisabled">添加章</Button>
    </h2>
    <div id="courseSection" style="padding: 0 50px;">
          <div>
            <div v-for="(section, index) in sectionList" :key="index">
              <div class="chapter">
                <a href="javascript:void(0);" class="js-open">
                  <h3>
                    <strong>
                      <div class="icon-chapter">=</div>
                        {{section.name}} </strong>
                    <span class="drop-down">▼</span>
                  </h3>
                </a>

                <ul class="chapter-sub" style="margin-top: 20px;">
                  <div>
                    <div v-for="(jie, index) in section.children" :key="index">
                      <a>
                        <li class="chapter-sub-li">
                          <i class="icon-video">▶</i> {{jie.name}}
                        </li>
                      </a>
                    </div>
                  </div>
                </ul>
              <Button type="primary" style="margin-left: 20px;" @click="jieAdd(section)" :disabled="isDisabled">上传节</Button>
              </div>
            </div>
          </div>
        </div>
    <Modal
        v-model="isShowSection"
        title="添加章名称"
        @on-ok="sectionOk"
        @cancel="sectionCancel">
        <span>章节名称</span>
        <input type="text" v-model="sectionName" style="margin-left: 10px;height: 30px;width: 400px;">
    </Modal>
    <Modal
        v-model="isShowJie"
        title="添加小节"
        @on-ok="jieOK"
        @cancel="sectionCancel">
        <span>章节名称</span>
        <input type="text" v-model="jieName" style="margin-left: 10px;height: 30px;width: 400px;">
        <div style="margin-top: 20px;">
          <input type="file" @change="addVideo" ref="inputer"> 上传视频
        </div>
    </Modal>
    <div v-if="isShowLoading" style="width: 80px; height: 30px; background: #3f51b570; border-radius: 4px; position: fixed; top: 90px; color: #ffffff; left: 50%; transform: translateX(-50%); line-height: 30px;text-align: center;" > loading... </div>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      sectionList: [],
      isShowSection: false,
      isShowJie: false,
      sectionName: '',
      file: '',
      jieName: '',
      isShowLoading: false,
    }
  },
  created() {
    this.getSectionList()
  },
  computed: {
    isDisabled() {
      return this.$route.params.status == 0 || this.$route.params.status == 1
    }
  },
  methods: {
    sectionAdd() { // 添加章节
      this.isShowSection = true
    },
    sectionOk() { // 上传章 courseId 课程编号 chapterName 章节名称  parentId 父章节编号 如果保存章就传 0 如果保存节就传对应章的编号 videl 
      let formData = new FormData();
      formData.append('courseId', this.$route.params.courseId)
      formData.append('chapterName', this.sectionName)
      formData.append('parentId', 0)
      this.$http({
        method: 'post',
        url: this.baseUrl + 'teacher/course/chapter',
        data: formData
      }).then( res => {
        if(res.data.code == 0) {
          this.$Message.success('添加章成功')
          this.getSectionList()
        }
      })
    },
    addVideo() { // 添加视频
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = inputDOM.files[0];
    },
    jieAdd(item) { // 上传节
      this.isShowJie = true
      sessionStorage.setItem('parentSection', JSON.stringify(item))
    },
    jieOK() {
      let parentSection = JSON.parse(sessionStorage.getItem('parentSection'))
      let formData = new FormData();
      formData.append('courseId', this.$route.params.courseId)
      formData.append('chapterName', this.jieName)
      formData.append('parentId', parentSection.sectionId)
      formData.append('video', this.file)
      this.isShowLoading = true
      this.$http({
        method: 'post',
        url: this.baseUrl + 'teacher/course/chapter',
        data: formData 
      }).then(res => {
        if(res.data.code == 0) {
          this.isShowLoading = false
          this.$Message.success('添加节成功')
          this.jieName = ''
          let inputDOM = this.$refs.inputer;
          // 通过DOM取文件数据
          this.file = ''
          this.getSectionList()
        }
      })
    },
    sectionCancel() {
      this.isShowSection = false
    },
    // 根据课程courseId获取到章节列表
    getSectionList() {
      let courseId = this.$route.params.courseId
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-section/list?courseId=${courseId}`
      }).then(res => {
        if(res.data.code == 0) { // 有课程列表
          this.sectionList = this.toTreeData(res.data.data)
        } else {
          this.sectionList = []
        }
      })
    }
  }
}
</script>
<style lang="stylus">

</style>


