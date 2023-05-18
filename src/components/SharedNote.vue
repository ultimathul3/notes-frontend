<script>
import dateFormat from 'dateformat'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: {
        QuillEditor,
    },

    props: {
        clickedSharedNote: Object,
    },

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <QuillEditor :readOnly="true" :toolbar="['bold', 'italic', 'underline', 'blockquote', 'image', 'link', 'code-block']" v-model:content="clickedSharedNote.body" :contentType="'html'"/>
    <br>
    <i class="bi bi-person"></i> <b>{{ clickedSharedNote.owner_name }}</b> <i>({{ clickedSharedNote.owner_login }})</i><br>
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedSharedNote.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedSharedNote.updated_at) }}
    </div>
</template>
