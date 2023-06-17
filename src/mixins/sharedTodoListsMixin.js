import tokensMixin from '@/mixins/tokensMixin'
import { createSharedTodoList, getAllSharedTodoListsInfo, deleteSharedTodoList, acceptSharedTodoList, getSharedTodoListData, getOutgoingSharedTodoLists } from '../../api/sharedTodoLists.js'

export default {
    mixins: [
        tokensMixin,
    ],

    data() {
        return {
            incomingSharedTodoLists: [],
            outgoingSharedTodoLists: [],
            sharedTodoLists: [],
        }
    },

    methods: {
        async createSharedTodoList() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await createSharedTodoList(this.getAccessToken(), this.modalInput, this.clickedTodoList.id)
            } catch(error) {
                if (error.response.data.message.includes('user not found')) {
                    this.errors = ['Пользователь не найден']
                } else if (error.response.data.message.includes('impossible to share')) {
                    this.errors = ['Невозможно поделиться списком с самим собой']
                } else if (error.response.data.message.includes('already been shared')) {
                    this.errors = ['Вы уже поделились списком с этим пользователем']
                }
                return
            }

            document.getElementById('shareTodoListModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async getAllSharedTodoListsInfo() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            let response
            try {
                response = await getAllSharedTodoListsInfo(this.getAccessToken())
            } catch(error) {
                return
            }

            this.sharedTodoLists = []
            this.incomingSharedTodoLists = []
            if (response.data.shared_todo_lists !== undefined) {
                for (const list of response.data.shared_todo_lists) {
                    if (list.accepted) {
                        this.sharedTodoLists.push(list)
                    } else {
                        this.incomingSharedTodoLists.push(list)
                    }
                }
                this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
            }
        },

        async deleteSharedTodoList(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await deleteSharedTodoList(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            this.incomingSharedTodoLists = this.incomingSharedTodoLists.filter(n => n.id !== id)
            this.outgoingSharedTodoLists = this.outgoingSharedTodoLists.filter(n => n.id !== id)
            this.sharedTodoLists = this.sharedTodoLists.filter(n => n.id !== id)
            if (this.clickedSharedTodoList?.id == id) {
                this.clickedSharedTodoList = undefined
            }
            this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
            document.getElementById('deleteSharedTodoListModal-close-btn').click()
        },

        async acceptSharedTodoList(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await acceptSharedTodoList(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            this.sharedTodoLists.push(this.incomingSharedTodoLists.find(n => n.id === id))
            this.incomingSharedTodoLists = this.incomingSharedTodoLists.filter(n => n.id !== id)
            this.$emit('updateNotificationsCount', this.incomingSharedTodoLists.length + this.incomingSharedNotes.length)
        },

        async getSharedTodoListData() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getSharedTodoListData(this.getAccessToken(), this.clickedSharedTodoList.id)
            } catch(error) {
                return
            }

            this.clickedSharedTodoList.items = []
            if (response.data.items !== undefined) {
                this.clickedSharedTodoList.items = response.data.items
            }
            this.clickedSharedTodoList.created_at = response.data.created_at
            this.clickedSharedTodoList.updated_at = response.data.updated_at
        },

        async getOutgoingSharedTodoLists(id) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await getOutgoingSharedTodoLists(this.getAccessToken(), id)
            } catch(error) {
                return
            }

            if (response.data.shared_todo_lists !== undefined) {
                this.outgoingSharedTodoLists = response.data.shared_todo_lists
            } else {
                this.outgoingSharedNotes = []
            }
        },
    }
}