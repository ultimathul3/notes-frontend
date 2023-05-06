<script>
import dateFormat from 'dateformat'

export default {
    props: {
        modelValue: String,
        clickedTodoList: Object,
        modalInput: String,
    },

    emits: [
        'update:modelValue',
        'updateTodoItemDone',
        'deleteTodoItem',
        'updateSelectedTodoItem',
        'updateTodoItemBody',
    ],

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yyyy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <div v-if="clickedTodoList.items?.length === 0">
        Список пуст
    </div>

    <ul v-for="(item, index) in clickedTodoList.items" :key="item.id" class="list-group pointer"
        :class="{'mt-1': index !== 0}">
        <li class="list-group-item list-group-item-action list-todo"
            @click="$emit('updateTodoItemDone', item.id, !item.done)">
            <span :style="{'text-decoration': item.done ? 'line-through' : 'none', 'color': item.done ? '#acacac' : '#000'}">
                {{ item.body }}
            </span>
            <span style="float:right;">
                <i @click.stop="$emit('updateSelectedTodoItem', item)"
                    class="bi bi-pencil"
                    data-bs-toggle="modal"
                    data-bs-target="#updateTodoItemBodyModal">
                </i>&nbsp;
                <i @click.stop="$emit('deleteTodoItem', item.id)"
                    class="bi bi-x-circle">
                </i>
            </span>
        </li>
    </ul>
    
    <button
        @click="$emit('update:modelValue', '')"
        data-bs-toggle="modal"
        data-bs-target="#createTodoItemModal" 
        type="button" 
        class="btn btn-success mt-2">
        Добавить
    </button>
    
    <br>
    
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedTodoList.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedTodoList.updated_at) }}
    </div>
</template>