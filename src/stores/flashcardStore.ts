import router from "@/router";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface VocabWord {
    definition: string; // english
    term: string; // japanese
    lesson?: string;
    kanji?: string;
}

export const useFlashCardStore = defineStore("flashCard", () => {
    const array: Ref<VocabWord[]> = ref([]);
    const completedArray: Ref<VocabWord[]> = ref([]);
    const skippedAnswers: Ref<VocabWord[]> = ref([]);

    const wrongAnswers: Ref<number> = ref(0);
    const wrongAnswersTotal: Ref<number> = ref(0);

    const JSONObject: Ref<VocabWord[] | null> = ref(null);
    const file: Ref<File | null> = ref(null);

    const isEnglishTheQuestion: Ref<boolean> = ref(true);

    const answerField: Ref<string> = ref("");

    const extractFileToJSON = async (fileContent: File): Promise<VocabWord[]> => {
        const parsed = JSON.parse(await fileContent.text());
        if (!Array.isArray(parsed)) return [];

        const filtered = parsed.filter(
            (e): e is { definition?: string; term?: string } => e !== null && typeof e === "object"
        );

        return filtered
            .map((e) => {
                const entry = e as { definition: string; term: string; lesson: string };
                return {
                    definition: String(entry.definition ?? ""),
                    term: String(entry.term.split("\n")[0] ?? ""),
                    kanji: String(entry.term.split("\n")[1] ?? ""),
                    lesson: String(entry.lesson ?? ""),
                } as VocabWord;
            })
            .filter((v) => v.definition !== "" && v.term !== "");
    };

    const formatAndRandomise = (vocabArray: VocabWord[]): void => {
        if (!Array.isArray(vocabArray) || vocabArray.length < 1) return;

        // Make a shallow copy then Fisher-Yates shuffle
        const copy = vocabArray.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = copy[i]!;
            copy[i] = copy[j]!;
            copy[j] = tmp;
        }

        array.value = copy;
    };

    const answerCorrectly = (arrayEntry: VocabWord): void => {
        const ind = array.value.indexOf(arrayEntry);
        if (ind > -1) {
            const removed = array.value.splice(ind, 1)[0]!;
            completedArray.value.push(removed);
        }
        answerField.value = "";
        wrongAnswers.value = 0;
        if (array.value.length === 0) {
            router.push("/complete");
        }
    };

    const skipAnswer = (arrayEntry: VocabWord): void => {
        const ind = array.value.indexOf(arrayEntry);
        if (ind > -1) {
            const removed = array.value.splice(ind, 1)[0]!;
            skippedAnswers.value.push(removed);
        }
        answerField.value = "";
        wrongAnswers.value = 0;
    };

    const reset = (full: boolean): void => {
        array.value = [];
        completedArray.value = [];
        skippedAnswers.value = [];
        answerField.value = "";
        wrongAnswers.value = 0;

        if (full) {
            JSONObject.value = null;
            file.value = null;
            isEnglishTheQuestion.value = true;
        }
    };

    return {
        array,
        completedArray,
        skippedAnswers,
        answerField,
        wrongAnswers,
        wrongAnswersTotal,
        skipAnswer,
        JSONObject,
        file,
        isEnglishTheQuestion,
        extractFileToJSON,
        formatAndRandomise,
        answerCorrectly,
        reset,
    };
});
