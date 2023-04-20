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
        getRefreshToken() {
            return localStorage.getItem('refresh_token')
        },
        setTokens(accessToken, refreshToken) {
            localStorage.setItem("access_token", accessToken)
            // must be in http only cookie :)
            localStorage.setItem("refresh_token", refreshToken)
        },
        setID(id) {
            localStorage.setItem("id", id)
        },
        setName(name) {
            localStorage.setItem("name", name)
        },
        setLogin(login) {
            localStorage.setItem("login", login)
        },
        deleteAll() {
            localStorage.clear()
        }
    }
}
