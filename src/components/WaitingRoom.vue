<template>
    <div>
        <p class="text-white text-center">Tebak.In</p>
        <p class="mt-4" id="total-player">Total Player {{ users.length }}</p>
        <div class="box-container mt-1">
            <table class="table text-white">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Room Participant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, i) in users" :key="i">
                        <td class="mt-4">{{ i + 1 }}</td>
                        <td class="mt-4">{{ user }}</td>
                    </tr>
                </tbody>
            </table>
            <button v-show="button" @click.prevent="goToDashboard" class="btn btn-dark">Start Game</button>
        </div>
    </div>
</template>

<script>
import socket from '../config/socket'
export default {
  data () {
    return {
      users: [],
      button: false
    }
  },
  watch: {
    users () {
      if (this.users.length > 1) {
        this.button = true
      }
    }
  },
  methods: {
    goToDashboard () {
      this.$router.push('/dashboard')
    }
  },
  created () {
    socket.on('fetchRooms', (data) => {
      this.users = data
    })
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    p {
        font-family: 'Bangers';
        font-size: 5rem;
    }
    .box-container {
        margin: auto;
        width: 250px;
    }
    img {
        width: 100px;
        height: 100px;
    }
    .table {
        font-family: 'Roboto';
    }
    #total-player {
        font-family: 'Roboto';
        font-size: 2rem;
        color: white;
        margin-left: 10px;
    }
</style>
