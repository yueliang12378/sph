<template>
  <div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{floor.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li class="active" v-for="(nav,index) in floor.navList" :key="index">
                                <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li  v-for="(keyword,index) in floor.keywords" :key="index">
                                        {{keyword}}</li>
                                </ul>
                                <img :src="floor.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <SlideLoop :bannerList="floor.carouselList"></SlideLoop>
<!--                                没有用轮播图组件前的 轮播图写法-->
                                <!--<div class="swiper-container" ref="floorSwiper" id="floor1Swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide"
                                             v-for="(carouse) in floor.carouselList"
                                             :key="carouse.id">
                                            <img :src="carouse.imgUrl"/>
                                        </div>
                                    </div>
                                    &lt;!&ndash; 如果需要分页器 &ndash;&gt;
                                    <div class="swiper-pagination"></div>

                                    &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>-->
                                
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="floor.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    // import Swiper from 'swiper';
export default {
    name: 'floor',
    props:['floor'], //声明接收属性，通过属性拿到属性值，这个floor就是组件对象的数据了
    mounted(){
        //在listContainer中 在mounted实例化Swiper 不成功
        //为什么在floor里面成功了呢？
        //这里是页面形成之后才实例化swiper的
        //因为floor的页面不是需要请求数据在形成页面
        //这个组件本身就是由数据v-for形成的 数据先于页面的形成
        
        /*this.$nextTick(() =>{
            new Swiper (this.$refs.floorSwiper, {
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

                // 如果需要滚动条
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                // },
            })
        })*/
    },
    //这里的监视 是监视不到数据的变化的，因为数据在监视之前已经全部过来了（3-3不会变化了）
    //而在listContainer是可以见识到数据0 - 4的变化的
    
    // watch:{
    //     floor:{
    //         immediate:true,//无论有没有监视到数据变化，都立即执行一次回到函数
    //         handler(){
    //             this.$nextTick(() =>{
    //         new Swiper (this.$refs.floorSwiper, {
    //             // direction: 'vertical', // 垂直切换选项 去掉就代表轮播图是水平的
    //             loop: true, // 循环模式选项（无缝切换）
    //
    //             // 如果需要分页器
    //             pagination: {
    //                 el: '.swiper-pagination',
    //             },
    //
    //             // 如果需要前进后退按钮
    //             navigation: {
    //                 nextEl: '.swiper-button-next',
    //                 prevEl: '.swiper-button-prev',
    //             },
    //             //自动播放
    //             autoPlay: true,
    //
    //             // 如果需要滚动条
    //             // scrollbar: {
    //             //     el: '.swiper-scrollbar',
    //             // },
    //         })
    //     })
    //         }
    //     }
    // }
    
}
</script>

<style lang='less' scoped>
.floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>