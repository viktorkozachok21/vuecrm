import firebase from "firebase/app"

export default {
  state: {
    activeUserInfo: {}
  },
  mutations: {
    SET_ACTIVE_USER_INFO(state, info) {
      state.activeUserInfo = info
    },
    CLEAR_ACTIVE_USER_INFO(state) {
      state.activeUserInfo = {}
    }
  },
  actions: {
    async updateActiveUserInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getActiveUserUID')
        const updateData = {...getters.getActiveUserInfo, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('SET_ACTIVE_USER_INFO', updateData)
      } catch(error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async fetchInfoAboutActiveUser({ dispatch, commit }) {
      try {
        const uid = await dispatch('getActiveUserUID')
        const activeUserInfo = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('SET_ACTIVE_USER_INFO', activeUserInfo)
      } catch(error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async fetchUserCurrency({ commit }) {
      try {
        const key = process.env.VUE_APP_API
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${key}&symbols=USD,EUR,UAH`)
        return await response.json()
      } catch(error) {
        commit('SET_ERROR', error)
        throw error
      }
    }
  },
  getters: {
    getActiveUserInfo: state => state.activeUserInfo
  }
}
