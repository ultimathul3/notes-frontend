import tokensMixin from '@/mixins/tokensMixin'
import { createSharedNote, getAllSharedNotesInfo, deleteSharedNote, acceptSharedNote } from '../../api/sharedNotes.js'

export default {
    mixins: [
        tokensMixin,
    ],

    data() {
        return {
            incomingSharedNotes: [],
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
                } else if (error.response.data.message.includes('already shared')) {
                    this.errors = ['Вы уже поделились заметкой с этим пользователем']
                }
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
                this.$emit('updateNotificationsCount', this.incomingSharedNotes.length)
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
            this.$emit('updateNotificationsCount', this.notificationsCount-1)
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
            this.$emit('updateNotificationsCount', this.notificationsCount-1)
        },
    }
}