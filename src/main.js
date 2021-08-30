import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

import store from './store'

import '@/mock/mockServer' //引入我们的mock模拟的接口

import 'swiper/css/swiper.css' //引入样式 一般是在main里面引入

// API是别名
import * as API from '@/api'

/*默认暴露
  无论什么样的暴露方式，往外暴露的都是一个对象
  只不过，暴露的对象的形成方式不同

  //export default xxx
  //暴露的是一个对象，这个对象里面是以default为属性名，以default后面的东西为值的对象
  如下：
  {
    default:xxx
  }
  引入方式 如果是默认暴露：则 import a from '...' 这是一种简写方式
  完整的写法是 import {default as a} from '...' （default是关键字，所以要用a当别名）
  为了方便 通常都是使用简写方式
*/
/*分别暴露
  export const a = 1100
  export const reqxx = ()=>{}
  如下：
  {
    a:a，
    reqxx：reqxx
  }
引入的时候 {a} from '...'

整体暴露export{
  a,
  reqxx
} 引入的时候 跟分别暴露一样

不论是吗暴露方式，如果你想拿到这个暴露的整体对象，则可以如下
import * as xx from '...'
*/

import { Button, MessageBox , Message} from 'element-ui';

Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


Vue.config.productionTip = false

import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
import Pagination from '@/components/Pagination'
//全局注册的组件，如果一个组价被多个组件使用，那么定义在components，注册全局
Vue.component('TypeNav',TypeNav);
Vue.component('SlideLoop',SlideLoop);
Vue.component('Pagination',Pagination);

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API //将整个API挂到原型星
  },
  router, //使用路由组件
  store, //使用vuex 所有组件都能拿到$store
  render: h => h(App),
}).$mount('#app')
