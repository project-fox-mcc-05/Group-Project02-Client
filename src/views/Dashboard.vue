<template>
<div>
  <div class="container center pt-5">
    <Rooms></Rooms>
    <div v-if="isPlay === false">
      <h4 class="text-center">Rules</h4>
      <ul>
        <li>Jumlah soal sebanyak 10</li>
        <li>Tiap soal diberi waktu sebanyak 10 detik</li>
        <li>Tidak ada sistem minus, ini bukan SNMPTN</li>
        <li>Kerjakan soal dengan baik, plis!</li>
      </ul>
      <button class="btn btn-success btn-lg btn-block" @click.prevent="playNow">PLAY</button>
    </div>
    <div v-if="isPlay === true">
      <div class="row text-center">
        <div class="col">
          <p>Current score here</p>
        </div>
        <div class="col">
          <p>Time here</p>
        </div>
      </div>
      <QuestionCard
      :question="question"
      :currentQuestionNumber="currentQuestionNumber"
      ></QuestionCard>
    </div>
    <div v-if="isResult === true">
      <Result></Result>
    </div>
  </div>
</div>
</template>

<script>
import Rooms from '../components/Rooms'
import QuestionCard from '../components/QuestionCard'
import Result from '../components/Result'
import socket from '../config/socket'

export default {
  name: 'Dashboard',
  components: {
    QuestionCard, Result, Rooms
  },
  data () {
    return {
      roomName: '',
      allRooms: [],
      isPlay: false,
      isResult: false
    }
  },
  computed: {
    usersList () {
      return this.$store.state.usersList
    },
    questionList () {
      return this.$store.state.questionList
    },
    currentQuestionNumber () {
      return this.$store.state.currentQuestionNumber
    },
    question () {
      return this.$store.state.questionList[this.$store.state.currentQuestionNumber]
    }
  },
  methods: {
    playNow () {
      this.isPlay = true
      socket.emit('startTogether')
    },
    fetchRooms () {
      socket.emit('updateScore', 1)
    },
    socketKirim () {
      socket.on('updateScore', (rooms) => {
        this.allRooms = rooms
      })
    },
    fetchUsers () {
      socket.emit('fetchUsers')
    },
    getUsersFromServer () {
      socket.on('fetchUsers', (data) => {
        this.$store.commit('changeUserList', data)
      })
    },
    fetchQuestions () {
      socket.emit('fetchQuestions')
    },
    getQuestionsFromServer () {
      socket.on('fetchQuestions', (data) => {
        this.$store.commit('changeQuestionList', data)
      })
    },
    getCurrentPage () {
      socket.on('nextQuestion', (data) => {
        this.$store.commit('currentQuestionNumber')
      })
    }
  },
  created () {
    this.fetchRooms()
    this.socketKirim()
    this.fetchUsers()
    this.getUsersFromServer()
    this.fetchQuestions()
    this.getQuestionsFromServer()
    socket.on('startTogether', (data) => {
      if (data) {
        this.isPlay = true
      }
    })
    socket.on('showResultTogether', (data) => {
      this.isResult = true
    })
  }
}
</script>
<style>
  ul li {
    font-family: 'Roboto';
  }
</style>
