import tokensMixin from '@/mixins/tokensMixin'
import { getNotebooks, createNotebook, deleteNotebook, updateNotebook } from '../../api/notebooks.js'
import { getNotes } from '../../api/notes.js'

export default {
    mixins: [
        tokensMixin,
    ],

    data() {
        return {
            notebooks: [],
        }
    },

    methods: {
        async getNotebooks() {
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
            
            this.notebooks = response.data.notebooks
            if (this.notebooks === undefined) {
                this.notebooks = []
                return
            }

            for (let i = 0; i < this.notebooks.length; i++) {
                try {
                    response = await getNotes(this.getAccessToken(), this.notebooks[i].id)
                } catch(error) {
                    return
                }
                
                this.notebooks[i].notes = response.data.notes
                if (this.notebooks[i].notes === undefined) {
                    this.notebooks[i].notes = []
                }
            }
        },

        async createNotebook() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await createNotebook(this.getAccessToken(), this.modalInput)
            } catch(error) {
                this.errors = ['Название блокнота должно быть от 1 до 64 символов']
                return
            }
            
            this.notebooks.push({
                id: response.data.id,
                description: this.modalInput,
                notes: [],
            })
            
            document.getElementById('createNotebookModal-close-btn').click()
            this.errors = []
        },

        async deleteNotebook() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await deleteNotebook(this.getAccessToken(), this.selectedNotebook.id)
            } catch(error) {
                return
            }

            if (this.selectedNotebook.notes.find(n => n.id === this.clickedNote?.id)) {
                this.clickedNote = undefined
            }
            this.notebooks = this.notebooks.filter(n => n.id !== this.selectedNotebook.id)
            this.selectedNotebook = undefined

            document.getElementById('deleteNotebookModal-close-btn').click()
        },
    
        async updateNotebook() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await updateNotebook(this.getAccessToken(), this.selectedNotebook.id, this.modalInput)
            } catch(error) {
                this.errors = ['Название блокнота должно быть от 1 до 64 символов']
                return
            }

            this.selectedNotebook.description = this.modalInput

            document.getElementById('updateNotebookModal-close-btn').click()
            this.errors = []
        },
    }
}