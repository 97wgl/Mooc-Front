<template lang="jade">
  div
    h2 课程详情页
    Form(style="width: 40%; margin-left: 60px; margin-top: 20px;")
      h3(style="font-size: 18px; font-weight: bold; margin-bottom: 20px;") 章节信息
      div(v-for="(section, $index) in sectionList", :key="$index", style="padding: 20px;background: #d3d3d329; margin-bottom: 20px;")
        h3(style="margin-bottom: 30px") 章节 {{$index+1}}
        div(v-for="(jie, index) in sectionList[$index]", :key="index", style="margin-bottom: 20px;")
          h3 第 {{index + 1}} 节
            //- Input(v-model="room.name", :disabled="edit")
          <input type="file">
        Button(type="primary", size="small", @click="jieAdd($index)", style="margin-bottom: 20px;",icon="plus-round") + 新增视频
      Button(type="primary", size="small", @click="sectionAdd", style="margin-top: 20px;") + 新增章节
      div(style="margin-top: 60px; float: right;")
        Button(type="success") 保存
</template>
<script>
export default {
  data() {
    return {
      sectionList: [[
        {

        }
      ]],
      course: [
        {}
      ]
    }
  },
  methods: {
    sectionAdd() { // 添加章节
      this.sectionList.push([])
      console.log('添加章', this.sectionList)
    },
    jieAdd(index) {
      console.log('index', index)
      // this.jieList.push({})
      this.sectionList[index].push({})
      console.log('添加节', this.sectionList)
    }
  }
}
</script>
<style lang="stylus">

</style>


