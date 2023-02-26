<template>
  <section
    class="w-full h-full flex flex-col md:flex-row justify-center items-center"
  >
    <ImageContainer class="hidden md:block" />
    <LoginForm />
  </section>
</template>

<script setup lang="ts">
import ImageContainer from "@/components/ImageContainer.vue";
import LoginForm from "@/components/LoginForm.vue";
import { useQuestionsStore } from "@/stores/questions";
import { getToken, getQuestions } from "@/composables/useQuestionApi";

const questionsStore = useQuestionsStore();

async function onSubmit() {
  const myToken = await getToken();

  if (!myToken) {
    // Do error handling
  }

  const questions = await getQuestions("easy", myToken);
  if (!questions) {
    throw new Error("Was unable to retrieve questions. try again.");
  }

  // Update store and move on
  questionsStore.setToken(myToken);
  questionsStore.updateQuestions(questions);
}
</script>
