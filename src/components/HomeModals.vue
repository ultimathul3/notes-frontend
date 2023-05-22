<script>
import Modal from '@/components/Modal.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'

export default {
    name: 'home-modals',

    components: {
        Modal,
        VueDatePicker,
    },

    props: [
        'modelValue',
        'errors',
        'notificationsCount',
        'incomingSharedNotes',
        'outgoingSharedNotes',
        'incomingSharedTodoLists',
        'outgoingSharedTodoLists',
        'selectedSharedNote',
        'selectedSharedTodoList',
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
        'createSharedTodoList',
        'acceptSharedTodoList',
        'deleteSharedTodoList',
        'advancedSearch',
    ],

    data() {
        return {
            createDates: [],
            updateDates: [],
            notes: true,
            sharedNotes: true,
            lists: true,
            sharedLists: true,
            format: (dates) => {
                const start = format(dates[0], 'dd.MM.yy HH:mm')
                const end = format(dates[1], 'dd.MM.yy HH:mm')
                return `${start} - ${end}`
            }
        }
    }
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
        :buttonText="'Поделиться'">
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
            <li class="list-group-item list-group-item-action list-note">
                <i class="bi bi-person"></i> <b>{{ item.owner_name }}</b> <i>({{ item.owner_login }})</i><br>
                Пользователь хочет поделиться с вами заметкой '{{ item.title }}'
                <span style="float:right;">
                    <i @click.stop="$emit('acceptSharedNote', item.id)" class="bi bi-check-circle pointer"></i>
                    &nbsp;
                    <i @click.stop="$emit('deleteSharedNote', item.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
        <ul v-for="(item, index) in incomingSharedTodoLists" :key="item.id" class="list-group"
            :class="{'mt-1': incomingSharedNotes.length !== 0}">
            <li class="list-group-item list-group-item-action list-todo">
                <i class="bi bi-person"></i> <b>{{ item.owner_name }}</b> <i>({{ item.owner_login }})</i><br>
                Пользователь хочет поделиться с вами списком '{{ item.title }}'
                <span style="float:right;">
                    <i @click.stop="$emit('acceptSharedTodoList', item.id)" class="bi bi-check-circle pointer"></i>
                    &nbsp;
                    <i @click.stop="$emit('deleteSharedTodoList', item.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
    </modal>

    <modal
        :id="'outgoingNotesModal'"
        :title="'Пользователи, с кем вы поделились'">
        <span v-if="outgoingSharedNotes.length === 0">Ни один пользователь не принял эту заметку</span>
        <ul v-for="(note, index) in outgoingSharedNotes" :key="note.id" class="list-group"
            :class="{'mt-1': index !== 0}">
            <li class="list-group-item list-group-item-action list-note">
                <i class="bi bi-person"></i> <b>{{ note.recipient_name }}</b> <i>({{ note.recipient_login }})</i>
                <span style="float:right;">
                    <i @click.stop="$emit('deleteSharedNote', note.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
    </modal>

    <modal
        @btnPressed="$emit('createSharedTodoList')"
        :id="'shareTodoListModal'"
        :title="'Поделиться списком'"
        :buttonText="'Поделиться'">
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
        :id="'outgoingTodoListsModal'"
        :title="'Пользователи, с кем вы поделились'">
        <span v-if="outgoingSharedTodoLists.length === 0">Ни один пользователь не принял этот список</span>
        <ul v-for="(list, index) in outgoingSharedTodoLists" :key="list.id" class="list-group"
            :class="{'mt-1': index !== 0}">
            <li class="list-group-item list-group-item-action list-todo">
                <i class="bi bi-person"></i> <b>{{ list.recipient_name }}</b> <i>({{ list.recipient_login }})</i>
                <span style="float:right;">
                    <i @click.stop="$emit('deleteSharedTodoList', list.id)" class="bi bi-x-circle pointer"></i>
                </span>
            </li>
        </ul>
    </modal>

    <modal
        @btnPressed="$emit('deleteSharedNote', this.selectedSharedNote.id)"
        :id="'deleteSharedNoteModal'"
        :title="'Удаление заметки'"
        :buttonText="'Удалить'">
        Заметка будет удалена. Вы хотите продолжить?
    </modal>


    <modal
        @btnPressed="$emit('deleteSharedTodoList', this.selectedSharedTodoList.id)"
        :id="'deleteSharedTodoListModal'"
        :title="'Удаление списка'"
        :buttonText="'Удалить'">
        Список будет удален. Вы хотите продолжить?
    </modal>

    <modal
        @btnPressed="$emit('advancedSearch', notes, sharedNotes, lists, sharedLists, createDates, updateDates)"
        :id="'searchModal'"
        :title="'Расширенный поиск'"
        :buttonText="'Найти'">
        <input :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            type="text" class="form-control"
            placeholder="Поиск...">
        <ul class="list-group mt-2">
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="notes" id="check1" checked>
                            <label class="form-check-label" for="check1">
                                Заметки
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="sharedNotes" id="check2" checked>
                            <label class="form-check-label" for="check2">
                                Общие заметки
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="lists" id="check3" checked>
                            <label class="form-check-label" for="check3">
                                Списки
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="sharedLists" id="check4" checked>
                            <label class="form-check-label" for="check4">
                                Общие списки
                            </label>
                        </div>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                Время создания:
                <div class="row">
                    <VueDatePicker v-model="createDates" auto-apply :format="format" locale="ru" teleport-center range />
                </div>
                Время обновления:
                <div class="row">
                    <VueDatePicker v-model="updateDates" auto-apply :format="format" locale="ru" teleport-center range />
                </div>
            </li>
        </ul>
    </modal>
</template>

<style scoped>
.list-note {
    border: var(--bs-list-group-border-width) solid #13653f;
}
.list-todo {
    border: var(--bs-list-group-border-width) solid #0d6efd;
}
</style>