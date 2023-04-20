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
            localStorage.setItem("refresh_token", refreshToken)
        },
        deleteAll() {
            localStorage.clear()
        }
    }
}
