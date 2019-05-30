<template>
  <div class="siderBar">
    <div class="f-main clearfix">
      <div class="setting-left">
        <img id="userNavHeader" class="setting-header" src="../../static/images/header.jpg">
        <div class="split-line" style="margin-bottom: 20px;"></div>
        <ul class="user-menu-nav-block">
          <a href="javascript:void(0)">
            <li v-for="(item,index) in items":key="index" v-bind:class="{'user-menu-nav-cur':item.isActive,'user-menu-nav':!item.isActive}"
             @click="switchTab(item.index,index)">
              {{ item.title }}<span style="color: rgb(119, 119, 119);">&gt;</span>
            </li>
          </a>
        </ul>
      </div>
      <div class="content">
        <transition name="move" mode="out-in"><router-view></router-view></transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[
        {title: "个人信息",index: "myArea",isActive:1},
        {title: "修改密码",index: "modifyPassword",isActive:0}
      ]
    }
  },
  methods: {
    switchTab(index,idx){
      this.$router.push(''+index);
      this.items.map((item,index)=>{
        if(index == idx){
          item.isActive = 1;
        }else{
          item.isActive = 0;
        }
      })
    }
  },
  created() {
    if(!sessionStorage.getItem('Authorization')){
      this.$router.push('/login');
    }
  },
}
</script>