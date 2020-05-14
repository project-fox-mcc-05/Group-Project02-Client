<template>
  <div class="container pt-5 pb-5">
    <div class="card bg-white text-dark">
      <div class="row">
        <div class="col center">
          <h3 class="text-center">{{ question.id }}</h3>
          <div class="col center">
            <img v-if="question.image" :src="question.image" alt="">
          </div>
          <p class="text-center">{{ question.question}}</p>
        </div>
      </div>
      <div>
        <div class="row pb-3">
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(question.answers[0].answer)">{{ question.answers[0].option }}. {{question.answers[0].text}}</button>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(question.answers[1].answer)">{{ question.answers[1].option }}. {{question.answers[1].text}}</button>
            </div>
          </div>
        </div>
        <div class="row pb-3">
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(question.answers[2].answer)">{{ question.answers[2].option }}. {{question.answers[2].text}}</button>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <button class="btn btn-secondary btn-lg btn-block" @click.prevent="userClick(question.answers[3].answer)">{{ question.answers[3].option }}. {{question.answers[3].text}}</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isFinish === true">
        <p class="text-center">Jawaban: </p>
        <p class="text-center"> {{ trueAnswer.option}} - {{trueAnswer.text}} </p>
        <div v-if="question.id == 10">
          <button class="btn btn-lg btn-success btn-block text-white" @click.prevent="showResult">Liat Hasil</button>
        </div>
        <div v-else>
          <button class="btn btn-lg btn-primary btn-block text-white" @click.prevent="changeCurrentQuestionNumber">question Selanjutnya</button>
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
      alreadyAnswered: false
    }
  },
  methods: {
    userClick (answer) {
      if (answer === true && this.alreadyAnswered === false) {
        this.currentScore += 1
        this.alreadyAnswered = true
        console.log('skor tambah 1')
      } else {
        this.currentScore += 0
        this.alreadyAnswered = true
        console.log('skor ga nambah')
      }
    },
    sendScore () {
      const username = localStorage.namapemain
      const score = this.currentScore
      socket.emit('changeScore', username, score)
    },
    changeCurrentQuestionNumber () {
      this.currentScore = 0
      this.alreadyAnswered = false
      this.$emit('changeCurrentQuestionNumber')
      this.isFinish = false
      setTimeout(() => {
        this.isFinish = true
        this.sendScore()
      }, 5000)
    },
    showResult () {
      console.log('menuju halaman result')
    }
  },
  computed: {
    trueAnswer () {
      let correctAnswer = null
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.question.answers[i].answer) {
          correctAnswer = this.question.answers[i]
          break
        }
      }
      return correctAnswer
    }
  },
  created () {
    this.isFinish = false
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
