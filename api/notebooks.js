import axios from 'axios'
import { API_URL } from '.'

export function getNotebooks(accessToken) {
    return axios.get(`${API_URL}/notebooks/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function createNotebook(accessToken, description) {
    return axios.post(`${API_URL}/notebooks/`, {
        'description': description
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}