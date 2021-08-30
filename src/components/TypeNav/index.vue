<template>
  <div class="type-nav">
    <div class="container" >
<!--                鼠标移出这个div 则将currentIndex改为-1 取消特效-->
        <div @mouseleave="moveOut" @mouseenter="isShow = true">
            <h2 class="all">全部商品分类</h2>
<!--            vue 有过度动画的 要写在 transition-->
            <transition name="sort">
                <div class="sort" v-show="isShow">
                    <div class="all-sort-list2" @click="toSearch">
                        <!--                      item_on:currentIndex === index 添加item_on这个类 用currentIndex判断是否相等 -->
                        <!--                        绑定一个鼠标经过事件 如果鼠标经过 则将currentIndex = 当前的索引-->
                        <div
                                class="item"
                                :class="{item_on:currentIndex === index}"
                                v-for="(c1,index) in categoryList"
                                :key="c1.categoryId"
                                @mouseenter="moveItem(index)"
                        >
                            <h3>
                                <!--                            这个是编程式路由导航-->
                                <!--                            <a href="javascript:" @click="$router.push({-->
                                <!--                                 name:'search',-->
                                <!--                                        query:{-->
                                <!--                                            category1Id: c1.categoryId,-->
                                <!--                                            categoryName:c1.categoryName-->
                                <!--                                        }}-->
                                <!--                            )">{ {c1.categoryName}}</a>-->
                                <!--                            利用自定义标签属性  帮助事件委托一步到位-->
                                <a href="javascript:"
                                   :data-category1Id = "c1.categoryId"
                                   :data-categoryName = "c1.categoryName"
                                >{{c1.categoryName}}</a>
                                <!--                                    这里三重for循环 如果用router-link组件太多了 我们应该用编程式导效率高一点-->
                                <!--                                    每个a标签都添加了点击事件，那么内存中会定义很多个函数，内存占用也是比较大的 虽然效率-->
                                <!--                                    比声明式导航强 但还是不够高效-->
                                <!--                                    所以需要用到事件委派-->
                                <!--                                    <router-link-->
                                <!--                                            :to="{-->
                                <!--                                                name:'search',-->
                                <!--                                                query:{-->
                                <!--                                                    category1Id: c1.categoryId,-->
                                <!--                                                    categoryName:c1.categoryName-->
                                <!--                                                }-->
                                <!--                                            }"-->
                                <!--                                    >-->
                                <!--                                        { {c1.categoryName}}-->
                                <!--                                    </router-link>-->
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dt>
                                            <!--                                        <a href="javascript:" @click="$router.push({-->
                                            <!--                                             name:'search',-->
                                            <!--                                                    query:{-->
                                            <!--                                                        category12Id: c2.categoryId,-->
                                            <!--                                                        categoryName:c2.categoryName-->
                                            <!--                                                    }}-->
                                            <!--                                        )">{ {c2.categoryName}}</a>-->
                                            <a href="javascript:"
                                               :data-category2Id = "c2.categoryId"
                                               :data-categoryName = "c2.categoryName"
                                            >{{c2.categoryName}}</a>
                                            <!--                                                <router-link-->
                                            <!--                                                        :to="{-->
                                            <!--                                                            name:'search',-->
                                            <!--                                                            query:{-->
                                            <!--                                                                category2Id: c2.categoryId,-->
                                            <!--                                                                categoryName:c2.categoryName-->
                                            <!--                                                            }-->
                                            <!--                                                        }"-->
                                            <!--                                                >-->
                                            <!--                                                    { {c2.categoryName}}-->
                                            <!--                                                </router-link>-->
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <!--                                            <a href="javascript:" @click="$router.push({-->
                                                <!--                                                 name:'search',-->
                                                <!--                                                        query:{-->
                                                <!--                                                            category3Id: c3.categoryId,-->
                                                <!--                                                            categoryName:c3.categoryName-->
                                                <!--                                                        }}-->
                                                <!--                                            )">{ {c3.categoryName}}</a>-->
                                                <a href="javascript:"
                                                   :data-category3Id = "c3.categoryId"
                                                   :data-categoryName = "c3.categoryName"
                                                >{{c3.categoryName}}</a>
                                                <!--                                                    <router-link-->
                                                <!--                                                            :to="{-->
                                                <!--                                                                name:'search',-->
                                                <!--                                                                query:{-->
                                                <!--                                                                    category3Id: c3.categoryId,-->
                                                <!--                                                                    categoryName:c3.categoryName-->
                                                <!--                                                                }-->
                                                <!--                                                            }"-->
                                                <!--                                                    >-->
                                                <!--                                                        { {c3.categoryName}}-->
                                                <!--                                                    </router-link>-->
                                            </em>
                            
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
        
    </div>
