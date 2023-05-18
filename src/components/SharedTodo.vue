<script>
import dateFormat from 'dateformat'

export default {
    props: {
        clickedSharedTodoList: Object,
    },

    emits: [
        'update:modelValue',
        'updateTodoItemDone',
        'deleteTodoItem',
        'updateSelectedTodoItem',
        'updateTodoItemBody',
        'getOutgoingSharedTodoLists',
    ],

    methods: {
        formatDatetime(datetime) {
            return dateFormat(datetime, 'dd.mm.yy, HH:MM:ss')
        }
    }
}
</script>

<template>
    <div v-if="clickedSharedTodoList.items?.length === 0">
        Список пуст
    </div>

    <ul v-for="(item, index) in clickedSharedTodoList.items" :key="item.id" class="list-group pointer"
        :class="{'mt-1': index !== 0}">
        <li class="list-group-item list-group-item-action list-todo"
            @click="$emit('updateTodoItemDone', item.id, !item.done)">
            <span :style="{'text-decoration': item.done ? 'line-through' : 'none', 'color': item.done ? '#acacac' : '#000'}">
                {{ item.body }}
            </span>
        </li>
    </ul>
    
    <div class="mt-4">
        Создано: {{ formatDatetime(clickedSharedTodoList.created_at) }}
        <br>
        Обновлено: {{ formatDatetime(clickedSharedTodoList.updated_at) }}
    </div>
</template>