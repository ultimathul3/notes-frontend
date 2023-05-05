import tokensMixin from '@/mixins/tokensMixin'
import { createTodoList, updateTodoList, deleteTodoList } from '../../api/todoLists.js'

export default {
    mixins: [
        tokensMixin,
    ],

    methods: {
        async createTodoList() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await createTodoList(this.getAccessToken(), this.selectedNotebook.id, this.modalInput)
            } catch(error) {
                this.errors = ['Название списка должно быть от 1 до 64 символов']
                return
            }
            
            this.selectedNotebook.todo_lists.push({
                id: response.data.id,
                title: this.modalInput,
                created_at: new Date(),
                updated_at: new Date(),
            })
            
            document.getElementById('createTodoListModal-close-btn').click()
            this.errors = []
        },


        async updateTodoList() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await updateTodoList(this.getAccessToken(), this.selectedNotebook.id, this.selectedTodoList.id, this.modalInput)
            } catch(error) {
                this.errors = ['Название списка должно быть от 1 до 64 символов']
                return
            }
            
            this.selectedTodoList.title = this.modalInput
            
            document.getElementById('updateTodoListModal-close-btn').click()
            this.errors = []
        },

        async deleteTodoList() {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            try {
                await deleteTodoList(this.getAccessToken(), this.selectedNotebook.id, this.selectedTodoList.id)
            } catch(error) {
                return
            }
            
            this.selectedNotebook.todo_lists = this.selectedNotebook.todo_lists.filter(
                l => l.id !== this.selectedTodoList.id
            )
            if (this.selectedTodoList.id === this.clickedTodoList?.id) {
                this.clickedTodoList = undefined
            }
            this.selectedTodoList = undefined
            
            document.getElementById('deleteTodoListModal-close-btn').click()
        },
    }
}