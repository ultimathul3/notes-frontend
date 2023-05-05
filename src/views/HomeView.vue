<script>
import Accordion from '@/components/Accordion.vue'
import Modal from '@/components/Modal.vue'
import HomeModals from '@/components/HomeModals.vue'
import Note from '@/components/Note.vue'
import tokensMixin from '@/mixins/tokensMixin'
import notebooksMixin from '@/mixins/notebooksMixin'
import notesMixin from '@/mixins/notesMixin'
import todoListsMixin from '@/mixins/todoListsMixin'

export default {
    components: {
        Accordion,
        HomeModals,
        Modal,
        Note,
    },

    mixins: [
        tokensMixin,
        notebooksMixin,
        notesMixin,
        todoListsMixin,
    ],

    data() {
        return {
            errors: [],
            modalInput: '',
            selectedNotebook: undefined,
            selectedNote: undefined,
            clickedNote: undefined,
            selectedTodoList: undefined,
            clickedTodoList: undefined,
        }
    },

    methods: {
        updateSelectedNotebook(notebook, forCreate) {
            this.selectedNotebook = notebook
            if (!forCreate) {
                this.modalInput = notebook.description
            } else {
                this.modalInput = ''
            }
        },

        updateSelectedNote(notebook, note) {
            this.selectedNotebook = notebook
            this.selectedNote = note
            this.modalInput = note.title
        },

        clickNote(notebook, note) {
            this.selectedNotebook = notebook
            this.clickedNote = note
            window.scrollTo(0, 0)
        },

        updateSelectedTodoList(notebook, todoList) {
            this.selectedNotebook = notebook
            this.selectedTodoList = todoList
            this.modalInput = todoList.title
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
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
                <div class="row">
                    <div class="col">
                        <input @input="searchInput"
                            class="form-control mb-2"
                            placeholder="Поиск...">
                    </div>
                    <div class="col-auto ps-0">
                        <button class="btn btn-success">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                
                <accordion ref="accordion"
                    :notebooks="notebooks"
                    :clickedNote="clickedNote"
                    :clickedTodoList="clickedTodoList"
                    @updateSelectedNotebook="updateSelectedNotebook"
                    @updateSelectedNote="updateSelectedNote"
                    @clickNote="clickNote"
                    @updateSelectedTodoList="updateSelectedTodoList"
                    @clickTodoList="clickTodoList"/>

                <div class="row justify-content-center mt-2">
                    <button @click="modalInput=''" type="button" class="btn btn-success"
                        style="width: 10em;" data-bs-toggle="modal"
                        data-bs-target="#createNotebookModal">
                        Создать блокнот
                    </button>
                </div>
            </div>
            
            <div v-if="clickedNote !== undefined" class="col">
                <note 
                    @updateNoteBody="updateNoteBody"
                    :clickedNote="clickedNote"/>
            </div>
        </div>
    </div>

    <home-modals
        v-model="modalInput"
        :errors="errors"
        @deleteNotebook="deleteNotebook"
        @createNotebook="createNotebook"
        @updateNotebook="updateNotebook"
        @updateNoteTitle="updateNoteTitle"
        @createNote="createNote"
        @deleteNote="deleteNote"
        @createTodoList="createTodoList"
        @updateTodoList="updateTodoList"
        @deleteTodoList="deleteTodoList"/>
</template>
