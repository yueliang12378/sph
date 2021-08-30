<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"

       v-for="(imgObj,index) in imgList" 
       :key="imgObj.id"    
       >
        <img :src="imgObj.imgUrl"
        :class="{'active':defaultIndex === index}"
         @click="changeIndex(index)"
        >
        
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['imgList'],
    data() {
      return {
        defaultIndex:0,
      }
    },
    methods: {
      changeIndex(index){
        //改变defaultIndex
        this.defaultIndex = index; 
        //并且通过全局事件总线 通知图片预览也要改变图片
        this.$bus.$emit('changeImg',index)
      }
    },
    watch:{
            imgList:{
                immediate:true,//这里添加这个配置没用 ，目的只是为了与floor的代码一直
                handler(){
                    /*
                    * 当数据一但发生变化，那么我们就去实例化swiper，但是发现不行
                    * 我们就得考虑是不是页面还是没有形成呢？答案是肯定的，也就是有了数据，才开始vfor形成页面
                    * 我们需要等待页面全部形成之后再去实例化
                    * */

                    /*
                    * 在最近的一次页面更新之后，执行nextTick当中传递的回调函数
                    * nextTick是页面你最近一次更新完成之后才会执行
                    * updated是只要页面有数据更新，就会执行，执行不关心是不是最近一次更新（这个效率不高）
                    * 所以我们用 nextTick
                    * */
                    this.$nextTick(() =>{
                        new Swiper (this.$refs.imgSwiper, {
                            // 如果需要前进后退按钮
                            slidesPerView: 4,
                            slidesPerGroup:4,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            //自动播放
                            autoPlay: true,
                            
                        })
                    })



                }
            }
        },
    
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>