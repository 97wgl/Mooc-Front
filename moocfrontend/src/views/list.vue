<template>
  <div>
    <div class="f-main clearfix">
      <!-- 一级分类-start -->
      <div class="course-nav-row clearfix">
        <span class="hd">分类</span>
        <ul class="course-nav">
          <li class="course-nav-item " v-for="(item,index) in firstLevelList" :key="index"
           v-bind:class="{'cur-course-nav':item.isActive}"> 
           <a @click="switchClassify(item.title,index)">{{item.title}}</a></li>
        </ul>
      </div>
      <!-- 一级分类-end -->

      <!-- 课程列表-start -->
      <div class="types-block clearfix" style="padding:0px;">
        <h3 style="margin-bottom: 20px;">
          <span class="types-title" style="margin-right:40px;">课程列表</span>
          <a style="display: inline-block;margin-right:20px;">
            <span v-bind:class="{'color-oc':isSelectedNew}" @click="switchTag()">最新</span>
          </a>
          <a style="display: inline-block;">
            <span v-bind:class="{'color-oc':!isSelectedNew}" @click="switchTag()">最热</span>
          </a>
        </h3>
        <div class="types-content clearfix" style="margin-bottom: 20px;">
          <div v-for="(item,index) in courseList" @click="JumpToCourseDetail(item.courseId)" :key="index" v-bind:class="{'course-card-container':1,'course-card-last':(index+1)%5==0}">
            <div class="course-card-top brown-bg"><span>{{item.classify}}</span></div>
            <div class="course-card-content">
              <h3 class="course-card-name">{{item.name}}</h3>
              <p>{{item.brief}}</p>
              <div class="course-card-info">
                {{getLevel(item.level)}}<span>·</span>{{item.studyCount}}人在学
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 课程列表-end -->
    </div>
  </div>
</template>

<script> 
export default {
  data(){
    return {
      firstLevelList: [
        {title: '全部',isActive: 1},
        {title: '前端开发',isActive: 0},
        {title: '后端开发',isActive: 0},
        {title: '移动开发',isActive: 0},
        {title: '算法',isActive: 0},
        {title: '前沿技术',isActive: 0},
        {title: '云计算',isActive: 0},
        {title: '大数据',isActive: 0},
        {title: '运维',isActive: 0},
        {title: '测试',isActive: 0},
        {title: '数据库',isActive: 0},
        {title: 'UI设计',isActive: 0},
        {title: '多媒体',isActive: 0},
      ],
      courseList:[],
      isSelectedNew: 1,
      classifyName: ''
    }
  },
  methods: {
    JumpToCourseDetail(courseId) {
      this.$router.push(`/course_detail/${courseId}`)
    },
    switchClassify(title,index){
      this.isSelectedNew = 1;
      this.firstLevelList.map((item,idx)=>{
        if(idx == index){
          item.isActive = 1;
        }else{
          item.isActive = 0
        }
      });
      if(title != "全部"){
        this.classifyName = title;
        this.getClassifiedCourse(title,'1');
      }else{
        this.classifyName = '';
        this.getAllCourse(1);
      }
    },
    switchTag(){
      this.isSelectedNew = !this.isSelectedNew;
      if(this.isSelectedNew){
        if(this.classifyName == ''){
          this.getAllCourse(1);
        }else{
          this.getClassifiedCourse(this.classifyName,1);
        }
      }else{
        if(this.classifyName == ''){
          this.getAllCourse(2);
        }else{
          this.getClassifiedCourse(this.classifyName,2);
        }
      }
    },
    getClassifiedCourse(title,tag){
      this.$http({
        method: 'get',
        url: this.baseUrl + 'course/list?'+this.transformRequest({'classify':title,'tag':tag})
      }).then(res => {
        if(res.data.code == 0){
          this.courseList = res.data.data.concat();
        }else{
          this.courseList = [];
        }   
      }).catch(error => {
        console.log(error);
      });
    },
    getAllCourse(tag){
      this.$http({
        method: 'get',
        url: this.baseUrl + 'course/list?'+this.transformRequest({'tag':tag})
      }).then(res=>{
        if(res.data.code == 0){
          let allCourse = res.data.data.concat();
          this.courseList = allCourse.concat();
        }else{
          this.courseList = [];
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  computed: {
    getLevel(){
      return function(level){
        if(level == "1") return "初级";
        else if(level == "2") return "中级";
        else return "高级"
      }
    }
  },
  created() {
    this.$http({
      method: 'get',
      url: this.baseUrl + 'course/list?'+this.transformRequest({'tag':'1'})
    }).then(res=>{
      if(res.data && res.data.data){
        let allCourse = res.data.data.concat();
        let titleList = [...new Set(allCourse.map(item=>item.classify))];
        this.courseList = allCourse.concat();
      }
    }).catch(error => {
      console.log(error);
    });
  },
}
</script>
