<template>
  <article
    class="w-full md:w-1/2 flex flex-col items-center justify-center h-96"
  >
    <div class="flex flex-col w-2/3 items-start justify-center">
      <h2 class="font-bold text-lg">Hi! Let's quiz</h2>
      <p>Please submit your username and password below.</p>
      <form @submit.prevent="onSubmit" class="flex flex-col w-80">
        <label for="uname" class="mb-2 mt-4 rounded-md font-medium"
          >Username</label
        >
        <input
          type="text"
          placeholder="Please enter your username"
          name="uname"
          required
          class="border-slate-300 border h-10 rounded-md p-3"
          v-model="uname"
        />

        <label for="password" class="mb-2 mt-4 rounded-md font-medium"
          >Password</label
        >
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          class="border-slate-300 border h-10 rounded-md p-3"
          v-model="password"
        />

        <button
          type="submit"
          class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-10 rounded-md mt-5"
        >
          Login
        </button>
      </form>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useQuestionsStore } from "@/stores/questions";
import { getToken, getQuestions } from "@/composables/useQuestionApi";
import { useRouter } from "vue-router";
import { ref } from "vue";

const questionsStore = useQuestionsStore();
const router = useRouter();
const uname = ref<String>();
const password = ref<String>();

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
  uname.value = "";
  password.value = "";
  router.push("/quiz");
}
</script>
