<script setup lang="ts">
import router from "@/router";
import { useFlashCardStore } from "@/stores/flashcardStore";

const store = useFlashCardStore();

const onFileUpload = async (e: Event): Promise<void> => {
    const target = e.target as HTMLInputElement;
    if (target.files === null || target.files[0] === undefined) return;
    store.file = target.files[0];
    store.JSONObject = await store.extractFileToJSON(store.file);
};

const navigateToMain = (): void => {
    router.push("/flash");
};
</script>

<template>
    <div class="home-container">
        <h1>Upload the file you want to flashcard with:</h1>
        <input
            class="hidden-input"
            id="file-input"
            type="file"
            @change="onFileUpload"
            accept=".json"
        />
        <label for="file-input" class="file-input-label"> Upload your file here </label>

        <p v-if="store.file">{{ store.file?.name }}</p>

        <input
            v-model="store.isEnglishTheQuestion"
            id="keyorvalue"
            class="hidden-input"
            type="checkbox"
        />
        Question in:
        <label for="keyorvalue" class="keyorvalue">
            <span :class="{ selected: store.isEnglishTheQuestion }"> English </span> or
            <span :class="{ selected: !store.isEnglishTheQuestion }"> Japanese </span>?
        </label>

        <button :disabled="!store.file" @click="navigateToMain">Get Flashin'</button>
    </div>
</template>

<style scoped>
.home-container {
    margin: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.selected {
    color: red;
}

.keyorvalue {
    cursor: pointer;
    user-select: none;
    margin-bottom: 1rem;
    border: 2px solid grey;
    padding: 0.5rem;

    &:hover {
        background-color: lightgrey;
        border-color: black;
    }
}

.hidden-input {
    display: none;
}

.file-input-label {
    padding: 5rem;
    margin: 2rem;
    border: 2px dashed grey;
    cursor: pointer;
    transition: 0.25s ease-in-out;

    &:hover {
        background-color: darkgrey;
        border: 2px dashed black;
        color: white;
    }
}

button {
    padding: 1rem;
    border: 2px solid grey;
    cursor: pointer;
    transition: 0.25s ease-in-out;
    border-radius: 10px;

    &:hover:enabled {
        background-color: darkgrey;
        border: 2px dashed black;
        color: white;
    }

    &:disabled {
        cursor: not-allowed;
    }
}
</style>
