import axios from 'axios'
import { API_URL } from '.'

export function searchByTitle(accessToken, title) {
    return axios.get(`${API_URL}/search/?title=${encodeURI(title)}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
