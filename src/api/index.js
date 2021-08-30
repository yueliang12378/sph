// 这个文件写的都是函数 ，接口请求函数
//以后我们的每一个接口都对应了一个函数，如果想拿到相关数据，直接调用相关函数即可
import request from "./ajax"
import mockAjax from "./mockAjax"

/* 
    axios使用 函数用法  对象用法
    三种参数 params参数 query参数 请求体参数
    params参数 是在url当中携带的
    query参数 可以在url当中携带？分割，后面就是query参数 也可以在配置对象里面配置 配置的属性名是params！！！注意 axios中params是query哦
    请求体参数，配置对象当中的data里面，请求方式put和post才有请求体参数
    

*/

// http://39.98.123.211:8208/swagger-ui.html#!/user45address45controller/findUserAddressListByUserIdUsingGET_1
//线上接口地址


//请求商品三级分类列表
export const reqCategoryList = ()=>{
    return request({
        url:'/product/getBaseCategoryList',
        method: 'get'
    })
}
//搜索
export const reqSearchInfo = (data = {})=> {
    //使用户搜索的参数，用户发请求的时候传递的，空对象也可以获得参数的，代表获取默认的列表（所以可以赋值一个{}作为初始值）
     return request({
         url:'/list',
         method: 'post',
         data 
     })
}

//请求获取模拟接口的banner数据
export const reqBannerList = ()=>{
   return mockAjax({
       url:'/banner',
       method: 'get'
   })
}

//请求获取模拟接口的floor数据
export const reqFloorList = ()=>{
    return mockAjax({
        url:'/floor',
        method: 'get'
    })
}

//获取详情页数据
export const reDetailInfo = (skuId) =>{
    return request({
        url:`item/${skuId}`,
        method: 'get'
    })
}

//添加购物车（修改购物车的商品数量）
///api/cart/addToCart/{ skuId }/{ skuNum }
//post

export const reqAddOrUpdateCart = (skuId,skuNum) => {
    return request({
      url:`/cart/addToCart/${ skuId }/${ skuNum }`,
      method:'post'
    })
  }

//请求购物车列表
//这里需要在请求头哪里 带一个用户的唯一标识
export const reqCartList = () => {
    return request({
      url:'/cart/cartList',
      method:'get'
    })
  }
  //修改购物车的选中状态
///api/cart/checkCart/{skuId}/{isChecked}
//get

export const reqUpdateCartChecked = (skuId,isChecked) => {
    return request({
      url:`/cart/checkCart/${skuId}/${isChecked}`,
      method:'get'
    })
  }

  // 删除购物车
///api/cart/deleteCart/{skuId}
// delete

export const reqDeleteCart = (skuId) => {
  return request({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}
//请求回去验证码
//api/user/passport/sendCode/{phone}
//get
export const reqGetCdoe = (phone)=>{
  return request({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
  })
}

//注册
export const reqUserRegister = (userInfo) => {
  return request({
    url:'/user/passport/register',
    method:'post',
    data:userInfo
  })
} 

//登录

//用户登录
///api/user/passport/login
//post
//返回来的数据 只需要存储token就行 之后在用token发请求获取用户数据
export const reqUserLogin = (userInfo) => {
  return request({
    url:'/user/passport/login',
    method:'post',
    data:userInfo
  })
}

//根据token获取用户信息
///api/user/passport/auth/getUserInfo
//get

export const reqUserInfo = () => {
  return request({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}

//退出登录
///api/user/passport/logout
//get

export const reqUserLogout = () => {
  return request({
    url:'/user/passport/logout',
    method:'get'
  })
}

// GET /api/user/userAddress/inner/findUserAddressListByUserId/{userId}

//请求获取用户的收获地址信息（这里没拿到数据，我们用mock模拟一下数据吧）
//get
// export const reqUerAddressList = (/*userId=544*/) =>{
//   return request({
//     url:'/user/userAddress/auth/findUserAddressList',
//     // url:`/user/userAddress/inner/findUserAddressListByUserId/${userId}`,
//     method:'get'
//   })
// }
export const reqUerAddressList = (/*userId=544*/) =>{
  return mockAjax({
    url:'/user/userAddress/auth/findUserAddressList',
    // url:`/user/userAddress/inner/findUserAddressListByUserId/${userId}`,
    method:'get'
  })
}

//获取交易页面信息
///api/order/auth/trade
//get

export const reqTradeInfo = () => {
  return request({
    url:'/order/auth/trade',
    method:'get'
  })
}

//请求提交订单（真正的去创建订单）
///api/order/auth/submitOrder?tradeNo={tradeNo}
//POST
//body

export const reqSubmitOrder = (tradeNo,tradeData) => {
  return request({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeData
  })
}
//获取支付信息
///api/payment/weixin/createNative/{orderId}
//get
export const reqPayInfo = (orderId) => {
  return request({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}
//查询订单支付状态
///api/payment/weixin/queryPayStatus/{orderId}
//get
export const reqPayStatus = (orderId) => {
  return request({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}

//请求获取我的订单数据分页列表
///api/order/auth/{page}/{limit}
//get

export const reqMyOrderInfo = (page,limit) => {
  return request({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}
