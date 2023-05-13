<script>
import axios from 'axios'
import { signIn } from '../../api/auth.js'
import storageMixin from '@/mixins/storageMixin'

export default {
    mixins: [
        storageMixin,
    ],

    data() {
        return {
            login: '',
            password: '',
            loginInvalid: false,
            passwordInvalid: false,
            errors: []
        }
    },
    methods: {
        async signIn() {
            let isValid = true
            if (this.login == '') {
                this.loginInvalid = true
                isValid = false
            }
            if (this.password == '') {
                this.passwordInvalid = true
                isValid = false
            }
            if (!isValid) {
                return
            }
            
            let response
            try {
                response = await signIn(this.login, this.password)
            } catch (error) {
                if (error.response.data.message.includes('invalid login or password')) {
                    this.errors = ['Неверный логин или пароль']
                }
                return
            }

            this.setID(response.data.id)
            this.setName(response.data.name)
            this.setLogin(this.login.toLowerCase())
            this.setTokens(response.data.access_token, response.data.refresh_token)

            this.$router.push({ name: 'home' })
        }
    },
    mounted() {
        document.title = 'Вход'
    }
}
</script>


<template>
    <div class="container mt-5">
        <div class="row text-center mb-1">
            <h4>Вход в аккаунт</h4>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-5 border rounded p-4">
                <ul class="list-group">
                    <li
                        v-for="(error, index) in errors" 
                        :class="{'mb-3': index == errors.length-1}"
                        class="list-group-item list-group-item-danger">
                        {{ error }}
                    </li>
                </ul>
                <form>
                    <div class="mb-3">
                        <label v-focus for="loginInput" class="form-label">Логин</label>
                        <input 
                            v-model="login"
                            @input="loginInvalid = false"
                            :class="{'is-invalid': loginInvalid}"
                            type="text" 
                            class="form-control" 
                            id="loginInput">
                        <div class="invalid-feedback">
                            Введите логин
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Пароль</label>
                        <input 
                            v-model="password"
                            @input="passwordInvalid = false"
                            :class="{'is-invalid': passwordInvalid}"
                            type="password"
                            class="form-control"
                            id="passwordInput">
                        <div class="invalid-feedback">
                            Введите пароль
                        </div>
                    </div>
                    <button @click.prevent="signIn" class="btn btn-primary">Войти</button>
                </form>
            </div>
        </div>
    </div>
</template>
