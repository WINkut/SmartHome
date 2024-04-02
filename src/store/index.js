import { createStore } from 'vuex'
// 导入插件 持久化插件
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    //成功案例数据
    CaseList: {},
    // 全部商品数据
    productList: {},
    TeamList: {}
  },
  getters: {
  },
  mutations: {
    changeNewListInfo(state, value) {
      state.CaseList = {
        ...state.CaseList,
        ...value
      }
    },
    changeProductList(state, value) {
      state.productList = {
        ...state.productList,
        ...value
      }
    },
    changeTeamList(state, value) {
      state.TeamList = {
        ...state.TeamList,
        ...value
      }
    },

  },
  actions: {
  },
  modules: {
  },
  // 安装插件
  plugins: [createPersistedState({
    paths: ['CaseList', 'productList'] //控制是否需要持久化
  })],
})
