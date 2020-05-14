<template>
  <div>
    <h2>Result</h2>
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
    socket.on('backToHomeTogether', (data) => {
      this.$router.push('/')
    })
  }
}
</script>

<style>

</style>
