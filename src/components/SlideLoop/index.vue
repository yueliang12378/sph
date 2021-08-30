<template>
    <div class="swiper-container" ref="bannerSwiper" id="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner) in bannerList" :key="banner.id">
                <img :src="banner.imgUrl" />
            </div>
        
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    //这个是我们封装的 轮播图组件 只要传入对应的数据即可
    import Swiper from "swiper";

    export default {
        name: "slideLoop",
        props:['bannerList'],
        watch:{
            bannerList:{
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
                        new Swiper (this.$refs.bannerSwiper, {
                            // direction: 'vertical', // 垂直切换选项 去掉就代表轮播图是水平的
                            loop: true, // 循环模式选项（无缝切换）

                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                            },

                            // 如果需要前进后退按钮
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

<style scoped>

</style>