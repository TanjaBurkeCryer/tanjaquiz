<template>
  <div
    class="flex-col md:w-4/5 w-full bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg shadow-gray-200 p-5 mb-4"
  >
    <p class="mb-4 font-light text-blue-500 text-sm">
      {{ question.category }}
    </p>
    <p class="flex flex-col mb-4">
      <span class="text-lg md:text-xl font-medium">{{
        cleanApiText(question.question)
      }}</span>
    </p>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <ul>
          <li v-for="(answer, index) in randomizedAnswers" :key="index">
            <input
              type="radio"
              name="answer"
              required
              :value="answer"
              v-model="selectedAnswer"
            />
            <label for="answer" class="ml-5">{{ cleanApiText(answer) }}</label>
          </li>
        </ul>
        <p
          v-if="question.isChecked"
          :style="{ color: response ? 'green' : 'red' }"
          class="text-md md:text-lg font-medium mt-8"
        >
          {{
            response
              ? "YES! Your answer is correct."
              : `So close. The correct answer is ${question.correct_answer}`
          }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import type { Question } from "@/types/index";
import TextReplacementMap from "@/helpers/text";

const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits(['onSubmit'])

const randomizedAnswers = computed(() => shuffle());
const selectedAnswer = ref<any>();
const response = ref<boolean>(false);

watchEffect(() => {
  if (props.question && !props.question.isChecked) {
    selectedAnswer.value = null;
  }
});

function shuffle() {
  let answersArray: any = [];

  answersArray = answersArray.concat(props.question.incorrect_answers);
  answersArray.push(props.question.correct_answer);

  let counter = answersArray.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = answersArray[counter];
    answersArray[counter] = answersArray[index];
    answersArray[index] = temp;
  }
  return answersArray;
}
function cleanApiText(input: string): string {
  for (let [search, replacement] of TextReplacementMap) {
    input = input.replaceAll(search, replacement);
  }
  return input;
}

function onSubmit() {
  emit("onSubmit");
}
</script>
