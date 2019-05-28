<template>
  <div id="app">
    <div class="f-header">
      <div class="f-header-box clearfix">
        <a href="/yourmooc/" class="logo" title="在线教育平台--yourmooc"></a>
        <nav class="header-nav">
          <span class="header-nav-item" @click="$router.push('index')">首页</span>
          <span class="header-nav-item" @click="$router.push('course_detail')">分类</span>
          <span class="header-nav-item" @click="$router.push('login')">我的</span>
          <span class="header-nav-item" @click="$router.push('login')">登录</span>
        </nav>
      </div>
    </div>
    <router-view/>
    <div class="f-footer">
      <div class="f-footer-box clearfix">
        <div class="footer-link">
          <a href="javascript:void(0)" target="_blank" title="企业合作">企业合作</a>
          <a href="javascript:void(0)" target="_blank" title="联系我们">联系我们</a>
          <a href="javascript:void(0)" target="_blank" title="常见问题">常见问题</a>
          <a href="javascript:void(0)" target="_blank" title="意见反馈">意见反馈</a>
          <a href="javascript:void(0)" target="_blank" title="友情链接">友情链接</a>
        </div>
        <div class="footer-copyright">
          <span>©&nbsp;2018&nbsp; 备案 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url(../static/css/reset.css)
</style>
