import axios from 'axios'
import { API_URL } from '.'

export function getTodoItems(accessToken, notebookID, todoListID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/todo-lists/${todoListID}/items/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function createTodoItem(accessToken, notebookID, listID, body) {
    return axios.post(`${API_URL}/notebooks/${notebookID}/todo-lists/${listID}/items/`, {
        'body': body
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function updateTodoItemBody(accessToken, notebookID, listID, itemID, body) {
    return axios.patch(`${API_URL}/notebooks/${notebookID}/todo-lists/${listID}/items/${itemID}`, {
        'body': body,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function updateTodoItemDone(accessToken, notebookID, listID, itemID, done) {
    return axios.patch(`${API_URL}/notebooks/${notebookID}/todo-lists/${listID}/items/${itemID}`, {
        'done': done,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function deleteTodoItem(accessToken, notebookID, listID, itemID) {
    return axios.delete(`${API_URL}/notebooks/${notebookID}/todo-lists/${listID}/items/${itemID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
