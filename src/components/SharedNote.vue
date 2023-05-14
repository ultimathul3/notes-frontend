<script>
import dateFormat from 'dateformat'

export default {
    props: {
        clickedSharedNote: Object,
    },

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yyyy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <textarea v-model="clickedSharedNote.body" class="form-control" rows="10"></textarea>
    <br>
    <i class="bi bi-person"></i> <b>{{ clickedSharedNote.owner_name }}</b> <i>({{ clickedSharedNote.owner_login }})</i><br>
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedSharedNote.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedSharedNote.updated_at) }}
    </div>
</template>
