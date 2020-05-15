import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    waitingRoom: false,
    totalScore: 0,
    usersList: [],
    questionList: [],
    currentQuestionNumber: 0
  },
  mutations: {
    changeWaitingRoom (state, payload) {
      state.waitingRoom = payload
    },
    changeUserList (state, payload) {
      state.usersList = payload
    },
    changeQuestionList (state, payload) {
      state.questionList = payload
    },
    changeCurrentQuestionNumber (state) {
      state.currentQuestionNumber += 1
    },
    changeTotalScore (state, payload) {
      state.totalScore += payload
    }
  },
  actions: {
  },
  modules: {
  }
})
