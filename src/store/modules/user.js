import User from '../../api/user'
import {
  setItem,
  getItem,
  removeItem
} from '../../utils/storage'
import {
  resetRouter
} from '../../utils/removeRouter'
export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: '',
    routes: ''
  }),
  mutations: {
    // 将token存入本地
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setRoutes(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    // 将token存入vuex
    async setToken({
      commit
    }, payload) {
      commit('setToken', payload)
    },
    // 将用户信息存入vuex
    async getUserInfo({
      commit
    }) {
      const response = await User.getUserInfo()
      commit('setUserInfo', response)
      return response
    },
    // 将路由数据存入vuex
    async getRoutes({
      commit
    }) {
      const response = await User.getRoutes()
      commit('setRoutes', response)
      return response
    },
    // 删除本地和vuex的token和用户信息
    async logout({
      commit
    }) {
      const response = await User.logout()
      resetRouter()
      commit('setToken', '')
      commit('setUserInfo', {})
      removeItem('token')
      return response
    }
  }
}
