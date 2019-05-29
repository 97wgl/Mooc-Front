<template>
  <div class="index">
    这是首页
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      carouselList: [],
      goodCourseList: [],
      javaCourseList: [],
      recomdTeacherList: []
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.$store.commit('setUser', value)
      }
    },
  },
  methods: {

  },
  created() {
    console.log('user 首页', this.user)
  }
}
</script>
<style>

</style>



