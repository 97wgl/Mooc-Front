<template lang="jade">
  div.layout
    div(style="background-color: #2d8cf0")
      Menu(mode="horizontal", theme="primary",  :active-name="activePath", @on-select="menuRoute")
        .layout-nav
          //- img.keep-logo(src="./img/keep-logo.png")
          //- Menu-item(name="gym_list")
          //-   Icon(type="home")
          //-   |健身房管理
          div
            Menu-item(name="course_list")
              Icon(type="home")
              |课程管理
            Menu-item(name="coach_list")
              Icon(type="person-stalker")
              |留言管理
            Menu-item(name="vip_list")
              Icon(type="home")
              |评价管理
            Menu-item(name="equipment_reservation_management")
              Icon(type="home")
              |个人信息管理
          Dropdown(class="nav-right-menu", placement="bottom-end", @on-click="logout")
            a(href="javascript:void(0)", style="color:#fff;")
              | {{ user.userInfo }}
              Icon(type="person")
            DropdownMenu(slot="list")
              DropdownItem(name="logout") 注销
    //-   Menu(mode="horizontal", theme="primary",  :active-name="activePath", @on-select="menuRoute", v-if="user.type == 'user'")
    //-     .layout-nav(v-if="user.username")
    //-      
</template>

<script>

export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    activePath: function(){
      if (this.$route.matched.length > 1) {
         // 二级路由
        return this.$route.matched[0].name;
      } else {
        if (this.$route.name) {
          return this.$route.name
        }
      }
    }
  },
  created() { // 每次刷新页面，执行以下代码
    // 检验进入任何页面之前是否有登录，如果登录了，那么存入Authorization
     if (sessionStorage.getItem('Authorization')) { // 如果登陆了
      let postData = sessionStorage.getItem('Authorization'); // 拿到登录返回的结果，
      this.user = JSON.parse(postData)
      console.log('this.userInfo头部', this.user)
      // 根据权限的不同展示不同

      // this.$http({
      //   method:'post',
      //   url:this.$util.baseUrl+'users/userLogin',
      //   data:{
      //     username:this.postDatas.username,
      //     userpwd:this.postDatas.userpwd,
      //     type: this.postDatas.type
      //   }
      // }).then(res => {
      //   if(res.data.code == '800000') {
      //     localStorage.setItem('Authorization', JSON.stringify(res.data.data)); // 登录成功即将返回值保存
      //     this.$store.commit('setUser', {
      //       username: this.postDatas.username,
      //       type: this.postDatas.type
      //     });
      //   }else { // 登录失败
      //   }
      // }).then((err) => {
      //   console.log(err)
      // })
     }else { // 未登录
      this.gotoLogin();
     }
  },
  methods: {
    menuRoute(name) {
      // console.log(name, this.$router);
      this.$router.push(`/${name}`);
    },
    // // 跳转到登录界面
    gotoLogin() {
      sessionStorage.setItem('Authorization', {type: 'user'});
      this.$router.push('/login');
    },
    // // 注销
    logout(name) {
      if (name === 'logout') {
        this.gotoLogin();
      }
    }
  },
};
</script>

<style lang="stylus">
body, html, .layout
  height: 100%
.layout
  display: -webkit-box
  -webkit-box-orient: vertical
.ivu-menu-primary
  background #e6e6e6
  div
    height 100%
    display flex
    align-items center
    justify-content space-between
  .ivu-menu-item
    color black !important
  .nav-right-menu
    a
      color black !important
h2
  margin-bottom: 20px
  font-size: 16px
.page-wrapper
  margin-top: 18px
  text-align: right
.form-title
  margin-bottom: 20px
  padding: 10px 0 10px 17px
  border-left: 3px solid #dddee1
  background: #e8ecf4
  font-size: 13px
  font-weight: bold

.markdown-display
  color: #666
  line-height: 1.46
  p
    margin-bottom: 14px
  img
    width: 100%
    display: block
    margin-bottom: 14px
  ul, ol
    margin-bottom: 14px
  ol
    list-style-type: decimal
    list-style-position: inside
  h1
    font-size: 25px
    font-weight: normal
    margin-bottom: 20px
  h3, h4
    margin-bottom: 10px

.cover-wrap
  .cover-item
    width: 100px
    height: 100px
    margin-right: 15px
    display: inline-block
    text-align: center
    .img
      border-radius: 3px
      display: block
      padding-bottom: 100%
      background-position: center center
      background-repeat: no-repeat
      background-size: contain
    .delete-btn
      position: absolute
      z-index: 10
      background: rgba(0, 0, 0, .5)
      padding: 6px 9px
      right: 0
      top: 0
      color: #fff
      cursor: pointer
      display: none
    .cover-btn
      position: absolute
      background: rgba(0, 0, 0, .5)
      padding: 0 4px
      font-size: 12px
      line-height: 26px
      left: 0
      top: 0
      color: #fff
      display: none
      cursor: pointer
    .first-cover-tip
      position: absolute
      padding: 0 4px
      font-size: 12px
      left: 0
      text-align: center
      right: 0
      bottom: -30px
      font-weight: bold
    &:hover
      .delete-btn
        display: block
      .cover-btn
        display: block
  .upload-item
    display: inline-block
    color: #3399ff
    .upload-inner
      width: 98px
      height: 98px
      padding-top: 20px
      line-height: 1.5rem

.user-item
  display: -webkit-box
  -webkit-box-align: center
  >span
    display: block
  .name
    padding-left: 6px
    display: -webkit-box

.each-user-item
  display: inline-block
  padding: 3px 6px 3px 0
  .name
    padding-left: 6px


.empty-wrap
  display: -webkit-box
  -webkit-box-pack: center
  margin-top: 100px

.markdown-input
  textarea
    background: #f3f5f6 !important
</style>

<style lang="stylus" scoped>
.nav-right-menu
  float: right
  margin-right: 20px
  i
    margin-left: 10px
.layout
  background: #f5f7f9;
.keep-logo
    width: 83px
    float: left
    position: relative
    top: 20px
    left: 10px
.keep-title
  margin-left 20px
  font-size: 22px
  color: #fff
.layout-nav
  margin-left: 40px
.layout-content
    margin: 15px
    padding: 15px 15px
    overflow: hidden
    background: #fff
    border-radius: 4px
    -webkit-box-flex: 1
    overflow-y: auto
    position: relative
.layout-copy
  text-align: center
  height: 32px
  color: #9ea7b4
  border-bottom: 1px solid #d7dde4
@media (max-width: 1320px)
  .layout-nav
    margin-left: 0px
    .ivu-icon
      display: none
@media (max-width: 1000px)
  .layout-nav
    margin-left: 0px
    li
      padding 0 10px
      font-size 12px
</style>

