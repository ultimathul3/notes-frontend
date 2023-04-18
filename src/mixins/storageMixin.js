export default {
    methods: {
        getAccessToken() {
            return localStorage.getItem('access_token')
        },
    }
}
