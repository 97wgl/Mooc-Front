<template>
  <div>
    <div class="f-main clearfix" style="position: relative;">
      <!-- 基本信息 -->
      <div class="main-course-left">
        <div class="course-info">
          <div class="course-title"> {{course.name}} </div>

          <div class="course-meta" style="display: flex; height: 50px;">
            <!-- 未登录 -->
            <div v-if="!isLogina || !studyed" style="padding-top: 25px;"> 
              <a href="javascript:void(0)" class="learn-btn" @click="playVideo(sectionList[0])">开始学习</a>
            </div>
            <!-- 上次学到 -->
            <div v-if="isLogina && studyed" style="display: flex;">
              <a style="margin-top: 20px;" href="javascript:void(0)" class="learn-btn" @click="playVideo(studyed);">继续学习</a>
              <div class="static-item">
                <div class="meta">上次学到</div>
                <div class="meta-value"> {{studyed['sectionName']}} </div>
              </div>
            </div>

            <div class="static-item">
              <div class="meta">学习人数</div>
              <div class="meta-value"> {{course.studyCount}} </div>
            </div>

            <div class="static-item">
              <div class="meta">难度级别</div>
              <div class="meta-value">
                <span>{{ course.level == 1 ? '初级' : course.level == 2 ? '中级' : '高级' }}</span>
              </div>
            </div>

            <!-- <div class="static-item" style="border:none;">
              <div class="meta">课程时长</div>
              <div class="meta-value"> {{course.time}} </div>
            </div> -->
            
            <div class="static-item" style="border:none;">
              <div class="meta">课程评分</div>
              <div class="meta-value"> {{course.score | numFilter}} </div>
            </div>
          </div>

          <div class="course-brief">
            {{course.brief}}
          </div>

          <div class="course-menu">
            <a @click="isComment = 'no'" style="cursor: pointer">
              <span :class="{ 'menu-item': true, 'cur': isComment == 'no'}" >章节</span>
            </a>
            <a @click="isComment = 'yes'" style="cursor: pointer">
              <span :class="{ 'menu-item': true, 'cur': isComment == 'yes'}">评论</span>
            </a>
            <input type="button" :value=" commented ? '已评价' : '添加评价'" :class="{'btn': true, 'bggray': commented}" @click="showModal" :disabled="commented">
          </div>

        </div>
        <!-- 基本信息-end -->

        <!-- 课程章节 - start -->
        <div id="courseSection" v-if="isComment == 'no'">
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
                      <a @click="playVideo(jie)">
                        <li class="chapter-sub-li">
                          <i class="icon-video">▶</i> {{jie.name}}
                        </li>
                      </a>
                    </div>
                  </div>
                </ul>

              </div>
            </div>
          </div>
        </div>
        <!-- 课程章节 - end -->

        <!-- 评论区 start -->
        <div id="comment" v-else>
          <div class="comment clearfix" v-for="(item, index) in commentList" :key="index">
            <div class="comment-header">
              <img class="lecturer-uimg" src="http://111.230.240.26:8080/yourmooc/resources/images/header.jpg">
            </div>
            <div class="comment-main">
              <div class="user-name" style="margin-bottom: 20px;">
                <span>{{item.username}}</span>
              </div>
              <div class="comment-conetnt">{{item.content}}</div>
              <div class="comment-footer">
                <span>{{item.time}}</span>
                <a>{{item.courseName}}</a>
              </div>
            </div>
            <div class="comment clearfix" style="padding-top: 20px; padding-left: 10px; border: 0; background: #d3d3d314;" v-if="item.isReply == 1">
              <!-- <div class="comment-header" style="width: 40px;">
                <img class="lecturer-uimg" src="http://111.230.240.26:8080/yourmooc/resources/images/header.jpg">
              </div> -->
              <div class="comment-main" style="padding-left: 10px;">
                <div class="user-name" style="margin-bottom: 20px;">
                  <span>{{item.teacherName}} 回复道：</span>
                </div>
                <div class="comment-conetnt">{{item.replyContent}}</div>
                <div class="comment-footer">
                  <span>{{item.replyTime}}</span>
                  <a>{{item.courseName}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 评论区 end -->

      </div>

      <!-- 教师信息 - start -->
      <div class="main-course-right">
        <div v-if="!courseTeacher.username">
          <div class="lecturer-item" style="width: 100%;">
            <img class="lecturer-uimg" src="../../static/images/header.jpg">
            <span class="lecturer-name"> {{courseTeacher.name}} </span>
            <span class="lecturer-title"> {{courseTeacher.orgnization}} </span>
            <span class="lecturer-p"> {{courseTeacher.position}}，{{courseTeacher.remark}} </span>
          </div>
        </div>
      </div>
      <!-- 教师信息 - end -->

      <!-- 评价模态框 -->
      <!-- <div class="modal clearfix" v-if="isShowModal">
        <div class="starts" style="display: flex;">
          <label>打分：</label>
          <div style="display: flex;">
            <div class="starXin" v-for="(item,index) in stars" :key='index' style="margin-right: 5px;">
              <img :src="item.type ? stara : starb " style="width: 20px; height: 20px;" @click="clickStar(item)"/>
            </div>
          </div>
        </div>
        <div style="position: relative; margin-top: 20px;">
          <span style="position: absolute;">评价内容：</span>
          <textarea rows="5" cols="30" style="margin-left: 80px;" v-model="comment"></textarea>
        </div>
        <div style="float: right; margin: 20px 0px;">
          <input type="button" value="提交评价" class="btn" style="height: 30px;" @click="submitComment">
        </div>
      </div> -->
      
    </div>
    <!-- <div class="mask" v-if="isShowModal" @click="isShowModal = !isShowModal"></div> -->
    <Modal
      v-model="isShowModal"
      title="提交评价"
      @on-ok="submitComment">
      <div class="starts" style="display: flex;">
        <label>打分：</label>
        <div style="display: flex;">
          <div class="starXin" v-for="(item,index) in stars" :key='index' style="margin-right: 5px;">
            <img :src="item.type ? stara : starb " style="width: 20px; height: 20px;" @click="clickStar(item)"/>
          </div>
        </div>
      </div>
      <div style="position: relative; margin-top: 20px;">
        <span style="position: absolute;">评价内容：</span>
        <textarea rows="5" cols="30" style="margin-left: 80px;" v-model="comment"></textarea>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: { // 课程详情
        id: 1,
        name:'',
        level: '',
        time: '',
        score: 0,
        brief: ''
      },
      courseTeacher: { // 教师信息
        username: '',
      },
      curCourseSection: {}, // 用户学习的当前章节
      isComment: 'no', // 默认展示章节
      commentList: [], // 评价列表
      stars:[{
        type: false
      },{
        type: false
      },{
        type: false
      },{
        type: false
      },{
        type: false
      }],
      stara: '../../static/images/followed.png',
      starb: '../../static/images/following.png',
      isShowModal: false, // 是否显示模态框
      comment: '', // 评价内容
      commented: false, // 是否评价过
      sectionList: [], // 章节列表
      // nodesData: [],
      isStudy: [],
      isLogina: false,
    }
  },
  computed: {
    studyed() {
      let data = ''
      this.isStudy.forEach(item => {
        if(item.courseId == this.$route.params.id) {
          data = item
        }
      })
      return data
    }
  },
  created() {
    this.course.id = this.$route.params.id
    this.getCourseDetail() // 课程详情页
    this.getAllCommentList() // 评论页
    this.getCommentStatus() // 查看评价状态
    this.isLogina = this.isLogin() 
    this.getStudyList() // 获取学习记录
  },
  filters: {
    numFilter(value) {
      return parseFloat(value).toFixed(1)
    }
  },
  methods: {
    // 获取学习记录
    getStudyList() {
      let user = JSON.parse(sessionStorage.getItem('Authorization'))
      this.$http({
        method: 'get',
        url: this.baseUrl + `study-record/list?userId=${user.id}&courseId=${this.$route.params.id}`
      }).then(res => {
        if(res.data.code == 0) {
          this.isStudy = res.data.data // 有学习
        }else {
          this.isStudy = []
        }
      })
    },
    getCourseDetail() { // 获取课程详情
      this.$http.get(this.baseUrl + `course/detail?courseId=${this.$route.params.id}`).then(res => {
        if(res.data.code == 0) {
          let data = res.data.data
          this.course = res.data.data
          this.getTeacherDetail(res.data.data.teaId)
          this.getAllSectionList()
        }
        
      })
    },
    getAllCommentList() { // 获取所有的评论
      this.$http.get(this.baseUrl + `course-evaluation?course_id=${this.$route.params.id}&page=1&limit=20`).then(res => {
        this.commentList = res.data.data
      })
    },
    getTeacherDetail(id) { // 获取教师详情
      // 根据teaId获取teacher信息
      this.$http({
        method: 'get',
        url: this.baseUrl + `teacher/info?teacherId=${id}`
      }).then(res => {
        if(res.data.code == 0) {
          this.courseTeacher = res.data.data
        }
        
      })
    },
    getAllSectionList() { // 获取所有的章节
      this.$http({
        method: 'get',
        url: this.baseUrl + `course-section/list?courseId=${this.$route.params.id}`
      }).then(res => {
        if(res.data.code == 0 && res.data.data.length)
        this.sectionList = this.toTreeData(res.data.data)
      })
    },
    getCommentStatus() {
      if(sessionStorage.getItem('Authorization')) {
        let user = JSON.parse(sessionStorage.getItem('Authorization'))
        this.$http({
          method: 'get',
          url: this.baseUrl + `course-evaluation/status?uId=${user.id}&courseId=${this.$route.params.id}`
        }).then(res => {
          // 没评价给0 评价了给-1
          if(res.data.code == 0) {
            this.commented = false
          }else {
            this.commented = true
          }
        })
      }
    },
    showModal() {
      if (!this.isLogin()) { // 没有登录则跳转到登录界面
        this.$router.push('/login')
      } else {
        this.isShowModal = true
      }
    },
    clickStar(item){
      item.type = !item.type
    },
    submitComment() {
      
      // if(!this.comment || !this.score) return // 非空判断 
      console.log('111')
      let postData = {
        u_id: JSON.parse(sessionStorage.getItem('Authorization')).id,
        course_id: this.$route.params.id, 
        content: this.comment,
        score: this.stars.filter(item => item.type).length
      }
      this.$http({
        method: 'post',
        url: this.baseUrl + 'course-evaluation',
        data: this.transformRequest(postData)
      }).then(res => {
        if(res.data.code == 0) {
          this.$Message.success('评价成功')
          this.isShowModal = !this.isShowModal
          this.getAllCommentList()
          // 请求该用户是否已经评论该课程
          this.getCommentStatus()
        }else {
          this.$Message.success('评价失败')
        }
      })
    },
    /**
	 * 播放视频之前进行登录判断
   */
    playVideo(id) {
      if (!this.isLogin()) { // 没有登录则跳转到登录界面
        this.$router.push('/login')
      } else { // 点击跳转到视频详情页时，暂存视频信息
        id.courseId = this.$route.params.id
        sessionStorage.setItem('video_detail', JSON.stringify(id))
        this.$router.push(`/sections_detail/${id.sectionId}`)
      }
    },
    
  }
}
</script>
<style>
  .bggray {
    background: lightgray;
  }
  .modal {
    width: 400px;
    height: 260px;
    background: #ffffff;;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
  }
  .mask {
    width: 100%;
    height: 2000px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: black;
    opacity: 0.3;
  }
  .cleanfloat::after {
    display: block; 
    clear: both; 
    content:""; 
    visibility: hidden; 
    height: 0;
  }
  ul.cleanfloat li {
    list-style:none; 
    float:left; 
    font-size:30px; 
    margin:5px; 
    color:#ccc; 
    cursor:pointer;
  }
  .hs,.cs {
    color:#f00;
  }
    
</style>