</div>
</template>

<script>
import { mapState} from 'vuex'
//引入函数防抖的库 vue在安装依赖的时候已经帮我们安装好了
// import _ from 'lodash' //这是一个对象（会将整个lodash引入 不太好）
import throttle from 'lodash/throttle' //用这种方法按需引入

export default {
    name:'',
    data(){
        return {
            currentIndex: -1,
            isShow:true //这个用于标识TypeNav是否暂时
        }
        },
    //组件挂载完成的时候 立即发送请求获取数据
    mounted(){
        

        //如果是search页面 一上来就隐藏
        if(this.$route.path.indexOf('/home') === -1) this.isShow = false;
    },
    methods:{
        //前往Search组件的事件委派函数
        toSearch(event){
        //    这里的event 是vue默认传过来的$event
            let targetNode = event.target;
            let data = targetNode.dataset;//获取当前目标元素身上的data-属性  组成的对象（这个就是我们要带的参数）
            //不管点击的是哪个a标签，如果是a标签 一定有我们设置的categoryIid 和categoryName
            let {category1id,category2id,category3id,categoryname} = data //这里取出来的数组 浏览器自动全部小写了
            if(categoryname){ //如果categoryname存在 这说明这是a标签了
                let location = {name:'search'};
                let query = {categoryName:categoryname}; //先将名字存储
                //这三个 只有一个有数据的
                category1id && (query.category1Id = category1id)//如果有id 则存入query
                category2id && (query.category2Id = category2id)
                category3id && (query.category3Id = category3id);
                
                //这里还需要合并搜索参数 因为 可能还有params参数（
                // 用户搜索华为 然后 在选择了手机 所以就有两种参数了 合并）
                (this.$route.params) && (location.params = this.$route.params)
                
                location.query = query; //将query存到location 然后push就行了
                if(this.$route.path.indexOf('/home') !== -1){
                    this.$router.push(location)
                }else{
                    this.$router.replace(location) //如果不是home页面的话 搜索要用replace（目的是为了点击后退能回到home）
                }
            }
        
        },
        moveOut(){ //鼠标移出事件
            this.currentIndex = -1;
            //如果移出 并且这个是search页面 则隐藏（因为在home页面不需要隐藏）
            // 这个只在home页面隐藏
            (this.$route.path.indexOf('/home') === -1) && (this.isShow = false)
            console.log(this.$route.path)
        },
        //没节流的函数
        // moveItem(index){
        //     this.currentIndex = index;
        // }
        
        //节流的函数(不能用箭头函数 不然那会把this弄丢)
        moveItem:throttle(function(index){
            this.currentIndex = index;
        //    trailing 表示取消在时间间隔之后在执行
        },20,{'trailing':false}) //表示 规定20毫秒内只能执行一次
    },
    //从vuex取数据（state 和 getters） 在computed
    //从vuex取方法（actions 和 mutations） 在methods里面
    computed:{
        // 1.数组取数据需要是总的state里面的数据，不能是模块化里面的数据
        //2.数据名和state数据的名字一样才行
        //...mapState(['categoryList']) //不能这样写 因为categoryList不是state.categoryList 而是state.home.categoryList
        ...mapState({
            // 必须使用对象，而且返回的数据是state.home.categoryList
            categoryList:state => state.home.categoryList,
        })
    },
}
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                &.sort-enter{
                    height: 0;
                    opacity: 0;
                }
                &.sort-enter-to{
                    height: 461px;
                    opacity:1;
                }
                &.sort-enter-active{
                    transition: all 1s;
                }
            
                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item_on {
                            background-color: gray;
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>