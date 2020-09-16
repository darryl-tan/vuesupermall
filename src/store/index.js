import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations'
//安装插件

Vue.use(Vuex)

//创建store 对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    getters
})

//挂在到vue 实例
export default store