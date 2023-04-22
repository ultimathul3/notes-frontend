<script>
import Modal from '@/components/Modal.vue'

export default {
    props: {
        notebooks: Array,
        selectedNotebookID: Number
    },

    components: {
        Modal
    }
}
</script>

<template>
    <div class="accordion">
        <div v-for="notebook in notebooks" :key="notebook.id" class="accordion-item">
            
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#collapse'+notebook.id">
                    {{ notebook.description }}
                </button>
            </h2>
            
            <div :id="'collapse'+notebook.id" class="accordion-collapse collapse">
                <ul v-for="note in notebook.notes" :key="note.id" class="list-group m-2">
                    <li class="list-group-item list-group-item-action" style="text-align:left;">
                        {{ note.title }} <span style="float:right;"><i class="bi bi-pencil pointer"></i> <i class="bi bi-x-circle pointer"></i></span>
                    </li>
                </ul>

                <div v-if="notebook.notes?.length === 0 || notebook.notes === undefined" class="space mt-2"></div>

                <div class="container mb-2">
                    <div class="row justify-content-center">
                        <div class="col">
                            <button type="button" class="btn btn-success">
                                Заметка
                            </button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary">
                                Список
                            </button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-info">
                                <i class="bi bi-pencil pointer"></i>
                            </button>
                        </div>
                        <div class="col">
                            <button @click="$emit('update:selectedNotebookID', notebook.id)" type="button" class="btn btn-danger"
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