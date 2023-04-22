<script>
import Accordion from '@/components/Accordion.vue'
import Modal from '@/components/Modal.vue'
import storageMixin from '@/mixins/storageMixin'
import tokensMixin from '@/mixins/tokensMixin'
import { getNotebooks, createNotebook, deleteNotebook, updateNotebook } from '../../api/notebooks.js'
import { getNotes } from '../../api/notes.js'

export default {
    components: {
        Accordion,
        Modal
    },

    mixins: [
        storageMixin,
        tokensMixin,
    ],

    data() {
        return {
            notebooks: [],
            errors: [],
            inputInvalid: false,
            modalInput: '',
            selectedNotebookID: 0,
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
            if (this.notebooks === undefined) this.notebooks = []
            for (let i = 0; i < this.notebooks.length; i++) {
                try {
                    response = await getNotes(this.getAccessToken(), this.notebooks[i].id)
                } catch(error) {
                    return
                }
                this.notebooks[i].notes = response.data.notes
                if (this.notebooks[i].notes === undefined) this.notebooks[i].notes = []
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
                description: this.modalInput
            })
            document.getElementById('createNotebookModal-close-btn').click()
            this.modalInput = ''
        },

        async deleteNotebook(notebookID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await deleteNotebook(this.getAccessToken(), notebookID)
            } catch(error) {
                return
            }
            this.notebooks = this.notebooks.filter((n) => {return n.id != notebookID})
            document.getElementById('deleteNotebookModal-close-btn').click()
        },
    
        async updateNotebook(notebookID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await updateNotebook(this.getAccessToken(), notebookID, this.modalInput)
            } catch(error) {
                this.errors = ['Название блокнота должно быть от 1 до 64 символов']
                return
            }
            let notebook = this.notebooks.find(n => n.id === this.selectedNotebookID)
            notebook.description = this.modalInput
            document.getElementById('updateNotebookModal-close-btn').click()
            this.modalInput = ''
        },
    },

    mounted() {
        document.title = 'Главная страница'
        this.getNotebooks()
    },

    watch: {
        selectedNotebookID() {
            let notebook = this.notebooks.find(n => n.id === this.selectedNotebookID)
            this.modalInput = notebook.description
        }
    }
}
</script>

<template>
    <modal
        @btnPressed="deleteNotebook(selectedNotebookID)"
        :id="'deleteNotebookModal'"
        :title="'Удаление блокнота'"
        :buttonText="'Удалить'">
        Содержимое блокнота также будет удалено. Вы хотите продолжить?
    </modal>

    <modal
        @btnPressed="createNotebook"
        :id="'createNotebookModal'"
        :title="'Создание блокнота'"
        :buttonText="'Создать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input
            v-model="modalInput"
            @input="inputInvalid = false"
            :class="{'is-invalid': inputInvalid}"
            type="text" 
            class="form-control" 
            placeholder="Название блокнота">
    </modal>

    <modal
        @btnPressed="updateNotebook(selectedNotebookID)"
        :id="'updateNotebookModal'"
        :title="'Редактирование блокнота'"
        :buttonText="'Редактировать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input
            v-model="modalInput"
            @input="inputInvalid = false"
            :class="{'is-invalid': inputInvalid}"
            type="text" 
            class="form-control" 
            placeholder="Название блокнота">
    </modal>

    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
                <input class="form-control mb-2" placeholder="Поиск...">
                <accordion 
                    :notebooks="notebooks"
                    v-model:selectedNotebookID="selectedNotebookID"
                    @deleteNotebook="deleteNotebook"/>

                <div class="row justify-content-center mt-2">
                    <button type="button" class="btn btn-success"
                        style="width: 10em;" data-bs-toggle="modal"
                        data-bs-target="#createNotebookModal">
                        Создать блокнот
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
