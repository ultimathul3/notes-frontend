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
        'notificationsCount',
        'incomingSharedNotes',
        'outgoingSharedNotes',
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
        'createSharedNote',
        'acceptSharedNote',
        'deleteSharedNote',
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

    <modal
        @btnPressed="$emit('createSharedNote')"
        :id="'shareNoteModal'"
        :title="'Поделиться заметкой'"
        :buttonText="'Поделиться заметкой'">
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
            placeholder="Логин пользователя">
    </modal>

    <modal
        :id="'notificationsModal'"
        :title="'Уведомления'">
        <span v-if="notificationsCount === 0">Уведомлений нет</span>
        <ul v-for="(item, index) in incomingSharedNotes" :key="item.id" class="list-group"
            :class="{'mt-1': index !== 0}">
            <li class="list-group-item list-group-item-action list-todo">
                <i class="bi bi-person"></i> <b>{{ item.owner_name }}</b> <i>({{ item.owner_login }})</i><br>
                Пользователь хочет поделиться с вами заметкой '{{ item.title }}'
                <span style="float:right;">
                    <i @click.stop="$emit('acceptSharedNote', item.id)" class="bi bi-check-circle pointer"></i>
                    &nbsp;
                    <i @click.stop="$emit('deleteSharedNote', item.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
    </modal>

    <modal
        :id="'outgoingNotesModal'"
        :title="'Пользователи, с кем вы поделились'">
        <span v-if="outgoingSharedNotes.length === 0">Ни один пользователь не принял эту заметку</span>
        <ul v-for="(item, index) in outgoingSharedNotes" :key="item.id" class="list-group"
            :class="{'mt-1': index !== 0}">
            <li class="list-group-item list-group-item-action list-todo">
                <i class="bi bi-person"></i> <b>{{ item.recipient_name }}</b> <i>({{ item.recipient_login }})</i>
                <span style="float:right;">
                    <i @click.stop="$emit('deleteSharedNote', item.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
    </modal>
</template>