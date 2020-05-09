import firebase from "firebase/app"

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getActiveUserUID')
        const newCategory = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: newCategory.key }
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch('getActiveUserUID')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async fetchCategoriesForActiveUser({ dispatch, commit }) {
      try {
        const uid = await dispatch('getActiveUserUID')
        const allCategoriesOfActiveUser = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(allCategoriesOfActiveUser).map(key => ({...allCategoriesOfActiveUser[key], id: key}))
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    }
  }
}
