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
    async fetchInfoAboutActiveUser({ dispatch, commit }) {
      const uid = await dispatch('getActiveUserUID')
      const activeUserInfo = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
      commit('SET_ACTIVE_USER_INFO', activeUserInfo)
    },
    async fetchUserCurrency() {
      const key = process.env.VUE_APP_API_FIXER
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      return await response.json()
    }
  },
  getters: {
    getActiveUserInfo: state => state.activeUserInfo
  }
}
