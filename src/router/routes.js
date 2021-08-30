// import Home from '@/pages/Home'
//组件的懒加载
// (1)	当打包构建应用时，JS包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了
//需要用到import 函数 （因为路由那里的component 那里可以是一个组件 也可以是一个函数）
//用到import()就是异步加载 再被访问的时候才会加载

const Home = () => import('@/pages/Home') 
const Search = () => import('@/pages/Search') 
const Login = () => import('@/pages/Login') 
const Register = () => import('@/pages/Register') 
const Detail = () => import('@/pages/Detail') 
const AddCartSuccess = () => import('@/pages/AddCartSuccess') 
const ShopCart = () => import('@/pages/ShopCart') 
const Trade = () => import('@/pages/Trade') 
const PaySuccess = () => import('@/pages/PaySuccess') 
const Center = () => import('@/pages/Center') 
const Pay = () => import('@/pages/Pay') 
const MyOrder = () => import('@/pages/Center/MyOrder') 
const GroupOrder = () => import('@/pages/Center/GroupOrder') 
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Trade from '@/pages/Trade'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'

//向外暴露路由配置
export default [
    {
        name:'center',
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
              },
              {
                path:'grouporder',
                component:GroupOrder
              },
            //   这里表示 如果是/center 就定向到 /center/myorder
              {
                path:'',
                redirect: 'myorder'
              }
        ]
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/shopcart') !== -1){
              next() //放行
            }else{
              alert('必须要从购物车才能到结算页面')
              next('/') //打回首页
            }
        }
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade
    },
    {
        name:'paySuccess',
        path:'/paySuccess',
        component:PaySuccess,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/pay') !== -1){
              next() //放行
            }else{
              alert('必须要支付成功才到到达该页面')
              next('/') //打回首页
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/trade') !== -1){
              next() //放行
            }else{
              alert('必须要从结算页面才能到支付页面')
              next('/') //打回首页
            }
        }
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        // 路由独享守卫(跳到/addcartsuccess页面 必须携带skuNum 以及sessionStorage里面有存储东西才能前往添加购物车成功页面)
        beforeEnter: (to, from, next) => {
        let skuNum = to.query.skuNum //拿到是否携带skuNum
        let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
        if(skuNum && skuInfo){
          next() //放行
        }else{
          alert('必须带够参数')
          next('/') //打回首页
        }
      }
    },
    {
        name:'detail',
        path:'/detail/:goodsId',
        component:Detail,
        
    },
    {
        name:'home',
        path: '/home',
        component: Home
    },
    {
        name:'search',
        path: '/search/:keyword?',
        component: Search,

        //props的主要目的就是 为了方便调用而已

        // props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
		// props:true //映射params参数为props传给路由组件
        // props(router){ //此处接收到的route是vc或vm身上的$route
        //     // 可以从router拿到params 或 query参数
        //
        // }
    },
    {
        name:'register',
        path: '/register',
        component: Register,
        meta:{
            isHidden:true
        }
    },
    {
        name:'login',
        path: '/login',
        component: Login,
        //路由对象当中的元配置项，可以配置我们所需要的任何数据
        //这样就可以利用v-show来控制 是否显示隐藏了
        meta:{
            isHidden:true
        }
    },
    {
        path:'/', //将 '/'重定向到 /home
        redirect:'/home'
    },
    {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]
