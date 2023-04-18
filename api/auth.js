import axios from 'axios'
import { API_URL } from '.'

export default function signUp(login, name, password) {
    return axios.post(`${API_URL}/auth/sign-up`, {
        'login': login,
        'name': name,
        'password': password,
    })
}
