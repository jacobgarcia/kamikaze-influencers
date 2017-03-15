<template>
  <div>
    <p>Header</p>
    <router-view></router-view>
    <p>Footer</p>
  </div>
</template>

<script>
export default {
    data() {
      return {
      }
    },
    created() {

      console.log('App was created')

    }
  }
</script>
