<script>
import Navbar from '@/components/Navbar.vue'
import storageMixin from '@/mixins/storageMixin'

export default {
  mixins: [
    storageMixin
  ],

  components: {
    Navbar
  },

  mounted() {
    if (this.getAccessToken() === null) {
      this.$router.push({ name: 'sign-in' })
    }
  }
}
</script>

<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
  .pointer {
    cursor: pointer;
  }
</style>