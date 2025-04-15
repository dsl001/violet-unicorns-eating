<template>
  <div>
    <label>Hello with a Twist</label>
    <label>{{ getMessage }}</label>
    <button @click="toggleMessage">Toggle Message</button>
  </div>
</template>

<script>
const HELLO_MESSAGE = "Hello World!"
const ENCOURAGEMENT_MESSAGE = "You've got this! ✨"

export default {
  name: 'HelloWithATwist',
  data() {
    return {
      showHello: true,
    }
  },
  computed: {
    getMessage() {
      return this.showHello ? HELLO_MESSAGE : ENCOURAGEMENT_MESSAGE;
    }
  },
  methods: {
    toggleMessage() {
      this.showHello = !this.showHello;
    }
  }
}
</script>