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
import socket from '../config/socket'
export default {
  data () {
    return {
      namapemain: ''
    }
  },
  methods: {
    playingAudio () {
      const audio = new Audio('https://mp3players.s3.us-east-2.amazonaws.com/lobby-classic-game.mp3')
      audio.play()
    },
    enterGame () {
      if (this.$store.state.isPlay === false) {
        localStorage.setItem('namapemain', this.namapemain)
        socket.emit('fetchUsers', this.namapemain)
        this.namapemain = ''
        this.$store.commit('changeWaitingRoom', true)
        this.playingAudio()
      } else {
        const Swal = require('sweetalert2')
        Swal.fire({
          icon: 'error',
          title: 'Sorry...',
          text: 'Room already started'
        })
      }
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
