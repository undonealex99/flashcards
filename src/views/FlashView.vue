<script setup lang="ts">
import FlashCardComponent from "@/components/FlashCardComponent.vue";
import { useFlashCardStore } from "@/stores/flashcardStore";
import { computed, onBeforeMount, ref } from "vue";

const store = useFlashCardStore();

const displayAnswer = ref(false);
const inputPlaceholder = ref("");

const submitAnswer = (): void => {
    if (!store.answerField.length) return;
    if (store.array[0]) {
        const current = store.array[0];
        if (!store.isEnglishTheQuestion) {
            // Question shows the term (Japanese), expect English definition
            if (store.answerField.toLocaleLowerCase() === current.definition.toLocaleLowerCase()) {
                store.answerCorrectly(current);
                displayAnswer.value = false;
                inputPlaceholder.value = "";
            } else {
                wrongAnswer();
            }
        } else {
            // Question shows the definition (English), expect the term
            if (store.answerField.toLocaleLowerCase() === current.term.toLocaleLowerCase()) {
                store.answerCorrectly(current);
                displayAnswer.value = false;
                inputPlaceholder.value = "";
            } else {
                wrongAnswer();
            }
        }
    }
};

const wrongAnswer = (): void => {
    store.wrongAnswers = store.wrongAnswers + 1;
    store.wrongAnswersTotal = store.wrongAnswersTotal + 1;
    if (store.wrongAnswers === 3) {
        displayAnswer.value = true;
    }
    inputPlaceholder.value = store.answerField;
    store.answerField = "";
};

const skip = (): void => {
    if (store.array[0]) {
        store.skipAnswer(store.array[0]);
    }
    displayAnswer.value = false;
    inputPlaceholder.value = "";
    store.answerField = "";
};

const lastAnswer = computed(() => store.completedArray[store.completedArray.length - 1]);

onBeforeMount(() => {
    if (store.JSONObject) store.formatAndRandomise(store.JSONObject);
});
</script>

<template>
    <div class="counter">
        <h2>
            Cards left: {{ store.array.length }} Cards complete: {{ store.completedArray.length }}
        </h2>
    </div>
    <div class="question-container">
        <div class="completed">
            <FlashCardComponent v-if="lastAnswer" :completed="true">
                <span v-if="store.isEnglishTheQuestion">{{ lastAnswer.definition }}</span>
                <span v-else>{{ lastAnswer.term }}</span>
            </FlashCardComponent>
        </div>
        <div class="still-active">
            <FlashCardComponent
                v-for="(row, ind) in store.array"
                :active="ind === 0"
                :wrong="ind === 0 ? store.wrongAnswers : 0"
                :lesson="row.lesson ?? undefined"
            >
                <span v-if="store.isEnglishTheQuestion">{{ row.definition }}</span>
                <span v-else>
                    {{ row.term }}
                    <span style="opacity: 0.5" v-if="row.kanji">
                        <br />
                        {{ row.kanji }}
                    </span>
                </span>
            </FlashCardComponent>
        </div>
    </div>
    <div class="answer-container">
        <h2 v-if="displayAnswer && store.array[0]">
            {{ store.isEnglishTheQuestion ? store.array[0].term : store.array[0].definition }}
        </h2>
    </div>
    <div class="input-container">
        <input
            class="answer-field"
            v-model="store.answerField"
            :placeholder="inputPlaceholder ?? 'Answer'"
            type="text"
            @keyup.enter="submitAnswer"
        />
    </div>
    <div class="skip">
        <button @click="skip">Skip</button>
        <div class="skipped-answers">
            <FlashCardComponent
                v-for="row in store.skippedAnswers"
                :active="false"
                :wrong="0"
                :lesson="row.lesson"
            >
                <div>{{ row.definition }}</div>
                <div>{{ row.term }}</div>
            </FlashCardComponent>
        </div>
    </div>
</template>

<style scoped>
.counter {
    display: flex;
    justify-content: center;
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

.skip {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 2rem;
    min-height: 16rem;
    justify-content: space-between;
}
.skipped-answers {
    display: flex;
    margin-left: 2rem;
    flex-wrap: wrap;
}
.question-container {
    display: flex;
    justify-content: space-around;
    margin: 3rem 0 2rem 0;
}
.completed {
    min-width: 40%;
}

.still-active {
    min-width: 60%;
    display: flex;
}
.answer-container {
    display: flex;
    justify-content: center;
    min-height: 70px;
}
.input-container {
    display: flex;
    justify-content: center;
}
.answer-field {
    padding: 0.5rem 3rem;
    font-size: 1.5rem;
    text-align: center;
}
</style>
