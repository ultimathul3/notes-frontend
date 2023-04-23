import axios from 'axios'
import { API_URL } from '.'

export function getNotes(accessToken, notebookID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/notes/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function createNote(accessToken, notebookID, title, body) {
    return axios.post(`${API_URL}/notebooks/${notebookID}/notes/`, {
        'title': title,
        'body': body
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function deleteNote(accessToken, notebookID, noteID) {
    return axios.delete(`${API_URL}/notebooks/${notebookID}/notes/${noteID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function updateNote(accessToken, notebookID, noteID, title, body) {
    return axios.put(`${API_URL}/notebooks/${notebookID}/notes/${noteID}`, {
        'title': title,
        'body': body
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
