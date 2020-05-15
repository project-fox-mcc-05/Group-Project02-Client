<template>
<router-view></router-view>
</template>

<script>
export default {
  created () {
    localStorage.clear()
    const audio = new Audio('https://mp3players.s3.us-east-2.amazonaws.com/lobby-classic-game.mp3')
    audio.play()
  }
}
</script>
<style>

</style>
