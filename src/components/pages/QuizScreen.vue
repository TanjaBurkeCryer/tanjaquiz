<template>
  <header class="w-100 flex justify-end items-center mb-8">
    <Navigation />
    <LogOutButton />
  </header>
  <QuizWrapper />
</template>

<script setup lang="ts">
import QuizWrapper from "@/components/QuizWrapper.vue";
import LogOutButton from "@/components/LogOutButton.vue";
import Navigation from "@/components/Navigation.vue";
import { watchEffect } from "vue";
import { useQuestionsStore } from "@/stores/questions";
import {useRouter} from "vue-router"
const questionsStore = useQuestionsStore()
const router = useRouter();


watchEffect(() => {
  if (!questionsStore.token)
    router.push("/");
})
</script>
