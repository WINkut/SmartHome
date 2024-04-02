import { createStore } from 'vuex'
// 导入插件 持久化插件
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapse: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeGetterRoute(state, value) {
      state.isGetterRouter = value;
    },
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 安装插件
  plugins: [createPersistedState({
    paths: ['isCollapse', 'userInfo'] //控制是否需要持久化
  })],
})
