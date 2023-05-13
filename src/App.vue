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

  data() {
    return {
      notificationsCount: 0,
    }
  },

  mounted() {
    if (this.getAccessToken() === null) {
      this.$router.push({ name: 'sign-in' })
    }
  },

  methods: {
    updateNotificationsCount(count) {
      this.notificationsCount = count
    }
  }
}
</script>

<template>
  <navbar :notificationsCount="notificationsCount"></navbar>
  <div class="app">
    <router-view :notificationsCount="notificationsCount" @updateNotificationsCount="updateNotificationsCount"></router-view>
  </div>
  <div style="height: 10em;"></div>
</template>

<style>
  .pointer {
    cursor: pointer;
  }
</style>