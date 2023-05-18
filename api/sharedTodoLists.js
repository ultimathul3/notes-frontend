import axios from 'axios'
import { API_URL } from '.'

export function createSharedTodoList(accessToken, login, todoListID) {
    return axios.post(`${API_URL}/shared-todo-lists/incoming`, {
        'login': login,
        'todo_list_id': todoListID
    }, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function getAllSharedTodoListsInfo(accessToken) {
    return axios.get(`${API_URL}/shared-todo-lists/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function deleteSharedTodoList(accessToken, sharedTodoListID) {
    return axios.delete(`${API_URL}/shared-todo-lists/incoming/${sharedTodoListID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function acceptSharedTodoList(accessToken, sharedTodoListID) {
    return axios.post(`${API_URL}/shared-todo-lists/incoming/${sharedTodoListID}`, {}, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function getSharedTodoListData(accessToken, sharedTodoListID) {
    return axios.get(`${API_URL}/shared-todo-lists/${sharedTodoListID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export function getOutgoingSharedTodoLists(accessToken, todoListID) {
    return axios.get(`${API_URL}/shared-todo-lists/outgoing/${todoListID}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
