import axios from 'axios'
import { API_URL } from '.'

export function getNotes(accessToken, notebookID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/notes/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function getNote(accessToken, notebookID, noteID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/notes/${noteID}`, {
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

export function updateNoteTitle(accessToken, notebookID, noteID, title) {
    return axios.patch(`${API_URL}/notebooks/${notebookID}/notes/${noteID}`, {
        'title': title,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function updateNoteBody(accessToken, notebookID, noteID, body) {
    return axios.patch(`${API_URL}/notebooks/${notebookID}/notes/${noteID}`, {
        'body': body,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
