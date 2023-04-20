import axios from 'axios'
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
