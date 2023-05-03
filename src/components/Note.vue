<script>
import dateFormat from 'dateformat'

export default {
    props: {
        clickedNote: Object,
    },

    emits: [
        'updateNoteBody',
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