<script>
import Accordion from '@/components/Accordion.vue'
import Modal from '@/components/Modal.vue'
import storageMixin from '@/mixins/storageMixin'
import tokensMixin from '@/mixins/tokensMixin'
import { getNotebooks, createNotebook } from '../../api/notebooks.js'
import { getNotes } from '../../api/notes.js'

export default {
    components: {
        Accordion,
        Modal
    },

    mixins: [
        storageMixin,
        tokensMixin,
    ],

    data() {
        return {
            notebooks: [],
            errors: [],
            inputInvalid: false,
            modalInput: '',
        }
    },

    methods: {
        async getNotebooks() {
            if (await !this.refreshTokens()) {
                return
            }        
            let response
            try {
                response = await getNotebooks(this.getAccessToken())
            } catch(error) {
                return
            }
            this.notebooks = response.data.notebooks
            if (this.notebooks === undefined) this.notebooks = []
            for (let i = 0; i < this.notebooks.length; i++) {
                try {
                    response = await getNotes(this.getAccessToken(), this.notebooks[i].id)
                } catch(error) {
                    return
                }
                this.notebooks[i].notes = response.data.notes
                if (this.notebooks[i].notes === undefined) this.notebooks[i].notes = []
            }
        },

        async createNotebook() {
            if (await !this.refreshTokens()) {
                return
            }        
            let response
            try {
                response = await createNotebook(this.getAccessToken(), this.modalInput)
            } catch(error) {
                this.errors = ['Название блокнота должно быть от 1 до 64 символов']
                return
            }
            this.notebooks.push({
                description: this.modalInput
            })
            document.getElementById('modal-close-btn').click()
            this.modalInput = ''
        }
    },

    mounted() {
        this.getNotebooks()
    }
}
</script>

<template>
    <modal
        @btnPressed="createNotebook"
        :id="'createNotebokModal'"
        :title="'Создание блокнота'"
        :buttonText="'Создать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input
            v-model="modalInput"
            @input="inputInvalid = false"
            :class="{'is-invalid': inputInvalid}"
            type="text" 
            class="form-control" 
            placeholder="Название блокнота">
        <div class="invalid-feedback">
            Введите TODO
        </div>
    </modal>

    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
                <input class="form-control" placeholder="Поиск...">
                <accordion 
                    :notebooks="notebooks"
                    class="mt-1"/>
                <div class="row justify-content-center mt-1">
                    <button type="button" class="btn btn-success"
                        style="width: 10em;" data-bs-toggle="modal"
                        data-bs-target="#createNotebokModal">
                        Создать блокнот
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
