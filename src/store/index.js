import { createStore } from "vuex";
import router from "../router/index";
const state = {};
const getters = {};
const mutations = {
  // Define your mutations here
  // For example:
  // UPDATE_USER(state, payload) {
  //   state.user = payload;
  // },
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.value);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
