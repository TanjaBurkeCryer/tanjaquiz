<template>
  <section>
    <article class="flex flex-col">
      <QuestionItem
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
      />
    </article>
    <button
      @click="submit"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-10 rounded-md mt-5 w-64"
    >
      Submit your answers
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useQuestionsStore } from "@/stores/questions";
import QuestionItem from "@/components/QuestionItem.vue";

// const currentIndex = ref<number>(0);
const storeQuestions = useQuestionsStore();
const questions = ref(storeQuestions.questions);

watchEffect(() => {
  questions.value = storeQuestions.questions;
});

function submit() {
  const checkedQuestions = storeQuestions.questions.map((x) => ({
    ...x,
    isChecked: true,
  }));
  storeQuestions.updateQuestions(checkedQuestions);
}
</script>
