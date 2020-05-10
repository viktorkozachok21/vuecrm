import firebase from "firebase/app";

export default {
  actions: {
    async loginUser({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },

    async registerNewUser({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getActiveUserUID')
        await firebase.database().ref(`/users/${uid}/info`).set({
          account: 0,
          name
        })
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },

    getActiveUserUID() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    async logoutActiveUser({ dispatch }) {
      await firebase.auth().signOut()
    }
  }
}
