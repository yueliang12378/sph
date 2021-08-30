//这个是user模块的vuex
import {reDetailInfo} from '@/api'

const state = {
    //存数据
    detailInfo:{}
}

const mutations = {
    //直接修改数据
    RECEIVE_DETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}

const actions = {
    //与组件当中用户对接
    //一般是异步发请求
    //提交mutations
    async getDetailinfo(ctx,skuid){
        let result = await reDetailInfo(skuid)
        let {code,data} = result;
        if(code === 200){
            ctx.commit('RECEIVE_DETAILINFO',data)
        }
    }
}

const getters = {
    //后面用来简化数据的操作
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || []
    },
}


export default {
    state,
    actions,
    mutations,
    getters,
}