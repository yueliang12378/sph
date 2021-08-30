//这个文件是对axios进行二次封装
//目的是为了 发请求 和 响应的时候 有其他功能（拦截器）
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' //引入样式

//创建一个axios实例进行封装
//axios.create() 创建一个和axios具有同样功能的实例
const service = axios.create({
    baseURL: '/mock',     //设置当前项目所有路径公共部分
    timeout: 10000, //超时时间 超过会报错
})

// 添加进度条信息 nprogress
//利用拦截器
//请求拦截器
service.interceptors.request.use(
    //请求的内容 , 最后一定要返回这个config
    (config)=>{
        //这里可以添加功能
        Nprogress.start();//开启进度条
        return config;
    },
    //请求拦截器 的失败的回调一般不写
    // ()=>{

    // },
)

//响应拦截器
service.interceptors.response.use(
    //成功的回调
    (response)=>{
        Nprogress.done();//关闭进度条

        //一定要返回
        // 返回的响应不需要再从data里面取数据  直接返回data
        return response.data;
    },
    (error)=>{
        Nprogress.done();//关闭进度条
        //可以统一处理错误
        console.log(error.msg)
        //中断promise链
        return new Promise(()=>{})
    }
)

export default service //暴露出去