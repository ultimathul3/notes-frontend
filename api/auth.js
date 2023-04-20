import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { API_URL } from '.'

export function signUp(login, name, password) {
    return axios.post(`${API_URL}/auth/sign-up`, {
        'login': login,
        'name': name,
        'password': password,
    })
}

export function signIn(login, password) {
    return axios.post(`${API_URL}/auth/sign-in`, {
        'login': login,
        'password': password,
    })
}

export function logout(accessToken, refreshToken) {
    return axios.post(`${API_URL}/auth/logout`, {
        'refresh_token': refreshToken,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function refresh(refreshToken) {
    return axios.post(`${API_URL}/auth/refresh`, {
        'refresh_token': refreshToken,
    })
}

export function isAccessTokenExpired(accessToken) {
    return Math.round(Date.now() / 1000) + 2 > jwt_decode(accessToken).exp
}
