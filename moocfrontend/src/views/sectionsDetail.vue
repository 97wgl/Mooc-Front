<template>
  <div>
    <div class="f-main clearfix">
      <div class="main-course-left">
        <div class="course-info">
          <div class="course-title" style="font-size: 24px;"> {{video.name}} </div>

          <div class="course-video">
            <video :src="'http://192.168.1.107:8080/'+video.videoUrl" width="100%" height="100%" controls
                  preload @play="isPlay">
            </video>

          </div>

          <div class="course-menu">
            <a href="javascript:void(0)" style="margin-top: 20px;">
              <span onclick="_queryPage(1)" class="menu-item  cur" style="margin-top: -20px;">留言</span>
            </a>
          </div>
        </div>

        <!-- 留言展示-start  -->
        <div>
          <div>
            <div v-for="(item, index) in messageList" :key="index" class="clearfix">
              <div class="comment clearfix">
                <div class="comment-header">
                  <img class="lecturer-uimg"
                      src="http://111.230.240.26:8080/yourmooc/resources/images/header.jpg">
                </div>
                <div class="comment-main">
                  <div class="user-name">{{item.username }}</div>
                  <div class="comment-content">{{item.content }}</div>
                  <div class="comment-footer">
                    <span>时间：{{item.createTime }}</span> 
                    <a href="">{{item.courseName }}</a>
                  </div>
                </div>
                <div class="btn" style="float: right; cursor: pointer; line-height: 35px;" disabled @click="replyMessage(item, 0)"> 回复层主</div>
              </div>
              <div class="reply" v-for="(reply, index) in item.courseCommentReplyVOList" :key="index">
                <div class="comment-main" style="background: #d3d3d326; margin-bottom: 10px; float: left;margin-left: 80px;">
                  <div class="user-name">{{reply.replyUName }} 回复 {{ reply.replyToUName }}</div>
                  <div class="comment-content">{{reply.content }}</div>
                  <div class="comment-footer">
                    <span>时间：{{reply.createTime }}</span> 
                  </div>
                  <div class="btn" style="float: right; cursor: pointer; line-height: 35px;" disabled @click="replyMessage(reply, 1, item)"> 回复</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 发布留言-start -->
        <div style="margin-top: 20px;">
          <div>
            <span id="commentTitle">发布留言：</span>
            <span id="commentTip" style="margin-left: 10px; color: #777;">长度小于200</span>
            <span id="errorMsg" style="margin-left: 10px; color: red;display: none;"></span>
          </div>
          <form id="commentForm" style="margin: 5px 0px;">
            <textarea id="content" name="content" rows="5" cols="112" v-model="comment"></textarea>
            <div class="clearfix">
              <input type="button" value="发布" class="btn" @click="handleComment">
            </div>
          </form>
        </div>

        <!-- 发布留言-end -->
      </div>

      <!-- 章节-start -->
      <div class="main-course-right">
        <h4 class="mt-50" style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">所有章节</h4>
        <div class="video-course-fix-parent">
          <div class="video-course-fix">
            <div>
              <div v-for="(item,index) in sectionList" :key="index">
                <div class="chapter" style="padding: 0px ;border: none;">
                  <a href="javascript:void(0);" :class="{'js-open': true, 'marginTop': index == 0}">
                    <h3>
                      <strong> {{item.name}} </strong>
                      <span class="drop-down">▼</span>
                    </h3>
                  </a>
                  <ul class="chapter-sub" style="padding-left:10px;">
                    <div>
                      <div v-for="(jie, index) in item.children" :key="index">
                        <a @click="playVideo(jie)">
                          <li class="ellipsis  video-li"><i class="icon-video">▶</i> {{jie.name}} ({{jie.time}})</li>
                        </a>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 章节-end -->
    </div>
    <!-- <div class="mask" v-if="isShowModal" @click="isShowModal = !isShowModal"></div> -->
    <!-- <div class="modal clearfix" v-if="isShowModal">
      <div style="position: relative; margin-top: 20px;">
        <span style="position: absolute;">回复内容：</span>
        <textarea rows="5" cols="30" style="margin-left: 80px;" v-model="replyContent"></textarea>
      </div>
      <div style="float: right; margin: 20px 0px;">
        <input type="button" value="提交回复" class="btn" style="height: 30px;" @click="submitReply">
      </div>
    </div> -->
    <Modal
        v-model="isShowModal"
        title="回复留言"
        @on-ok="submitReply">
        <span>回复内容：</span>
        <textarea rows="5" cols="30" style="margin-left: 80px;" v-model="replyContent"></textarea>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video: {}, // 视频信息
      sectionList: [], // 章节列表
      messageList: [], // 留言列表
      comment: '', // 留言内容
      isShowModal: false,
      replyContent: '', //回复留言内容
      status: 0,
    }
  },
  created() {
    this.getSectionDetail()
  },
  methods: {
    isPlay() { //this.$route.params.sectionId   this.course.id=this.video.courseId  
      let user = JSON.parse(sessionStorage.getItem('Authorization')) 
      let postData = {
        userId: user.id,
        courseId: this.video.courseId,
        sectionId: this.$route.params.sectionId
      }
      this.$http({
        method: 'post',
        url: this.baseUrl + 'study-record/',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success('生成学习记录')
        }
        
      })
    },
    handleComment () { // 提交留言 uId courseId sectionId content
      let uId = JSON.parse(sessionStorage.getItem('Authorization')).id
      let courseId = this.video.courseId
      let sectionId = this.$route.params.sectionId
      let postData = {
        uId: uId,
        courseId: courseId,
        sectionId: sectionId,
        content: this.comment,
      }
      this.$http({
        method: 'post',
        url: this.baseUrl + 'course-comment',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
          this.getAllMessage() // 获取所有留言
          this.isShowModal = false
        }else {
          this.$Message.error(res.data.msg)
          
        }
      })
    },
    replyMessage(item, status, cengzhu) { // 回复留言模态框显示， 
      this.isShowModal = true
      if(!cengzhu) { // 是层主
        this.cengzhu = item.id
      }else { // 不是层主
        this.cengzhu = cengzhu.id
      }
      sessionStorage.setItem('reply', JSON.stringify(item)) // 存在session中
      this.status = status // 是否是层主
    },
    submitReply(status) {
      let postData = JSON.parse(sessionStorage.getItem('reply'))
      let uId = JSON.parse(sessionStorage.getItem('Authorization')).id
      let type = JSON.parse(sessionStorage.getItem('Authorization')).type
      // 根据点击的热区不同，被回复者编号不同。如果是楼主，被回复者编号为uId 如果是楼员，被回复者编号为replyUId
      let post = {
        commentId: this.cengzhu,
        replyUId: uId,  // 回复者Id // uId 和 teaId需要区分
        replyToUId: this.status == 0 ? postData.uId : postData.replyUId, // 被回复者编号 
        content: this.replyContent, // 回复内容
        type: type
      }
      this.$http({
        method: 'post',
        url: this.baseUrl + 'course-comment-reply',
        data: this.transformRequest(post)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success(res.data.msg)
          this.getAllMessage()
          this.isShowModal = false
          this.comment = ''
        }else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    getAllSectionList() { // 获取所有的章节
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-section/list?courseId=${this.video.courseId}`
      }).then(res => {
        this.sectionList = this.toTreeData(res.data.data)
      })
    },
    playVideo(id) {
      id.courseId = this.video.courseId
      sessionStorage.setItem('video_detail', JSON.stringify(id))
      window.location.reload()
    },
    // 获取所有留言
    getAllMessage() {
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-comment/section/all?courseId=${this.video.courseId}&sectionId=${this.$route.params.sectionId}`
      }).then(res => {
        this.messageList = res.data.data
      })
    },
    // 根据sectionId获取到章节详情内容
    getSectionDetail() {
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-section/info?courseSectionId=${this.$route.params.sectionId}`
      }).then(res => {
        if(res.data.code == 0) {
         this.video = res.data.data
         this.getAllSectionList()
         this.getAllMessage()
        }
      })
    }
  },
  
}
</script>
<style>
  .marginTop {
    margin-top: 20px; 
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
</style>

