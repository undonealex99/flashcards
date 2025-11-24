<script setup lang="ts">
import router from "@/router";
import { useFlashCardStore } from "@/stores/flashcardStore";

const store = useFlashCardStore();

const restart = (): void => {
    store.reset(true);
    router.push("/");
};

const goAgain = (): void => {
    store.reset(false);
    store.formatAndRandomise(store.JSONObject ?? []);
    router.push("/flash");
};
</script>

<template>
    <div class="page-container">
        <h1>Congratulations!</h1>
        <h2>You finished all the cards</h2>
        <div class="stats">
            <h2>Stats:</h2>
            <h3 style="color: darkgreen">Correct Answers: {{ store.completedArray.length }}</h3>
            <h3 style="color: darkred">Wrong Answers: {{ store.wrongAnswersTotal }}</h3>
            <h3 style="color: darkorange">Skipped Answers: {{ store.skippedAnswers.length }}</h3>
        </div>
        <button @click="goAgain">Go Again</button>
        <button @click="restart">New File</button>
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
}
.stats {
    margin-top: 2rem;
}

button {
    padding: 1rem 3rem;
    border: 2px solid grey;
    cursor: pointer;
    transition: 0.25s ease-in-out;
    border-radius: 10px;

    &:hover:enabled {
        background-color: darkgrey;
        border: 2px dashed black;
        color: white;
    }
}
</style>
