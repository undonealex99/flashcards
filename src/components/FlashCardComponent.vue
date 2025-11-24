<script setup lang="ts">
defineProps<{
    active?: boolean;
    completed?: boolean;
    wrong?: number;
    lesson?: string;
}>();
</script>

<template>
    <div
        class="card-container"
        :class="{
            'card-not-active': !active && !completed,
            'card-complete': completed,
        }"
        :style="active ? `background: rgba(255, 55, 55, ${33 * (wrong ? wrong : 0)}%)` : ''"
    >
        <div class="lesson" v-if="lesson">Lesson {{ lesson }}</div>
        <div class="card-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.card-container {
    border: 1px solid grey;
    padding: 5rem;
    margin-right: 8rem;
    min-width: max-content;
    width: fit-content;
    position: relative;
}
.lesson {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5rem 1rem;
    background-color: lightblue;
    border-bottom-right-radius: 10px;
    font-weight: bold;
}
.card-not-active {
    margin-right: 1rem;
    opacity: 50%;
    background-color: lightgray;
}
.card-complete {
    margin-right: 1rem;
    opacity: 50%;
    background-color: lightgreen;
    margin-left: 2rem;
}
.card-wrong {
    background-color: lightcoral;
}
</style>
