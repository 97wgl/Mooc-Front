<template>
  <div class="index">
    <div class="f-main">
      <div class="clearfix">
        <swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper" v-if="goodCourseList.length!=0">
          <swiper-slide v-for="(item,index) in goodCourseList" :key="index" >
            <img :src="baseUrl+item.picture" alt="课程" />
          </swiper-slide>
          <!-- 小圆点 -->
          <div class="swiper-pagination" v-for="(item,index) in goodCourseList" :key="index" slot="pagination" ></div>
        </swiper>
      </div>

      <!-- 免费好课-start -->
      <div class="types-block clearfix">
        <h3 class="types-title">好课推荐</h3>
        <div v-for="(item,index) in goodCourseList" class="types-content">
          <a href="javascript:void(0)">
            <div v-bind:class="{'course-card-container':1,'course-card-last':index==4}">
              <div v-bind:class="{'course-card-top':1,'brown-bg':index==0,'gray-bg':index==1,'purple-bg':index==2,'pink-bg':index==3,'green-bg':index==4}" >
                <span>{{item.classify}}</span>
              </div>
              <div class="course-card-content">
                <h3 class="course-card-name">{{item.name}}</h3>
                <p>{{item.brief}}</p>
                <div class="course-card-bottom">
                  <div class="course-card-info">
                    {{getLevel(item.level)}}
                    <span>·</span>{{item.studyCount}}人在学
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!-- 免费好课-end -->

      <!-- java课程-start -->
      <div class="types-block clearfix">
        <h3 class="types-title">Java开发工程师</h3>
        <a href="javascript:void(0)">
					<div class="types-content-left" style="background-image: url(../../../../static/images/58ac18fd00012a4202240348.jpg);">
						<div class="course-card-container-fix">
							<div class="course-card-content">
								<h1 class="course-card-name"> 带您完成神秘的涟漪按钮效果-入门篇 </h1>
								<p class="color-fff">安卓声音录制与播放功能实现，包括录制到文件、播放文件 <p>
								<div class="course-card-bottom" style="margin-top: 50px;">
									<div class="course-card-info color-fff">了解详情 →</div>
								</div>
							</div>
						</div>
					</div>
				</a>
        <div class="types-content-right ">
          <div class="types-content-banner ">
            <a href="javascript:void(0)">
              <div class="types-content-banner-block green-bg" style="margin-right:20px">
                JSP常用标签
              </div>
            </a>
            <a href="javascript:void(0)">
              <div class="types-content-banner-block gray-bg">
                Java 分页原理与实践
              </div>
            </a>
          </div>
          <div class="clearfix">
            <a v-for="n in 4" href="javascript:void(0)">
              <div v-bind:class="{'course-card-container':1,'course-card-last':n==4}">
                <div class="course-card-top green-bg">
                  <span> Java </span>
                </div>
                <div class="course-card-content">
                  <h3 class="course-card-name" title="Dwr实现JAVA服务器端向客户端推送消息"> Dwr实现JAVA服务器端向客户端推送消息 </h3>
                  <p title="dwr轻松帮你实现server push。"> dwr轻松帮你实现server push。 </p>
                  <div class="course-card-bottom">
                    <div class="course-card-info">高级<span>·</span>0人在学</div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- java课程-end -->

      <!--名校讲师-start -->
      <div class="types-block clearfix">
        <h3 class="types-title">名校讲师</h3>
        <div v-for='(item,index) in recomdTeacherList'>
          <div v-bind:class="{'lecturer-card-container':1,'course-card-last':index==4}">
            <div class="lecturer-item">
              <img class="lecturer-uimg" src="../../static/images/header.jpg">
              <span class="lecturer-name">{{item.name}}</span>
              <span class="lecturer-title">{{item.orgnization}}</span>
              <span class="lecturer-p"> {{item.position}} {{item.remark}} </span>
            </div>
          </div>
        </div>
      </div>
      <!--名校讲师-end -->
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
import axios from 'axios';

export default {
  data() {
    const that = this;
    return {
      carouselList: [],
      goodCourseList: [],
      recomdTeacherList: [],
      imgIndex: 1,
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800,
        direction: "horizontal",
        grabCursor: true,
        on: {
          slideChangeTransitionStart: function() {
            that.imgIndex= this.realIndex - 1;
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  methods: {},
  computed: {
    getLevel(){
      return function(level){
        if(level == "1") return "初级";
        else if(level == "1") return "中级";
        else return "高级"
      }
    }
  },
  created() {
    this.$http.get(this.baseUrl + "course/carousel").then(response => {
      if(response.data && response.data.data){
        let courseData = response.data.data;
        if(courseData.length > 5){
          this.goodCourseList = courseData.slice(0,5);
        }else{
          this.goodCourseList = courseData.concat();
        }
      }   
    }).catch(error => {
      console.log(error);
    });
    this.$http.get(this.baseUrl + "teacher/famous").then(response => {
      if(response.data && response.data.data){
        let teacherData = response.data.data;
        if(teacherData.length > 5){
          this.recomdTeacherList = teacherData.slice(0,5);
        }
        else{
          this.recomdTeacherList = teacherData.concat();
        }
      }   
    }).catch(error => {
      console.log(error);
    });
  },
  components: {
    swiper,swiperSlide
  }
};
</script>
<style>
</style>



