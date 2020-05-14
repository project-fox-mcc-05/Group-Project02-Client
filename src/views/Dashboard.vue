<template>
<div class="container center pt-5">
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
    <QuestionCard></QuestionCard>
  </div>
  <div v-if="isResult === true">
    <Result></Result>
  </div>
</div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'
import Result from '../components/Result'

export default {
  name: 'Dashboard',
  components: {
    QuestionCard, Result
  },
  data () {
    return {
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
    createRoom () {
      // socket.emit('create-room', 'halo')
    },
    fetchRoom () {
      // socket.emit('fetch-room', 'halo')
    }
  }
}
</script>
<style>

</style>
