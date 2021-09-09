<template>
  <div class="home">
    PAGE1
    {{ $store.state.counter }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  mounted () {
    // console.log(this.$sb)
  }
}
</script>
