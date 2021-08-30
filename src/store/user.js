//这个是user模块的vuex
import {getUserTempId} from '@/utils/userabout.js'
import {reqGetCdoe , reqUserRegister , reqUserLogin,reqUserInfo,reqUserLogout,reqUerAddressList} from '@/api'
const state = {
    //存数据
     //getUserTempId()  获取临时标识id
     userTempId:getUserTempId(),
     code:'', //这里是存储验证码的
     token:localStorage.getItem('TOKEN_KEY'), //这里先初始化为空 （肯定要从locationstore里面拿的）
     userInfo:{},
     userAddressList:[],
}

const mutations = {
    //直接修改数据
    RECEIVE_CODE(state,code){
        state.code = code; //存储数据
    },
    RECEVIE_TOKEN(state,token){
        state.token = token; //存储数据
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    RESET_USERINFO(state){ //清除token
        state.userInfo = {}
        state.token = '' 
        localStorage.removeItem('TOKEN_KEY')
    },
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList = userAddressList;
    }
}

const actions = {
    //与组件当中用户对接
    //一般是异步发请求
    //提交mutations
    async getCode({commit},phone){
        let result = await reqGetCdoe(phone)
        if (result.code === 200){
            commit('RECEIVE_CODE',result.data) //并且将code存到state里面
            return 'ok'
        }else{
            return Promise.reject('fail')
        }
    },

    //这个是提交注册表单的
    // eslint-disable-next-line 
    async userRegister({commit},userInfo){
        let result = await reqUserRegister(userInfo)
        if (result.code === 200){
            return 'ok'
        }else{
            return Promise.reject('failed') //返回失败的promise
        }
    },
    //登录获取token
    async userLogin({commit},userInfo){
        let result = await reqUserLogin(userInfo)
        if (result.code === 200){
            localStorage.setItem('TOKEN_KEY',result.data.token)
            commit('RECEVIE_TOKEN',result.data.token)
            //这里之后应该还要将数据存储到 localStore里面
            return 'ok'
        }else{
            return Promise.reject('failed') //返回失败的promise
        }
    },
    //根据token获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo();
        let {code,data} = result;
        if(code === 200){
            commit('RECEIVE_USERINFO',data)
            return 'ok'
        }else{
            return Promise.reject('failed')
        }
    },
    //退出登录
    async userLogout({commit}){
        const result = await reqUserLogout();//请求退出登录
        if (result.code === 200){
            commit('RESET_USERINFO') //并且清除用户信息
            return 'ok'
        }else{
            return Promise.reject('failed');
        }
    },

    // //清除token（一般用于token过期） //用上面的退出登录替代就行
    // async clearToken({commit}){

    //     commit('RESET_USERINFO')
    // },

    //获取用户地址
    async getUerAddressList({commit}){
        const result = await reqUerAddressList()
        if(result.code === 200){
            commit('RECEIVE_USERADDRESSLIST',result.data)
        }
    }
    
}

const getters = {
    //后面用来简化数据的操作
   
}


export default {
    state,
    actions,
    mutations,
    getters,
}