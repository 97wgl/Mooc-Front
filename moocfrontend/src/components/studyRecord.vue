<template>
  <div class="setting-right">
		<div><span class="f-16">最近学习</span></div>
		<div class="split-line" style="margin: 20px 0px;"></div>
    <div v-if="nullMsg" class="nullDiv">{{nullMsg}}</div>
		<div v-for="(item, index) in recentCourseList" :key="index">
      <div class="comment clearfix">
        <div class="comment-main" style="width: 100%">
          <a @click="jumpToCourse(item.courseId)" class="user-name link-a" style="font-size:20px;">{{item.courseName}}</a>
          <div class="comment-content">
            <span>
              <a @click="jumpToSection(item.sectionId)">{{item.sectionName}}</a>
            </span>
					</div>
          <div class="comment-footer">
            <span>时间：{{item.latesTime}}</span>
            <a href="javascript:void(0)">
              <span class="continue-btn" style="margin-left: 600px;border-radius: 25px;" @click="jumpToSection(item.sectionId)">继续学习</span>
						</a>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      nullMsg: '',
      recentCourseList: []
    }
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('Authorization'));
    this.$http({
      method: 'get',
      url: this.baseUrl + `study-record/list?userId=${userInfo.id}`
    }).then(res=>{
      let data = res.data;
      if(data.code == -1){
        this.nullMsg = data.msg;
      }else if(data.code == 0){
        this.recentCourseList = res.data.data;
      }
    })
  },
  methods: {
    jumpToSection(sectionId) {
      this.$router.push(`/sections_detail/${sectionId}`)
    },
    jumpToCourse(courseId) {
      this.$router.push(`/course_detail/${courseId}`)
    }
  }
}
</script>

<style scope>
.nullDiv{
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 200px auto;
}
</style>
