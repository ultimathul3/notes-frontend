import tokensMixin from '@/mixins/tokensMixin'
import { getTodoItems, createTodoItem, updateTodoItemDone, deleteTodoItem, updateTodoItemBody } from '../../api/todoItems.js'

export default {
    mixins: [
        tokensMixin,
    ],

    methods: {
        async getTodoItems() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            let response
            try {
                response = await getTodoItems(this.getAccessToken(), this.selectedNotebook.id, this.clickedTodoList.id)
            } catch(error) {
                return
            }
            
            this.clickedTodoList.items = response.data.todo_items
            if (this.clickedTodoList.items === undefined) {
                this.clickedTodoList.items = []
            }
        },

        async createTodoItem() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            let response
            try {
                response = await createTodoItem(this.getAccessToken(), this.selectedNotebook.id, this.clickedTodoList.id, this.modalInput)
            } catch(error) {
                this.errors = ['Содержимое элемента списка должно быть от 1 до 128 символов']
                return
            }

            this.clickedTodoList.updated_at = new Date()
            this.clickedTodoList.items.push({
                id: response.data.id,
                body: this.modalInput,
                done: false,
            })

            document.getElementById('createTodoItemModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async updateTodoItemDone(itemID, done) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await updateTodoItemDone(this.getAccessToken(), this.selectedNotebook.id, this.clickedTodoList.id, itemID, done)
            } catch(error) {
                return
            }

            this.clickedTodoList.updated_at = new Date()
            this.clickedTodoList.items.find(i => i.id === itemID).done = done
        },

        async updateTodoItemBody() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await updateTodoItemBody(this.getAccessToken(), this.selectedNotebook.id, this.clickedTodoList.id, this.selectedTodoItem.id, this.modalInput)
            } catch(error) {
                this.errors = ['Содержимое элемента списка должно быть от 1 до 128 символов']
                return
            }

            this.clickedTodoList.updated_at = new Date()
            this.selectedTodoItem.body = this.modalInput

            document.getElementById('updateTodoItemBodyModal-close-btn').click()
            this.errors = []
            this.modalInput = ''
        },

        async deleteTodoItem(itemID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }      

            try {
                await deleteTodoItem(this.getAccessToken(), this.selectedNotebook.id, this.clickedTodoList.id, itemID)
            } catch(error) {
                return
            }
            
            this.clickedTodoList.updated_at = new Date()
            this.clickedTodoList.items = this.clickedTodoList.items.filter(i => i.id !== itemID)
        },
    }
}