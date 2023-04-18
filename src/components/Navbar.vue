<script>
import storageMixin from '@/mixins/storageMixin'

export default {
  mixins: [
    storageMixin
  ],
}
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li 
            @click="$router.push({ name: 'home' })"
            class="pointer">
            <a class="nav-link text-white" style="font-size: 1.4em">Заметки</a>
          </li>
        </ul>

        <div v-if="getAccessToken() !== null" class="px-3">
          Имя пользователя
        </div>
        <div class="text-end">
            <button
            v-if="getAccessToken() !== null"
            @click="logout"
            type="button"
            class="btn btn-outline-light me-2">
            Выйти
          </button>
          <button
            v-if="$route.name === 'sign-in'"
            @click="$router.push({ name: 'sign-up' })"
            type="button"
            class="btn btn-warning">
            Зарегистрироваться
          </button>
          <button
            v-if="$route.name === 'signup'"
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


<style scoped>
.pointer {
  cursor: pointer;
}
</style>