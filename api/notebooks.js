import axios from 'axios'
import { API_URL } from '.'

export function getNotebooks(accessToken) {
    return axios.get(`${API_URL}/notebooks/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}