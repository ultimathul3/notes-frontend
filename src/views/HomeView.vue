<script>
import Accordion from '@/components/Accordion.vue'
import HomeModals from '@/components/HomeModals.vue'
import Note from '@/components/Note.vue'
import Todo from '@/components/Todo.vue'
import notebooksMixin from '@/mixins/notebooksMixin'
import notesMixin from '@/mixins/notesMixin'
import todoListsMixin from '@/mixins/todoListsMixin'
import todoItemsMixin from '@/mixins/todoItemsMixin'
import searchMixin from '@/mixins/searchMixin'

export default {
    components: {
        Accordion,
        HomeModals,
        Note,
        Todo,
    },

    mixins: [
        notebooksMixin,
        notesMixin,
        todoListsMixin,
        todoItemsMixin,
        searchMixin,
    ],

    data() {
        return {
            errors: [],
            modalInput: '',
            searchQuery: '',
            selectedNotebook: undefined,
            selectedNote: undefined,
            clickedNote: undefined,
            selectedTodoList: undefined,
            clickedTodoList: undefined,
            selectedTodoItem: undefined,
            searchMode: false,
            emptySearch: false,
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
            this.clickedTodoList = undefined
            this.selectedNotebook = notebook
            this.clickedNote = note
            window.scrollTo(0, 0)
        },

        updateSelectedTodoList(notebook, todoList) {
            this.selectedNotebook = notebook
            this.selectedTodoList = todoList
            this.modalInput = todoList.title
        },

        async clickTodoList(notebook, todoList) {
            this.clickedNote = undefined
            this.selectedNotebook = notebook
            this.clickedTodoList = todoList
            window.scrollTo(0, 0)
            await this.getTodoItems()
        },

        updateSelectedTodoItem(todoItem) {
            this.selectedTodoItem = todoItem
            this.modalInput = todoItem.body
        },

        searchInput(event) {
            if (this.searchQuery === '') {
                this.cancelSearch()
            }
        },

        async cancelSearch() {
            await this.getNotebooks()
            this.$refs.accordion.collapseAccordion()
            this.searchMode = false
            this.searchQuery = ''
        },
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
                        <input v-model="searchQuery" @input="searchInput"
                            class="form-control mb-2"
                            placeholder="Поиск...">
                    </div>
                    <div v-if="searchMode" class="col-auto ps-0">
                        <button class="btn btn-danger" @click="cancelSearch">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <div class="col-auto ps-0">
                        <button class="btn btn-success" @click="searchByTitle">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                
                <accordion ref="accordion"
                    :notebooks="notebooks"
                    :clickedNote="clickedNote"
                    :clickedTodoList="clickedTodoList"
                    :searchMode="searchMode"
                    :emptySearch="emptySearch"
                    @updateSelectedNotebook="updateSelectedNotebook"
                    @updateSelectedNote="updateSelectedNote"
                    @clickNote="clickNote"
                    @updateSelectedTodoList="updateSelectedTodoList"
                    @clickTodoList="clickTodoList"/>

                <div class="row justify-content-center mt-2" v-if="!searchMode">
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
            
            <div v-if="clickedTodoList !== undefined" class="col">
                <todo
                    @updateTodoItemDone="updateTodoItemDone"
                    @deleteTodoItem="deleteTodoItem"
                    @updateSelectedTodoItem="updateSelectedTodoItem"
                    @updateTodoItemBody="updateTodoItemBody"
                    :clickedTodoList="clickedTodoList"
                    v-model="modalInput"/>
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
        @deleteTodoList="deleteTodoList"
        @createTodoItem="createTodoItem"
        @updateTodoItemBody="updateTodoItemBody"/>
</template>
