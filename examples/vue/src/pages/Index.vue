<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Hello msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Hello from '@components/Hello';

export default {
  components: {
    Hello
  }
}
</script>
