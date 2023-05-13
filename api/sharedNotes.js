import axios from 'axios'
import { API_URL } from '.'

export function createSharedNote(accessToken, login, noteID) {
    return axios.post(`${API_URL}/shared-notes/incoming`, {
        'login': login,
        'note_id': noteID
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function getIncomingSharedNote(accessToken) {
    return axios.get(`${API_URL}/shared-notes/incoming`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function deleteSharedNote(accessToken, sharedNoteID) {
    return axios.delete(`${API_URL}/shared-notes/incoming/${sharedNoteID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
