<template>
<router-view></router-view>
</template>

<script>
import socket from './config/socket'
export default {
  created () {
    socket.on('playStatus', (data) => {
      this.$store.commit('changePlayStatus', data)
    })
    localStorage.clear()
    const audio = new Audio('https://mp3players.s3.us-east-2.amazonaws.com/lobby-classic-game.mp3')
    audio.play()
  }
}
</script>
<style>

</style>
