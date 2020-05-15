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
  }
}
</script>
<style>

</style>
