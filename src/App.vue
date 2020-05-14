<template>
<router-view></router-view>
</template>

<script>
export default {
  created () {
    localStorage.clear()
  }
}
</script>
<style>

</style>
