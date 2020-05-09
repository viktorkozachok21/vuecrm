import Vue from "vue";
import Vuex from "vuex";
import AuthorizationStore from "@/views/authorizationPage/auth.store";
import HomeStore from "@/views/homePage/home.store";
import CategoryStore from "@/views/categoriesPage/category.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {},
  getters: {
    getAuthError: state => state.error
  },
  modules: {
    AuthorizationStore,
    HomeStore,
    CategoryStore
  }
});
