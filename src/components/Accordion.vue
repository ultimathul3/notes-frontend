<script>
export default {
    props: {
        notebooks: Array
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
                    <li class="list-group-item list-group-item-action">
                        {{ note.title }}&emsp;<i class="bi bi-pencil text-end"></i> <i class="bi bi-x-circle">    
                    </i></li>
                </ul>
            </div>

        </div>
    </div>
</template>