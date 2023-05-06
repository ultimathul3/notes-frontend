<script>
import Modal from '@/components/Modal.vue'

export default {
    props: {
        notebooks: Array,
        clickedNote: Object,
        clickedTodoList: Object,
    },

    emits: [
        'updateSelectedNotebook',
        'updateSelectedNote',
        'clickNote',
        'updateSelectedTodoList',
        'clickTodoList',
    ],

    components: {
        Modal
    },

    methods: {
        collapseAccordion() {
            var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
            collapseElementList.map((element) => {
                if (!element.classList.contains('show')) {
                    new bootstrap.Collapse(element)
                }
            })
        }
    }
}
</script>

<template>
    <div class="accordion">
        <div v-for="notebook in notebooks" :key="notebook.id" class="accordion-item">
            
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#collapse'+notebook.id">
                    {{ notebook.description }}
                </button>
            </h2>
            
            <div :id="`collapse${notebook.id}`" class="accordion-collapse collapse">
                <ul v-for="note in notebook.notes" :key="note.id" class="list-group m-2 pointer">
                    <li @click="$emit('clickNote', notebook, note)"
                        class="list-group-item list-group-item-action list-note"
                        :class="{'active': note.id === clickedNote?.id}"
                        style="text-align:left;">
                        {{ note.title }}
                        <span style="float:right;">
                            <i @click.stop="$emit('updateSelectedNote', notebook, note)"
                                class="bi bi-pencil"
                                data-bs-toggle="modal"
                                data-bs-target="#updateNoteTitleModal">
                            </i>&nbsp;
                            <i @click.stop="$emit('updateSelectedNote', notebook, note)"
                                class="bi bi-x-circle"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteNoteModal">
                            </i>
                        </span>
                    </li>
                </ul>

                <ul v-for="todoList in notebook.todo_lists" :key="todoList.id" class="list-group m-2 pointer">
                    <li @click="$emit('clickTodoList', notebook, todoList)"
                        class="list-group-item list-group-item-action list-todo"
                        :class="{'active': todoList.id === clickedTodoList?.id}"
                        style="text-align:left;">
                        {{ todoList.title }}
                        <span style="float:right;">
                            <i @click.stop="$emit('updateSelectedTodoList', notebook, todoList)"
                                class="bi bi-pencil"
                                data-bs-toggle="modal"
                                data-bs-target="#updateTodoListModal">
                            </i>&nbsp;
                            <i @click.stop="$emit('updateSelectedTodoList', notebook, todoList)"
                                class="bi bi-x-circle"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteTodoListModal">
                            </i>
                        </span>
                    </li>
                </ul>

                <div v-if="notebook.notes === undefined || notebook.notes.length === 0" class="mt-2"></div>

                <div class="container mb-2">
                    <div class="row justify-content-md-center">
                        <div class="col-auto">
                            <button @click="$emit('updateSelectedNotebook', notebook, true)" type="button" class="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#createNoteModal">
                                Заметка
                            </button>
                        </div>
                        <div class="col-auto">
                            <button @click="$emit('updateSelectedNotebook', notebook, true)" type="button" class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#createTodoListModal">
                                Список
                            </button>
                        </div>
                        <div class="col-auto">
                            <button @click="$emit('updateSelectedNotebook', notebook, false)" type="button" class="btn btn-info"
                                data-bs-toggle="modal"
                                data-bs-target="#updateNotebookModal">
                                <i class="bi bi-pencil pointer"></i>
                            </button>
                        </div>
                        <div class="col-auto">
                            <button @click="$emit('updateSelectedNotebook', notebook, false)" type="button" class="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteNotebookModal">
                                <i class="bi bi-x-circle pointer"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.list-note {
  border: var(--bs-list-group-border-width) solid #13653f;
}
.list-todo {
  border: var(--bs-list-group-border-width) solid #0d6efd;
}
.list-group-item.active {
    background-color: #acacac;
}
</style>