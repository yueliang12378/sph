//这个文件用来模拟mock数据接口的
import Mock from 'mockjs'
import banner from './banner'
import floor from './floor'
import userAddressList from './userAddressList'
//第一个参数表示我们请求的路径 ，第二个参数表示返回的数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
Mock.mock('/mock/user/userAddress/auth/findUserAddressList',{code:200,data:userAddressList})

