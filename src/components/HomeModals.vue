<script>
import Modal from '@/components/Modal.vue'

export default {
    name: 'home-modals',

    components: {
        Modal,
    },

    props: [
        'modelValue',
        'errors',
    ],

    emits: [
        'update:modelValue',
        'deleteNotebook',
        'createNotebook',
        'updateNotebook',
        'updateNotebook',
        'updateNoteTitle',
        'createNote',
        'deleteNote',
        'createTodoList',
        'updateTodoList',
        'deleteTodoList',
        'createTodoItem',
        'updateTodoItemBody',
    ]
}
</script>

<template>
    <modal
        @btnPressed="$emit('deleteNotebook')"
        :id="'deleteNotebookModal'"
        :title="'Удаление блокнота'"
        :buttonText="'Удалить'">
        Содержимое блокнота также будет удалено. Вы хотите продолжить?
    </modal>

    <modal
        @btnPressed="$emit('createNotebook')"
        :id="'createNotebookModal'"
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
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Название блокнота">
    </modal>

    <modal
        @btnPressed="$emit('updateNotebook')"
        :id="'updateNotebookModal'"
        :title="'Редактирование блокнота'"
        :buttonText="'Редактировать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control" 
            placeholder="Название блокнота">
    </modal>

    <modal
        @btnPressed="$emit('updateNoteTitle')"
        :id="'updateNoteTitleModal'"
        :title="'Редактирование заметки'"
        :buttonText="'Редактировать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Название заметки">
    </modal>

    <modal
        @btnPressed="$emit('createNote')"
        :id="'createNoteModal'"
        :title="'Создать заметку'"
        :buttonText="'Создать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Название заметки">
    </modal>

    <modal
        @btnPressed="$emit('deleteNote')"
        :id="'deleteNoteModal'"
        :title="'Удаление заметки'"
        :buttonText="'Удалить'">
        Заметка будет удалена. Вы хотите продолжить?
    </modal>

    <modal
        @btnPressed="$emit('createTodoList')"
        :id="'createTodoListModal'"
        :title="'Создать список'"
        :buttonText="'Создать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Название списка">
    </modal>

    <modal
        @btnPressed="$emit('updateTodoList')"
        :id="'updateTodoListModal'"
        :title="'Редактирование списка'"
        :buttonText="'Редактировать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Название списка">
    </modal>

    <modal
        @btnPressed="$emit('deleteTodoList')"
        :id="'deleteTodoListModal'"
        :title="'Удаление списка'"
        :buttonText="'Удалить'">
        Список будет удален. Вы хотите продолжить?
    </modal>

    <modal
        @btnPressed="$emit('createTodoItem')"
        :id="'createTodoItemModal'"
        :title="'Создание элемента списка'"
        :buttonText="'Создать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Содержимое элемента списка">
    </modal>

    <modal
        @btnPressed="$emit('updateTodoItemBody')"
        :id="'updateTodoItemBodyModal'"
        :title="'Редактирование элемента списка'"
        :buttonText="'Редактировать'">
        <ul class="list-group">
            <li
                v-for="(error, index) in errors" 
                :class="{'mb-3': index == errors.length-1}"
                class="list-group-item list-group-item-danger">
                {{ error }}
            </li>
        </ul>
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Содержимое элемента списка">
    </modal>
</template>