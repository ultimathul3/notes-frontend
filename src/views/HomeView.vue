<script>
import Accordion from '@/components/Accordion.vue'
import storageMixin from '@/mixins/storageMixin'
import tokensMixin from '@/mixins/tokensMixin'
import { getNotebooks } from '../../api/notebooks.js'
import { getNotes } from '../../api/notes.js'

export default {
    components: {
        Accordion
    },

    mixins: [
        storageMixin,
        tokensMixin,
    ],

    data() {
        return {
            notebooks: [],
        }
    },

    methods: {
        async getNotebooks() {
            if (await !this.refreshTokens()) {
                this.$router.push({ name: 'sign-in' })
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
                if (this.notebooks[i].notes === undefined) this.notebooks = []
            }
        }
    },

    mounted() {
        this.getNotebooks()
    }
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
                <input class="form-control" placeholder="Поиск...">
                <accordion 
                    :notebooks="notebooks"
                    class="mt-1"/>

            </div>
            <div class="col text-end">dsa</div>
        </div>
    </div>
</template>
