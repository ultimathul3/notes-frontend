<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
