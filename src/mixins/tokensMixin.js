import storageMixin from '@/mixins/storageMixin'
import { refresh, isAccessTokenExpired } from '../../api/auth.js'

export default {
    mixins: [
        storageMixin,
    ],

    methods: {
        async refreshTokens() {
            let accessToken = this.getAccessToken()
            let refreshToken = this.getRefreshToken()

            if (isAccessTokenExpired(accessToken)) {
                let response
                
                try {
                    response = await refresh(refreshToken)
                } catch (error) {
                    localStorage.clear()
                    this.deleteAll()
                    this.$router.push({ name: 'sign-in' })
                    return false
                }
                
                accessToken = response.data.access_token
                refreshToken = response.data.refresh_token
            }

            this.setTokens(accessToken, refreshToken)

            return true
        }
    }
}