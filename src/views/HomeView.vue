<script>
import Accordion from '@/components/Accordion.vue'
import Modal from '@/components/Modal.vue'
import Note from '@/components/Note.vue'
import storageMixin from '@/mixins/storageMixin'
import tokensMixin from '@/mixins/tokensMixin'
import { getNotebooks, createNotebook, deleteNotebook, updateNotebook } from '../../api/notebooks.js'
import { getNotes, createNote, deleteNote, updateNoteTitle } from '../../api/notes.js'

export default {
    components: {
        Accordion,
        Modal,
        Note,
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
            selectedNoteID: 0,
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
            this.notebooks = this.notebooks.filter((n) => {return n.id !== notebookID})
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
            let notebook = this.notebooks.find(n => n.id === notebookID)
            notebook.description = this.modalInput
            document.getElementById('updateNotebookModal-close-btn').click()
        },

        async createNote(notebookID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await createNote(this.getAccessToken(), notebookID, this.modalInput, '')
            } catch(error) {
                this.errors = ['Название заметки должно быть от 1 до 64 символов']
                return
            }
            let notebook = this.notebooks.find(n => n.id === notebookID)
            if (notebook.notes === undefined) {
                notebook.notes = []
            }
            notebook.notes.push({
                id: response.data.id,
                title: this.modalInput
            })
            document.getElementById('createNoteModal-close-btn').click()
        },

        async updateNoteTitle(notebookID, noteID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await updateNoteTitle(this.getAccessToken(), notebookID, noteID, this.modalInput)
            } catch(error) {
                this.errors = ['Название заметки должно быть от 1 до 64 символов']
                return
            }
            
            let notebook = this.notebooks.find(n => n.id === notebookID)
            let note = notebook.notes.find(n => n.id === noteID)
            note.title = this.modalInput
            
            document.getElementById('updateNoteTitleModal-close-btn').click()
        },

        async deleteNote(notebookID, noteID) {
            let refreshed = await this.refreshTokens()
            if (!refreshed) {
                return
            }

            let response
            try {
                response = await deleteNote(this.getAccessToken(), notebookID, noteID)
            } catch(error) {
                return
            }
            let notebook = this.notebooks.find(n => n.id === notebookID)
            notebook.notes = notebook.notes.filter(n => n.id !== noteID)
            document.getElementById('deleteNoteModal-close-btn').click()
        },

        updateSelectedNotebookID(id, forCreate) {
            this.selectedNotebookID = id
            let notebook = this.notebooks.find(n => n.id === id)
            if (!forCreate) {
                this.modalInput = notebook.description
            } else {
                this.modalInput = ''
            }
        },

        updateSelectedNoteID(notebookID, noteID) {
            this.selectedNotebookID = notebookID
            this.selectedNoteID = noteID
            let notebook = this.notebooks.find(n => n.id === notebookID)
            let note = notebook.notes.find(n => n.id === noteID)
            this.modalInput = note.title
        },

        searchInput(event) {
            if (event.target.value === '') {
                this.getNotebooks()
            } else {
                let newNotebooks = []
                for (let notebook of this.notebooks) {
                    let newNotebook = notebook
                    newNotebook.notes = notebook?.notes.filter(n => 
                        n.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
                    )
                    if (newNotebook?.notes.length != 0) {
                        newNotebooks.push(newNotebook)
                    }
                }
                this.notebooks = newNotebooks
            }
            this.$refs.accordion.collapseAccordion()
        }
    },

    mounted() {
        document.title = 'Главная страница'
        this.getNotebooks()
    }
}
</script>

<template>
    <!-- notebooks modal windows -->

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

    <!-- notes modal windows -->

    <modal
        @btnPressed="updateNoteTitle(selectedNotebookID, selectedNoteID)"
        :id="'updateNoteTitleModal'"
        :title="'Редактирование заметки'"
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
            placeholder="Название заметки">
    </modal>

    <modal
        @btnPressed="createNote(selectedNotebookID)"
        :id="'createNoteModal'"
        :title="'Создать заметку'"
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
            placeholder="Название заметки">
    </modal>

    <modal
        @btnPressed="deleteNote(selectedNotebookID, selectedNoteID)"
        :id="'deleteNoteModal'"
        :title="'Удаление заметки'"
        :buttonText="'Удалить'">
        Заметка будет удалена. Вы хотите продолжить?
    </modal>

    <!-- menu -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
                <input @input="searchInput"
                    class="form-control mb-2"
                    placeholder="Поиск...">
                
                <accordion ref="accordion"
                    :notebooks="notebooks"
                    @updateSelectedNotebookID="updateSelectedNotebookID"
                    @updateSelectedNoteID="updateSelectedNoteID"/>

                <div class="row justify-content-center mt-2">
                    <button @click="modalInput=''" type="button" class="btn btn-success"
                        style="width: 10em;" data-bs-toggle="modal"
                        data-bs-target="#createNotebookModal">
                        Создать блокнот
                    </button>
                </div>
            </div>
            <div class="col">
                <note/>
            </div>
        </div>
    </div>
</template>
