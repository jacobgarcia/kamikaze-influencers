<template>
  <body>
    <p>{{defaultMessage}}</p>
    <button type="button" @click="hello()" name="button">Click me!</button>
  </body>
</template>

<script>
export default {
  created() {
    console.log('Index was created')
  },
  data() {
    return {
      defaultMessage: 'Hello from index'
    }
  },
  methods: {
    hello() {
      console.log('Hello was called :)')
    }
  }
}

</script>
