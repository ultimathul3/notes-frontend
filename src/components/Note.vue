<script>
import dateFormat from 'dateformat'

export default {
    props: {
        clickedNote: Object,
    },

    emits: [
        'updateNoteBody',
        'getOutgoingSharedNotes',
    ],

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yyyy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <textarea v-model="clickedNote.body" class="form-control" rows="10"></textarea>
    <button type="button" class="btn btn-primary mt-2"
        data-bs-toggle="modal"
        data-bs-target="#shareNoteModal">
        Поделиться
    </button>
    &nbsp;
    <button type="button" class="btn btn-info mt-2"
        @click="$emit('getOutgoingSharedNotes', clickedNote.id)"
        data-bs-toggle="modal"
        data-bs-target="#outgoingNotesModal">
        <i class="bi bi-person"></i>
    </button>
    <br>
    <button @click="$emit('updateNoteBody')" type="button" class="btn btn-success mt-2">
        Сохранить
    </button>
    <br>
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedNote.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedNote.updated_at) }}
    </div>
</template>