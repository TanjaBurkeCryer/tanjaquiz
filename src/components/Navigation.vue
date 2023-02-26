<template>
  <ul class="flex w-100 justify-end h-8 mr-5">
    <li
      v-for="(level, index) in difficultyLevels"
      :key="index"
      :class="`flex items-center justify-center mr-5 capitalize cursor-pointer ${
        index === selectedDifficultyLevel
          ? 'font-bold border-b-2 border-black'
          : ''
      }`"
      @click="changeDifficultyLevel(index, level)"
    >
      {{ level }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuestionsStore } from "@/stores/questions";
import { getQuestions } from "@/composables/useQuestionApi";

const selectedDifficultyLevel = ref<number>(0);
const questionsStore = useQuestionsStore();

const difficultyLevels: Array<String> = ["easy", "medium", "hard"];

async function changeDifficultyLevel(index: number, level: string) {
  selectedDifficultyLevel.value = index;
  const questions = await getQuestions(level, questionsStore.token);
  if (!questions) {
    // Do error handling
  }
  // Update store
  questionsStore.updateQuestions(questions);
}
</script>
