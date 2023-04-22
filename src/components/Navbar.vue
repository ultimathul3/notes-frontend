<script>
import storageMixin from '@/mixins/storageMixin'
import tokensMixin from '@/mixins/tokensMixin'
import { logout } from '../../api/auth.js'

export default {
  mixins: [
    storageMixin,
    tokensMixin,
  ],

  methods: {
    async logout() {
      let refreshed = await this.refreshTokens()
      if (!refreshed) {
        return
      }

      try {
        await logout(this.getAccessToken(), this.getRefreshToken())
      } catch (error) {}

      this.deleteAll()
      this.$router.push({ name: 'sign-in' })
    }
  }
}
</script>

<template>
  <header class="p-1 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li 
            @click="$router.push({ name: 'home' })"
            class="pointer">
            <strong><a class="nav-link text-white" style="font-size: 1.4em">Заметки</a></strong>
          </li>
        </ul>

        <div class="text-end">
          <div class="dropdown">
            <button
              v-if="getAccessToken() !== null"
              type="button"
              class="btn btn-outline-light dropdown-toggle me-2"
              data-bs-toggle="dropdown">
              <i class="bi bi-person"></i> {{ getName() }} <i>({{ getLogin() }})</i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><button class="dropdown-item pointer" type="button">Уведомления</button></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item pointer" type="button" @click="logout">Выйти</button></li>
            </ul>
          </div>
          
          <button
            v-if="$route.name === 'sign-in'"
            @click="$router.push({ name: 'sign-up' })"
            type="button"
            class="btn btn-warning">
            Зарегистрироваться
          </button>
          <button
            v-if="$route.name === 'sign-up'"
            @click="$router.push({ name: 'sign-in' })"
            type="button"
            class="btn btn-warning">
            Войти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
