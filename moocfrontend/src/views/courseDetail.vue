<template>
  <div>
    <div class="f-main clearfix" style="position: relative;">
      <!-- 基本信息 -->
      <div class="main-course-left">
        <div class="course-info">
          <div class="course-title"> {{course.name}} </div>

          <div class="course-meta">

            <div v-if="!session_username || !curCourseSection">
              <div v-for="(section, index) in chaptSections" :key="index">
                <div v-if="index == 0">
                  <a href="javascript:void(0)" class="learn-btn" onClick="playVideo(section.id)">开始学习</a>
                </div>
              </div>
            </div>

            <div v-if="session_username &&curCourseSection.length">
              <a href="javascript:void(0)" class="learn-btn" onClick="playVideo(curCourseSection.id);">继续学习</a>
              <div class="static-item">
                <div class="meta">上次学到</div>
                <div class="meta-value"> {{curCourseSection.name}} </div>
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

            <div class="static-item" style="border:none;">
              <div class="meta">课程时长</div>
              <div class="meta-value"> {{course.time}} </div>
            </div>
            
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
            <input type="button" value="添加评价" class="btn" style="height: 30px;" @click="showModal">
          </div>

        </div>
        <!-- 基本信息-end -->

        <!-- 课程章节 - start -->
        <div id="courseSection" v-if="isComment == 'no'">
          课程
          <div v-if="!chaptSections">
            <div v-for="(chaptSection, index) in chaptSections" :key="index">
              <div class="chapter">
                <a href="javascript:void(0);" class="js-open">
                  <h3>
                    <strong>
                      <div class="icon-chapter">=</div>
                        {{chaptSection.name}} </strong>
                    <span class="drop-down">▼</span>
                  </h3>
                </a>

                <ul class="chapter-sub">
                  <div v-if="!chaptSection.sections">
                    <div v-for="(section, index) in chaptSection.sections" :key="index">
                      <a @click="playVideo(section.id)">
                        <li class="chapter-sub-li">
                          <i class="icon-video">▶</i> {{section.name}} ({{section.time}})
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
              <div class="user-name">
                <span>{{item.userName}}</span>
              </div>
              <div class="comment-conetnt">{{item.content}}</div>
              <div class="comment-footer">
                <span>{{item.time}}</span>
                <a>{{item.courseName}}</a>
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
            <span class="lecturer-name"> {{courseTeacher.username}} </span>
            <span class="lecturer-title"> {{courseTeacher.collegeName}} </span>
            <span class="lecturer-p"> {{courseTeacher.title}}，{{courseTeacher.sign}} </span>
          </div>
        </div>
      </div>
      <!-- 教师信息 - end -->

      <!-- 评价模态框 -->
      <div class="modal clearfix" v-if="isShowModal">
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
      </div>
      
    </div>
    <div class="mask" v-if="isShowModal" @click="submitComment"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: {
        name: '带您完成神秘的涟漪按钮效果-入门篇',
        studyCount: 5,
        level: 1,
        time: '2小时25分钟',
        score: '',
        brief: '这是一节xxx的课程',
        id: 1
      },
      courseTeacher: {
        username: '',
        collegeName: '',
        title: '',
        sign: '',
      },
      curCourseSection: {},
      session_username: '',
      isComment: 'no', // 默认展示章节
      chaptSections: [],
      commentList: [],
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
      isShowModal: false,
      comment: ''
    }
  },
  created() {
    this.course.id = this.$route.params.id
    this.getCourseDetail()
    this.getAllCommentList()
  },
  filters: {
    numFilter(value) {
      return parseFloat(value).toFixed(1)
    }
  },
  methods: {
    getCourseDetail() {
      this.$http.get(this.baseUrl + `course/detail?courseId=${this.course.id}`).then(res => {
        let data = res.data.data
        this.course = res.data.data
      })
    },
    getAllCommentList() {
      this.$http.get(this.baseUrl + `course-evaluation?course_id=${this.course.id}&page=1&limit=20`).then(res => {
        this.commentList = res.data.data
      })
    },
    showModal() {
      this.isShowModal = true
    },
    clickStar(item){
      item.type = !item.type
    },
    submitComment() {
      let postData = {
        comment: this.comment,
        score: this.stars.filter(item => item.type).length
      }
      // 在请求发送成功之后
      this.isShowModal = !this.isShowModal
    },
    /**
	 * 播放视频之前进行登录判断
   */
    playVideo( id) {
      if (!isLogin()) { // 没有登录则跳转到登录界面
        this.$router.push('/login')
      } else {
        location.href = "<%=path %>/course/video/" + id;
        this.$router.push('/')
      }
    },
    /**
     * 判断是否登录
     */
    isLogin() {
      var session_username = '${session_username}'; // session_storage 登录注册的时候获取到session存在浏览器中
      if (!session_username) {
        return false;
      }
      return true;
    }
  }
}
</script>
<style>
  .modal {
    width: 400px;
    height: 260px;
    background: #ffffff;;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
  }
  .mask {
    width: 100%;
    height: 100%;
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





