<script>
import dateFormat from 'dateformat'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: {
        QuillEditor,
    },

    props: {
        clickedNote: Object,
    },

    emits: [
        'updateNoteBody',
        'getOutgoingSharedNotes',
    ],

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <QuillEditor :toolbar="['bold', 'italic', 'underline', 'strike', 'blockquote', 'image', 'link', 'code-block']" v-model:content="clickedNote.body" :contentType="'html'"/>
    <button @click="$emit('updateNoteBody')" type="button" class="btn btn-success mt-2">
        Сохранить
    </button>
    &nbsp;
    <button type="button" class="btn btn-primary mt-2"
        data-bs-toggle="modal"
        data-bs-target="#shareNoteModal">
        <i class="bi bi-share-fill"></i>
    </button>
    &nbsp;
    <button type="button" class="btn btn-info mt-2"
        @click="$emit('getOutgoingSharedNotes', clickedNote.id)"
        data-bs-toggle="modal"
        data-bs-target="#outgoingNotesModal">
        <i class="bi bi-person"></i>
    </button>
    <br>
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedNote.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedNote.updated_at) }}
    </div>
</template>

<style>
.ql-container {
    font-size: 18px;
}
.ql-snow .ql-tooltip {
    z-index: 999;
}
</style>