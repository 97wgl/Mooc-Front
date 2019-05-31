<template>
  <div class="setting-right">
		<div><span class="f-16">最近学习</span></div>
		<div class="split-line" style="margin: 20px 0px;"></div>
    <div v-if="nullMsg" class="nullDiv">{{nullMsg}}</div>
		<div v-for="item in recentCourseList">
      <div class="comment clearfix">
        <div class="comment-main" style="width: 100%">
          <a href="javascript:void(0)" class="user-name link-a" style="font-size:20px;">{{item.className}}</a>
          <div class="comment-content">
            <span>
              <a href="javascript:void(0)">{{item.sectionName}}</a>
            </span>
					</div>
          <div class="comment-footer">
            <span>时间：{{item.latesTime}}</span>
            <a href="javascript:void(0)">
              <span class="continue-btn" style="margin-left: 600px;border-radius: 25px;">继续学习</span>
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
      recentCourseList: [
        {
          className:'带您完成神秘的涟漪按钮效果-入门篇',
          sectionName: '1-1 使用RecyclerView优雅实现复杂布局-课程介绍',
          latesTime: '2019-05-31 13:02:25'
        },
        {
          className:'带您完成神秘的涟漪按钮效果-入门篇',
          sectionName: '1-1 使用RecyclerView优雅实现复杂布局-课程介绍',
          latesTime: '2019-05-31 13:02:25'
        }
      ]
    }
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('Authorization'));
    this.userId = userInfo.id;
    this.$http({
      method: 'get',
      url: this.baseUrl+'study-record/list?'+this.transformRequest({
        'userId': '1'
      })
    }).then(res=>{
      let data = res.data;
      if(data.code == -1){
        this.nullMsg = data.msg;
      }else if(data.code == 0){
        // this.recentCourseList = data.data.concat();
      }
    })
  },
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
