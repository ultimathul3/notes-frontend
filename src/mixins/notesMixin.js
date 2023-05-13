import tokensMixin from '@/mixins/tokensMixin'
import { getNote, createNote, deleteNote, updateNoteTitle, updateNoteBody } from '../../api/notes.js'

export default {
    mixins: [
        tokensMixin,
    ],

    methods: {
        async createNote() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await createNote(this.getAccessToken(), this.selectedNotebook.id, this.modalInput, '')
            } catch(error) {
                this.errors = ['Название заметки должно быть от 1 до 64 символов']
                return
            }
            
            this.selectedNotebook.notes.push({
                id: response.data.id,
                title: this.modalInput,
                body: '',
                created_at: new Date(),
                updated_at: new Date(),
            })
            
            document.getElementById('createNoteModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async updateNoteTitle() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await updateNoteTitle(this.getAccessToken(), this.selectedNotebook.id, this.selectedNote.id, this.modalInput)
            } catch(error) {
                this.errors = ['Название заметки должно быть от 1 до 64 символов']
                return
            }
            
            this.selectedNote.title = this.modalInput
            
            document.getElementById('updateNoteTitleModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async deleteNote() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await deleteNote(this.getAccessToken(), this.selectedNotebook.id, this.selectedNote.id)
            } catch(error) {
                return
            }
            
            this.selectedNotebook.notes = this.selectedNotebook.notes.filter(n => n.id !== this.selectedNote.id)
            if (this.selectedNote.id === this.clickedNote?.id) {
                this.clickedNote = undefined
            }
            this.selectedNote = undefined
            
            document.getElementById('deleteNoteModal-close-btn').click()
        },

        async updateNoteBody() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await updateNoteBody(this.getAccessToken(), this.selectedNotebook.id, this.clickedNote.id, this.clickedNote.body)
            } catch(error) {
                return
            }

            let response
            try {
                response = await getNote(this.getAccessToken(), this.selectedNotebook.id, this.clickedNote.id)
            } catch(error) {
                return
            }

            this.clickedNote.updated_at = response.data.updated_at
            this.clickedNote.body = response.data.body
        },
    }
}