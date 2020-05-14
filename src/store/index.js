import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    waitingRoom: false
  },
  mutations: {
    changeWaitingRoom (state, payload) {
      state.waitingRoom = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
