<script>
    export default {
        props: {
            title: String,
            buttonText: String,
            id: String
        },
        emits: [
            'btnPressed'
        ]
    }
</script>

<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button :id="`${id}-close-btn`" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button v-if="buttonText !== undefined" @click="$emit('btnPressed')" type="button" class="btn btn-primary">{{ buttonText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
