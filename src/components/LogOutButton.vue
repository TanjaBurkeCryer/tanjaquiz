<template>
  <button
    @click="logout"
    class="w-32 h-8 border bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white"
  >
    Logout
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuestionsStore } from "@/stores/questions";

const questionsStore = useQuestionsStore();
const router = useRouter();

function logout() {
  questionsStore.logout();
  router.push("/");
}
</script>
