import tokensMixin from '@/mixins/tokensMixin'
import { createSharedNote, getIncomingSharedNote, deleteSharedNote } from '../../api/sharedNotes.js'

export default {
    mixins: [
        tokensMixin,
    ],

    data() {
        return {
            incomingSharedNotes: [],
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

        async getIncomingSharedNote() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            let response
            try {
                response = await getIncomingSharedNote(this.getAccessToken())
            } catch(error) {
                return
            }

            if (response.data.incoming_shared_notes !== undefined) {
                this.incomingSharedNotes = response.data.incoming_shared_notes
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
                console.log(error)
                return
            }

            this.incomingSharedNotes = this.incomingSharedNotes.filter(n => n.id !== id)
            this.$emit('updateNotificationsCount', this.notificationsCount-1)
        },
    }
}