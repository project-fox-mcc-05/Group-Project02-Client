<template>
    <div>
    <div class="home-container">
        <p class="text-white">Tebak.In</p>
        <form @submit.prevent = "enterGame">
            <input v-model="namapemain" width="10" class=" form-control text-center bg-white mytext" type="text" name="username" placeholder="Username">
            <button class="btn btn-dark mt-3">Enter</button>
        </form>
    </div>
</div>
</template>

<script>
import { Howl } from 'howler'
import socket from '../config/socket'
export default {
  data () {
    return {
      namapemain: ''
    }
  },
  methods: {
    playingAudio () {
      const sound = new Howl({
        src: ['https://storage.cloud.google.com/mp3players/lobby-classic-game.mp3']
      })
      sound.play()
    },
    enterGame () {
      localStorage.setItem('namapemain', this.namapemain)
      socket.emit('fetchUsers', this.namapemain)
      this.namapemain = ''
      this.$store.commit('changeWaitingRoom', true)
      this.playingAudio()
    }
  }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
    p {
        font-family: 'Bangers';
        font-size: 4rem;
    }
    .home-container {
        margin: auto;
        width: 500px;
        margin-left: 620px;
        margin-top: 280px;
    }
    ::placeholder {
        color: #009999;
        opacity: 1;
        font-family: 'Pangolin';
    }
    .form-control {
        width: 200px !important;
    }
    .btn {
        width: 200px !important;
        font-family: 'Pangolin';
    }
</style>
