import axios from 'axios'
import { API_URL } from '.'

export function getTodoLists(accessToken, notebookID) {
    return axios.get(`${API_URL}/notebooks/${notebookID}/todo-lists/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function createTodoList(accessToken, notebookID, title) {
    return axios.post(`${API_URL}/notebooks/${notebookID}/todo-lists/`, {
        'title': title,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function updateTodoList(accessToken, notebookID, todoListID, title) {
    return axios.put(`${API_URL}/notebooks/${notebookID}/todo-lists/${todoListID}`, {
        'title': title,
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function deleteTodoList(accessToken, notebookID, todoListID) {
    return axios.delete(`${API_URL}/notebooks/${notebookID}/todo-lists/${todoListID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
