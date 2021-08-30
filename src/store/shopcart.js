//这个是购物车模块的vuex

import {reqAddOrUpdateCart,reqCartList,reqUpdateCartChecked,reqDeleteCart} from '@/api'

const state = {
    //存数据
    shopCartList:[]
}

const mutations = {
    RECEIVESHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
      }
}

const actions = {
    async addOrUpdateCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateCart(skuId,skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            // 如果失败 则返回一个失败的promise
            return Promise.reject('failed')
        }
    },
    // 获取购物车列表
    async getCartList({commit}){
        const result = await reqCartList()
        if(result.code === 200){
          commit('RECEIVESHOPCARTLIST',result.data)
        }
      },
      //用于更新商品的选中状态
      async UpdateCartChecked({commit},{skuId,isChecked}){
        const result = await reqUpdateCartChecked(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            // 如果失败 则返回一个失败的promise
            return Promise.reject('failed')
        }
      },
      //使用promise.all 采用单个修改的接口去修改多个，但真正不是这样做的（有专门的修改全部接口）
      //promise.all() 是promise的一个api
      //功能： 批量处理多个promise对象
      //参数    promise对象的数组
      //返回值： 返回一个新的promise对象

      //新的promise对象只有全部promise成功才返回成功，有一个失败则会返回失败
      //成功的结果的：参数promise对象数组当中每个promise成功结果组成的数组
      //失败的结果： 返回数组中第一个失败的promise对象的原因
      updatedCartIscheckAll({commit,getters,dispatch},isChecked) {
          let promises = []
          //getters.shopCarInfo.cartInfoList 获取到的就是我们的购物车列表数据
          getters.shopCarInfo.cartInfoList.forEach(item=>{
              if(item.isChecked === isChecked) return //如果状态相同 则跳过
              let promise = dispatch('UpdateCartChecked',{skuId:item.skuId,isChecked})
              promises.push(promise) //存入数组
            })
            return Promise.all(promises) //返回一个promise.all()的结果
      },
      //删除单个商品
      async deleteCart({commit},skuId){
        const result = await reqDeleteCart(skuId)
        if (result.code === 200){
            return 'ok'
        }else{
            return Promise.reject('failed')
        }
      },
      //删除选中的商品
      async deleteCartAll({commit,getters,dispatch}){
        let promises = [];
        //getters.shopCarInfo.cartInfoList 获取到的就是我们的购物车列表数据
        getters.shopCarInfo.cartInfoList.forEach(item=>{
            if(!item.isChecked) return //如果没有选中 则跳过
            let promise = dispatch('deleteCart',item.skuId) //分发
            promises.push(promise)
        })
        return Promise.all(promises) //返回一个promise
    
      }
}

const getters = {
    //后面用来简化数据的操作
    // 这里是为了防止假报错
    shopCarInfo(state){
        return state.shopCartList[0] || {}
    }
}


export default {
    state,
    actions,
    mutations,
    getters,
}