import FlashView from "@/views/FlashView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useFlashCardStore } from "@/stores/flashcardStore";
import CompleteView from "@/views/CompleteView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "Home",
            path: "/",
            component: HomeView,
        },
        {
            name: "Flash",
            path: "/flash",
            component: FlashView,
            beforeEnter: () => {
                const store = useFlashCardStore();
                if (!store.file) return "/";
                return true;
            },
        },
        {
            name: "Complete",
            path: "/complete",
            component: CompleteView,
            beforeEnter: () => {
                const store = useFlashCardStore();
                if (!store.file) return "/";
                return true;
            },
        },
    ],
});

export default router;
