<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!--  isHidden为true表示要隐藏 所以要取反-->
    <Footer v-show="!$route.meta.isHidden"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
   components:{Header,Footer},
  mounted(){
    //在这获取三级分类请求 这里只会发一次（优化）因为app只会创建一次
    //如果在typeNav里面发 每次都要重新发一次 效果不好
    // 本质是调用actions函数
    this.$store.dispatch('getStegoryList')
    
    },
}
</script>

<style scoped>

</style>