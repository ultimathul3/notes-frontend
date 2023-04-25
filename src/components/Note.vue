<script>
import dateFormat from 'dateformat'

export default {
    props: {
        selectedNote: Object,
        selectedNoteBody: '',
    },

    emits: [
        'saveNote',
    ],

    data() {
        return {
            noteBody: '',
        }
    },

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yyyy, HH:MM:ss')
        }
    },

    watch: {
        selectedNoteBody() {
            this.noteBody = this.selectedNoteBody
        }
    },

    mounted() {
        this.noteBody = this.selectedNoteBody
    }
}
</script>

<template>
    <textarea v-model="noteBody" class="form-control" rows="10"></textarea>
    <button @click="$emit('saveNote', noteBody)" type="button" class="btn btn-success mt-2">
        Сохранить
    </button>
    <br>
    <div class="mt-4">
        Создано: {{ formatDatetime(selectedNote.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(selectedNote.updated_at) }}
    </div>
</template>