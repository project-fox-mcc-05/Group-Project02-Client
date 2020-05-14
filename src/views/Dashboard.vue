<template>
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
    <QuestionCard></QuestionCard>
  </div>
  <div v-if="isResult === true">
    <Result></Result>
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
      questionList: '', // butuh data seluruh soal
      currentQuestion: 0, // index dr array list question
      isPlay: false,
      isResult: false
      // dari store: currentUser, currentUserScore
    }
  },
  methods: {
    nextQuestion () {
      this.currentQuestion += 1 // harusnya watch dr store
    },
    playNow () {
      this.isPlay = true
    },
    fetchRooms () {
      socket.emit('updateScore', 1)
    },
    socketKirim () {
      socket.on('updateScore', (rooms) => {
        this.allRooms = rooms
      })
    }
  },
  created () {
    this.fetchRooms()
    this.socketKirim()
  }
}
</script>
<style>

</style>
