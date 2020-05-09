import firebase from "firebase/app"

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getActiveUserUID')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch(error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async fetchRecordsForActiveUser({ dispatch, commit }) {
      try {
        const uid = await dispatch('getActiveUserUID')
        const allRecordsOfActiveUser = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(allRecordsOfActiveUser).map(key => ({...allRecordsOfActiveUser[key], id: key}))
      } catch(error) {
        commit('SET_ERROR', error)
        throw error
      }
    }
  }
}
