<template>
      <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="$store.state.user.userInfo.name">
                            <span>请</span>
                            <!-- <a href="###">登录</a> -->
                            <a href="javascript:;">{{$store.state.user.userInfo.name}}</a>
                            <!-- <a href="###" class="register">免费注册</a> -->
                           <a href="javascript:;" class="register" @click="userLogout">退出登录</a>
                        </p>

                        <p v-else>
                            <span>请</span>
                            <!-- <a href="###">登录</a> -->
                            <router-link to='/login'>登录</router-link>
                            <!-- <a href="###" class="register">免费注册</a> -->
                           <router-link to='/register' class="register" >免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">查看订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./images/logo.png" alt="">
                    </a> -->
                    <router-link to='/home' class="logo" title="尚品汇">
                        <img src="./images/logo.png" alt="">
                    </router-link>

                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button"  @click="toSearch">
                            搜索
                        </button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name: 'search',
    data(){
        return {
            keyword: '', //搜索关键字
        }
    },
    mounted(){
        this.$bus.$on('removeKeywords',this.removeKeywords)
        },
    methods:{
        removeKeywords(){
            this.keyword = '';
        },
        toSearch(){
            let location = {
                name:'search',
                params:{keyword:this.keyword || undefined}
        };
            (this.$route.query) && (location.query = this.$route.query);
            if(this.$route.path.indexOf('/home') !== -1){
                this.$router.push(location)
            }else{
                this.$router.replace(location) //如果不是home页面的话 搜索要用replace（目的是为了点击后退能回到home）
            }
            
                // 面试1用params可以不指定path吗：这里指定了params 需要用name 用path匹配不上了 
                //面试2如何让params参数可传可不传 ：在路由表占位后面加个问号
                //面试3：params传入的this.keyword如果是空串 会导致路径丢失 如果在params是可传可不传的情况下（在路由表占位后面加个问号）  解决办法就是 如果是空串的时候 将空串变成undefined
            
                // 面试4：参数不变化 多次搜索会报错
                //这里捕获异常的原因是 如果输入的搜索参数不变 而用户多次点击搜索 系统会报错
                //解决方案1（这个解决方案不好 不能一劳永逸）： 捕获异常vue-router3.1是一个promise（catch 或者指定成功和失败的回调） 
                            // 3.1以下的版本 可以指定一个回调捕获异常 
                // 方法2：修改vue原型上的push和replace方法(增加捕获）（去看router文件夹下的 index文件）
                    
        },
        async userLogout(){
            try {
                await this.$store.dispatch('userLogout')
                alert('退出成功')
                this.$router.push('/')
            } catch (error) {
                alert(error.message)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }

</style>