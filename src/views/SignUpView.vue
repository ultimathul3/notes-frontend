<script>
import axios from 'axios'
import { signUp, signIn } from '../../api/auth.js'
import storageMixin from '@/mixins/storageMixin'

export default {
    mixins: [
        storageMixin,
    ],

    data() {
        return {
            login: '',
            name: '',
            password: '',
            password2: '',
            loginInvalid: false,
            nameInvalid: false,
            passwordInvalid: false,
            password2Invalid: false,
            errors: []
        }
    },
    methods: {
        async signUp() {
            let isValid = true
            if (this.login == '') {
                this.loginInvalid = true
                isValid = false
            }
            if (this.name == '') {
                this.nameInvalid = true
                isValid = false
            }
            if (this.password == '') {
                this.passwordInvalid = true
                isValid = false
            }
            if (this.password2 == '') {
                this.password2Invalid = true
                isValid = false
            }
            if (this.password !== this.password2) {
                this.errors = ['Пароли не совпадают']
                this.password2Invalid = true
                isValid = false
            }
            if (!isValid) {
                return
            }

            let response
            try {
                response = await signUp(this.login, this.name, this.password)
            } catch (error) {
                if (error.response.data.message.includes('login length')) {
                    this.errors = ['Логин должен быть от 4 до 15 символов']
                } else if (error.response.data.message.includes('name length')) {
                    this.errors = ['Имя должо быть от 2 до 50 символов']
                } else if (error.response.data.message.includes('password length')) {
                    this.errors = ['Пароль должен быть от 6 до 256 символов']
                } else if (error.response.data.message.includes('login should not')) {
                    this.errors = ['Логин не должен состоять только из цифр']
                } else if (error.response.data.message.includes('login must')) {
                    this.errors = ['Логин должен содержать только буквы и цифры']
                } else if (error.response.data.message.includes('name must')) {
                    this.errors = ['Имя должно состоять только из букв']
                } else if (error.response.data.message.includes('user with such')) {
                    this.errors = ['Пользователь с таким логином уже существует']
                }
                return
            }

            try {
                response = await signIn(this.login, this.password)
            } catch (error) {
                return
            }
            
            this.setID(response.data.id)
            this.setName(this.name)
            this.setLogin(this.login)
            this.setTokens(response.data.access_token, response.data.refresh_token)

            this.$router.push({ name: 'home' })
        }
    },
    mounted() {
        document.title = 'Регистрация'
    }
}
</script>


<template>
    <div class="container mt-5 mb-5">
        <div class="row text-center mb-1">
            <h4>Регистрация аккаунта</h4>
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
                        <label for="usernameInput" class="form-label">Имя</label>
                        <input
                            v-model="name"
                            @input="nameInvalid = false"
                            :class="{'is-invalid': nameInvalid}"
                            type="text" 
                            class="form-control" 
                            id="usernameInput">
                        <div class="invalid-feedback">
                            Введите имя
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
                    <div class="mb-3">
                        <label for="passwordInput2" class="form-label">Пароль повторно</label>
                        <input
                            v-model="password2"
                            @input="password2Invalid = false"
                            :class="{'is-invalid': password2Invalid}" 
                            type="password" 
                            class="form-control" 
                            id="passwordInput2">
                        <div class="invalid-feedback">
                            Введите пароль повторно
                        </div>
                    </div>
                    <button @click.prevent="signUp" class="btn btn-primary">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    </div>
</template>
