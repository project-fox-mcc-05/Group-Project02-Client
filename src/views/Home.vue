<template>
<div>
    <LoginForm v-show ="!isWaitingRoom"></LoginForm>
    <WaitingRoom v-show ="isWaitingRoom"></WaitingRoom>
</div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import WaitingRoom from '@/components/WaitingRoom.vue'

export default {
  components: {
    LoginForm,
    WaitingRoom
  },
  computed: {
    isWaitingRoom () {
      return this.$store.state.waitingRoom
    }
  }
}
</script>

<style>
  * {
    background-color: #33cc33;
  }
</style>
