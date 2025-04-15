<template>
    <div>
        <label>Simple To-Do List</label>
        <div v-for="(task, index) in tasks" :key="index">
            <input v-model="task.isComplete" type="checkbox" :id="'task-' + index">
            <label :class="{ 'is-complete': task.isComplete }" :for="'task-' + index">{{ task.text }}</label>
            <button @click="removeTask(index)">Remove</button>
        </div>
        <div v-if="tasks.length === 0">
            <label>Currently, no tasks!</label>
        </div>
        <input v-model="taskToAdd" placeholder="Task to add" @keyup.enter="addTask" />
        <button @click="addTask">Add</button>
        <button v-if="tasks.length > 0" @click="clearAll">Clear All</button>

    </div>
</template>

<script>

export default {
    name: 'SimpleToDoList',
    data() {
        return {
            taskToAdd: '',
            tasks: [],
        }
    },
    methods: {
        addTask() {
            this.taskToAdd = this.taskToAdd.trim();

            if (this.taskToAdd) {
                const exists = this.tasks.some(task => task.text.toLowerCase() === this.taskToAdd.toLowerCase());

                if (exists) {
                    alert("Task already exists!");
                } else {
                    this.tasks.push({ text: this.taskToAdd, isComplete: false });
                    this.taskToAdd = '';
                }
            } else {
                alert("Task cannot be empty!");
            }
        },
        removeTask(index) {
            if (index > -1) {
                this.tasks.splice(index, 1);
            }

        },
        clearAll() {
            if (confirm("Are you sure?")) {
                this.tasks = [];
            }
        }
    }
}
</script>

<style>
.is-complete {
    text-decoration: line-through;
}
</style>
