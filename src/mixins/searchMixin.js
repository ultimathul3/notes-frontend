import tokensMixin from '@/mixins/tokensMixin'
import { searchByTitle, advancedSearch } from '../../api/search.js'
import { getNotebooks } from '../../api/notebooks.js'

export default {
    mixins: [
        tokensMixin,
    ],

    methods: {
        searchResponseToNotebooks(response, searchNotebooks) {
            if (response.data.notes !== undefined) {
                for (const note of response.data.notes) {
                    searchNotebooks[note.notebook_id].notes.push(note)
                }
            }

            if (response.data.todo_lists !== undefined) {
                for (const todoList of response.data.todo_lists) {
                    searchNotebooks[todoList.notebook_id].todo_lists.push(todoList)
                }
            }

            this.notebooks = []
            for (const [key, value] of Object.entries(searchNotebooks)) {
                this.notebooks.push({
                    id: Number(key),
                    description: value.description,
                    notes: value.notes,
                    todo_lists: value.todo_lists,
                })
            }

            this.sharedNotes = []
            if (response.data.shared_notes !== undefined) {
                this.sharedNotes = response.data.shared_notes
            }

            this.sharedTodoLists = []
            if (response.data.shared_todo_lists !== undefined) {
                this.sharedTodoLists = response.data.shared_todo_lists
            }

            this.emptySearch = true
            for (const notebook of this.notebooks) {
                if (notebook.notes.length != 0 || notebook.todo_lists.length != 0 || this.sharedNotes.length != 0 || this.sharedTodoLists.length != 0) {
                    this.emptySearch = false
                    break
                }
            }
        },

        async searchByTitle() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getNotebooks(this.getAccessToken())
            } catch(error) {
                return
            }

            this.searchMode = true
            
            if (response.data.notebooks === undefined) {
                this.notebooks = []
                return
            }

            let searchNotebooks = {}
            for (const notebook of response.data.notebooks) {
                searchNotebooks[notebook.id] = { 
                    description: notebook.description,
                    notes: [], 
                    todo_lists: []
                }
            }

            try {
                response = await searchByTitle(this.getAccessToken(), this.searchQuery)
            } catch(error) {
                return
            }

            this.searchResponseToNotebooks(response, searchNotebooks)

            this.$refs.accordion.expandAccordion()
        },

        async advancedSearch(notes, sharedNotes, lists, sharedLists, createDates, updateDates) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getNotebooks(this.getAccessToken())
            } catch(error) {
                return
            }

            this.searchMode = true
            
            if (response.data.notebooks === undefined) {
                this.notebooks = []
                return
            }

            let searchNotebooks = {}
            for (const notebook of response.data.notebooks) {
                searchNotebooks[notebook.id] = { 
                    description: notebook.description,
                    notes: [], 
                    todo_lists: []
                }
            }

            try {
                response = await advancedSearch(this.getAccessToken(), this.modalInput, notes, sharedNotes, lists, sharedLists, createDates, updateDates)
            } catch(error) {
                return
            }

            this.searchResponseToNotebooks(response, searchNotebooks)

            document.getElementById('searchModal-close-btn').click()
            this.$refs.accordion.expandAccordion()
        },
    }
}