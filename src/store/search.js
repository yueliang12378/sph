//这个是search模块的vuex
import {reqSearchInfo} from '@/api/index'

const state = {
    //存数据
    SearchInfo:{}
}

const mutations = {
    //直接修改数据
    RECEIVE_SEARCHINFO(state,SearchInfo){
        state.SearchInfo = SearchInfo
    }
}

const actions = {
    //与组件当中用户对接
    //一般是异步发请求
    //提交mutations
    async getSearchInfo({commit},serchParams){
        // serchParams是用户搜索的对象
        const result = await reqSearchInfo(serchParams)
        const {code,data} = result
        if (code === 200){
            commit('RECEIVE_SEARCHINFO',data)
        }
    }
}

const getters = {
    //后面用来简化数据的操作
    attrsList(state){
        return state.SearchInfo.attrsList || [] 
    },
    goodsList(state){
        return state.SearchInfo.goodsList || [] 
    },
    trademarkList(state){
        return state.SearchInfo.trademarkList || [] 
    }
}


export default {
    state,
    actions,
    mutations,
    getters,
}