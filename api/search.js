import axios from 'axios'
import { API_URL } from '.'

export function searchByTitle(accessToken, title) {
    return axios.get(`${API_URL}/search/?title=${encodeURI(title)}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

function formatDate(date) {
    return Math.round(date.getTime()/1000)
}

export function advancedSearch(accessToken, title, notes, sharedNotes, lists, sharedLists, createDates, updateDates) {    
    let createDatesQuery = ''
    if (createDates !== undefined && createDates !== null && createDates.length != 0) {
        createDatesQuery = `&created-from=${formatDate(createDates[0])}&created-to=${formatDate(createDates[1])}`
    }
    
    let updateDatesQuery = ''
    if (updateDates !== undefined && updateDates !== null && updateDates.length != 0) {
        updateDatesQuery = `&updated-from=${formatDate(updateDates[0])}&updated-to=${formatDate(updateDates[1])}`
    }
   
    return axios.get(`${API_URL}/search/?title=${encodeURI(title)}&notes=${notes}&shared-notes=${sharedNotes}&todo-lists=${lists}&shared-todo-lists=${sharedLists}${createDatesQuery}${updateDatesQuery}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}
