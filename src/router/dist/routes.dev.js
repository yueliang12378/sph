"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Home = _interopRequireDefault(require("@/pages/Home"));

var _Search = _interopRequireDefault(require("@/pages/Search"));

var _Login = _interopRequireDefault(require("@/pages/Login"));

var _Register = _interopRequireDefault(require("@/pages/Register"));

var _pages = _interopRequireDefault(require("@/pages/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//向外暴露路由配置
var _default = [{
  name: 'home',
  path: '/home',
  component: _Home["default"]
}, {
  name: 'search',
  path: '/search/:keyword?',
  component: _Search["default"] //props的主要目的就是 为了方便调用而已
  // props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
  // props:true //映射params参数为props传给路由组件
  // props(router){ //此处接收到的route是vc或vm身上的$route
  //     // 可以从router拿到params 或 query参数
  //
  // }

}, {
  name: 'register',
  path: '/register',
  component: _Register["default"],
  meta: {
    isHidden: true
  }
}, {
  name: 'login',
  path: '/login',
  component: _Login["default"],
  //路由对象当中的元配置项，可以配置我们所需要的任何数据
  //这样就可以利用v-show来控制 是否显示隐藏了
  meta: {
    isHidden: true
  }
}, {
  path: '/',
  //将 '/'重定向到 /home
  redirect: '/home'
}];
exports["default"] = _default;