import tokensMixin from '@/mixins/tokensMixin'
import { searchByTitle } from '../../api/search.js'
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

            this.emptySearch = true
            for (const notebook of this.notebooks) {
                if (notebook.notes.length != 0 || notebook.todo_lists.length != 0) {
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
        }
    }
}