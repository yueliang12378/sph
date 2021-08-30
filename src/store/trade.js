import {reqTradeInfo} from '@/api'

const state = {
   tradeInfo:{}
}

const mutations = {
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo;
    }
}

const actions = {
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code  === 200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}

const getters = {
    detailArrayList(state){
        // 拿到选中的商品的信息
        return state.tradeInfo.detailArrayList || []
      },
}


export default {
    state,
    actions,
    mutations,
    getters,
}