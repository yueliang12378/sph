//这个是home模块的vuex
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'


const state = {
    //存数据
    categoryList:['categoryList'],
    bannerList:[],
    floorList:[]
}

const mutations = {
    //直接修改数据
    RECEIVE_CATCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const actions = {
    //与组件当中用户对接
    //一般是异步发请求
    //提交mutations
    async getStegoryList({commit}){
        // 发送请求拿到数据，提交给mutations 存储到state
        // async await通过同步代码实现异步代码 比（.then .catch强）可读性强
        const resutl = await reqCategoryList();
        let {data,code} = resutl
        if(code === 200){
            // 通知mutations 将数据存储到state里面
            commit('RECEIVE_CATCATEGORYLIST',data)
        }
    },
    async getBannerList({commit}){
        const resutl = await reqBannerList()
        const {data,code} =resutl;
        if(code === 200){
            // 通知mutations 将数据存储到state里面
            commit('RECEIVE_BANNERLIST',data)
        }
    },
    async getFloorList({commit}){
        const resutl = await reqFloorList()
        const {data,code} =resutl;
        if(code === 200){
            // 通知mutations 将数据存储到state里面
            commit('RECEIVE_FLOORLIST',data)
        }
    },
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