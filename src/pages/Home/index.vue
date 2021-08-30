<template>
    <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/> 
      <Rank/>
      <Like/>
<!--      利用for遍历生成footer组件 然后 将数据floor当做props传入-->
      <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"/>
      <Brand/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  
  import ListContainer from './ListContainer'
  import Recommend from './Recommend'
  import Rank from './rank'
  import Like from './Like'
  import Floor from './Floor'
  import Brand from './Brand'
export default {
  name: 'home',
  components: {ListContainer,Recommend,Rank,Like,Floor,Brand},
  mounted () {
    //这里是请求floor列表的 在这里发送请求是为了利用v-for动态生成floor
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList :state => state.home.floorList
    })
  },
}
</script>

<style>

</style>