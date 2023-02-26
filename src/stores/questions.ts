import { defineStore } from "pinia";
import type { Question } from "@/types";

export const useQuestionsStore = defineStore("questions", {
  state: () => ({
    questions: [] as Question[],
    token: "",
  }),

  actions: {
    updateQuestions(questions: Question[]) {
      this.questions = questions;
    },
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.token = "";
    },
  },
});
