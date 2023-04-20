export default {
    methods: {
        getAccessToken() {
            return localStorage.getItem('access_token')
        },
        getName() {
            return localStorage.getItem('name')
        },
        getLogin() {
            return localStorage.getItem('login')
        },
    }
}
