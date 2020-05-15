<template>
  <div class="container center">
    <h2>Result</h2>
    <div v-for="(user,i) in users" :key="i">
      <p v-if="user.name">{{ user.name }} ===> {{ user.score }}</p>
    </div>
    <button class="btn btn-primary btn-lg" @click.prevent="backToHomeTogether">Back Home</button>
  </div>
</template>

<script>
import socket from '../config/socket'

export default {
  name: 'Result',
  data () {
    return {
      users: [],
      highestScore: 0,
      winner: {}
    }
  },
  methods: {
    backToHomeTogether () {
      socket.emit('backToHomeTogether')
    }
  },
  created () {
    socket.on('updateScore', (data) => {
      this.users = data
    })
    socket.on('backToHomeTogether', (data) => {
      localStorage.namapemain = ''
      this.$router.push('/')
    })
  }
}
</script>

<style>

</style>
