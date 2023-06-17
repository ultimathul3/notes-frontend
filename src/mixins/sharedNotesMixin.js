import tokensMixin from '@/mixins/tokensMixin'
import { createSharedNote, getAllSharedNotesInfo, deleteSharedNote, acceptSharedNote, getSharedNoteData, getOutgoingSharedNotes } from '../../api/sharedNotes.js'

export default {
    mixins: [
        tokensMixin,
    ],

    data() {
        return {
            incomingSharedNotes: [],
            outgoingSharedNotes: [],
            sharedNotes: [],
        }
    },

    methods: {
        async createSharedNote() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await createSharedNote(this.getAccessToken(), this.modalInput, this.clickedNote.id)
            } catch(error) {
                if (error.response.data.message.includes('user not found')) {
                    this.errors = ['Пользователь не найден']
                } else if (error.response.data.message.includes('impossible to share')) {
                    this.errors = ['Невозможно поделиться заметкой с самим собой']
                } else if (error.response.data.message.includes('already been shared')) {
                    this.errors = ['Вы уже поделились заметкой с этим пользователем']
                }
                console.log(this.errors)
                return
            }

            document.getElementById('shareNoteModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async getAllSharedNotesInfo() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            let response
            try {
                response = await getAllSharedNotesInfo(this.getAccessToken())
            } catch(error) {
                return
            }

            this.sharedNotes = []
            this.incomingSharedNotes = []
            if (response.data.shared_notes !== undefined) {
                for (const note of response.data.shared_notes) {
                    if (note.accepted) {
                        this.sharedNotes.push(note)
                    } else {
                        this.incomingSharedNotes.push(note)
                    }
                }
                this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
            }
        },

        async deleteSharedNote(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await deleteSharedNote(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            this.incomingSharedNotes = this.incomingSharedNotes.filter(n => n.id !== id)
            this.outgoingSharedNotes = this.outgoingSharedNotes.filter(n => n.id !== id)
            this.sharedNotes = this.sharedNotes.filter(n => n.id !== id)
            if (this.clickedSharedNote?.id == id) {
                this.clickedSharedNote = undefined
            }
            this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
            document.getElementById('deleteSharedNoteModal-close-btn').click()
        },

        async acceptSharedNote(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await acceptSharedNote(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            this.sharedNotes.push(this.incomingSharedNotes.find(n => n.id === id))
            this.incomingSharedNotes = this.incomingSharedNotes.filter(n => n.id !== id)
            this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
        },

        async getSharedNoteData() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getSharedNoteData(this.getAccessToken(), this.clickedSharedNote.id)
            } catch(error) {
                return
            }

            this.clickedSharedNote.body = response.data.body
            this.clickedSharedNote.created_at = response.data.created_at
            this.clickedSharedNote.updated_at = response.data.updated_at
        },

        async getOutgoingSharedNotes(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getOutgoingSharedNotes(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            if (response.data.shared_notes !== undefined) {
                this.outgoingSharedNotes = response.data.shared_notes
            } else {
                this.outgoingSharedNotes = []
            }
        },
    }
}