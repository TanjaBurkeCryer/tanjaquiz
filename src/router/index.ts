import { createRouter, createWebHistory } from "vue-router";
import LoginScreen from "@/components/pages/LoginScreen.vue";
import QuizScreen from '@/components/pages/QuizScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginScreen,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizScreen,
    }
  ],
});

export default router;
