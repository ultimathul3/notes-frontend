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
                    <button @click.prevent="signin" class="btn btn-primary">Войти</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
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
        async signin() {
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
                
            // TODO: signin
            // localStorage.setItem('access_token', accessToken)

            this.$router.push({ name: 'home' })
        }
    },
    mounted() {
        document.title = 'Вход'
    }
}
</script>