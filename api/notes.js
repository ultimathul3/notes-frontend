import axios from 'axios'
import { API_URL } from '.'

export function getNotes(accessToken, notebookID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/notes/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}