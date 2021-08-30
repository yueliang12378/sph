import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

//VueRouter路由器对象的构造函数
//this.$router.push调用的是路由器对象的方法，这个方法并不是路由器实例化的对象方法，而是这个对象原型的方法
//这个实例化对象原型的方法 就是VueRouter的显示原型的方法

//this.$router是实例化对象 是VueRouter的实例化对象

//修改push
const originPush = VueRouter.prototype.push //将原来的push方法保存起来，确保后期还能拿到
const originReplace = VueRouter.prototype.replace
//修改原型上的push 让原型上的push指向我们的push
 VueRouter.prototype.push = function(location,onResolved,onRejected) {
    //  location是我们调用this.$router
    // 如果没有传入成功和失败的回调 我们要捕获异常
    if(onResolved === undefined && onRejected === undefined){
        // 这里不能直接写return originPush(参数) 这样是直接调用了
        return originPush.call(this,location).catch(()=>{}); //传入参数 并捕获异常
    }else{
        // 有成功和失败回调 我们不用捕获异常了
        return originPush.call(this,location,onResolved,onRejected);
    }
 }
//修改replace
 VueRouter.prototype.replace = function(location,onResolved,onRejected) {
    //  location是我们调用this.$router
    // 如果没有传入成功和失败的回调 我们要捕获异常
    if(onResolved === undefined && onRejected === undefined){
        // 这里不能直接写return originPush(参数) 这样是直接调用了
        return originReplace.call(this,location).catch(()=>{}); //传入参数 并捕获异常
    }else{
        // 有成功和失败回调 我们不用捕获异常了
        return originReplace.call(this,location,onResolved,onRejected);
    }
 }



const router =  new VueRouter({
    routes,
    //这里表示如果页面跳转 默认跳转新的页面的哪个位置
    //这里定义在0 0 就是顶部
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})
//注册全局前置导航守卫，用来对token校验（根据token获取用户信息）
router.beforeEach(async (to,from,next)=>{
    //to 转跳的目的地路由对象
    //from 从哪里来的路由
    //next 是一个函数 根据参数不同 有不同的功能
        //1.next() 代表无条件放行
        //2.next('/')代表强制跳转到指定页面
        //3.next(false)代表什么都不做，原地不动
    let {token,userInfo} = store.state.user;
    if(token){ //有token 则说明登陆过了
        if(to.path === '/login'){ //如果已经有token了 还要往登录页面 则定向回首页
            next('/')
        }else{ //这是不是前往登录页的
            if(userInfo.nickName){ //判断当前是否有用户信息
                //如果有 则无条件放行
                next()
            }else{ //没有用户信息 则需要发送请求去获取
                try {
                    await store.dispatch('getUserInfo')
                    next(); //然后放行
                } catch (error) {
                    //获取用户信息失败 则说明token过期了，这时候需要删除旧的token 和 让用户回到登录界面
                    alert('用户的token过期，请重新登录')
                    store.dispatch('userLogout')//这里是清除已有token
                    next('/login?redirect='+to.path)//令其登录，并且登录完成跳转回当前浏览的页面
                }
            }
        }
    }else{
        //如果用于根本没登录
        // 而且用户访问的是 交易相关 个人中心相关 支付相关 则要跳转到登录页面
        
        if(to.path.indexOf('/trade')!==-1 || to.path.indexOf('/center')!==-1 || to.path.startsWith('/pay')){
            //startsWith 表示是不是以/pay 开头 如果是则返回true （其实就是试试新方法而已）
            next('/login?redirect='+ to.path)//令其登录，并且登录完成跳转回当前浏览的页面
            //这里设置了redirect 还要去login页面设置呢
        }else{
            next();
        }
        
    }


})

export default router

