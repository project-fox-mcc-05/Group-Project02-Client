<template>
  <div class="container pt-5 pb-5">
    <div class="card bg-white text-dark">
      <div class="row">
        <div class="col center">
          <h3 class="text-center">{{ soal.id }}</h3>
          <div class="col center">
            <img v-if="soal.image" :src="soal.image" alt="">
          </div>
          <p class="text-center">{{ soal.question}}</p>
        </div>
      </div>
      <div>
        <div class="row pb-3">
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(soal.answers[0].answer)">{{ soal.answers[0].option }}. {{soal.answers[0].text}}</button>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(soal.answers[1].answer)">{{ soal.answers[1].option }}. {{soal.answers[1].text}}</button>
            </div>
          </div>
        </div>
        <div class="row pb-3">
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(soal.answers[2].answer)">{{ soal.answers[2].option }}. {{soal.answers[2].text}}</button>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(soal.answers[3].answer)">{{ soal.answers[3].option }}. {{soal.answers[3].text}}</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isFinish === true">
        <p class="text-center">Jawaban: </p>
        <p class="text-center"> {{ trueAnswer.option}} - {{trueAnswer.text}} </p>
        <div v-if="soal.id == 10">
          <button class="btn btn-lg btn-success btn-block text-white" @click.prevent="showResult">Liat Hasil</button>
        </div>
        <div v-else>
          <button class="btn btn-lg btn-primary btn-block text-white" @click.prevent="changeCurrentQuestionNumber">Soal Selanjutnya</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import socket from '../config/socket'

export default {
  name: 'QuestionCard',
  props: ['question'],
  data () {
    return {
      currentScore: 0,
      isFinish: false,
      soal: this.question
    }
  },
  methods: {
    userClick (answer) {
      if (answer === true) {
        this.currentScore = 1
        console.log('skor tambah 1')
      } else {
        this.currentScore = 0
        console.log('skor ga nambah')
      }
    },
    sendScore () {
      const username = localStorage.namapemain
      const score = this.currentScore
      socket.emit('changeScore', username, score)
    },
    changeCurrentQuestionNumber () {
      this.$emit('changeCurrentQuestionNumber')
    },
    showResult () {
      console.log('menuju halaman result')
    }
  },
  computed: {
    trueAnswer () {
      let correctAnswer = null
      for (let i = 0; i < this.soal.answers.length; i++) {
        if (this.soal.answers[i].answer) {
          correctAnswer = this.soal.answers[i]
          break
        }
      }
      return correctAnswer
    }
  },
  created () {
    setTimeout(() => {
      this.isFinish = true
      this.sendScore()
    }, 5000)
  }
}
</script>

<style scoped>
  img {
    width: 200px;
  }
</style>
