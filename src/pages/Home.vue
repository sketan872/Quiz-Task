<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
    <h1 class="text-4xl md:text-5xl font-extrabold text-violet-600 text-center mb-8">
      Welcome to Quiz
    </h1>

    <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
      <label for="N" class="text-gray-700 font-medium">
        Name:
      </label>
      <input
        id="N"
        v-model="name"
        type="text"
        placeholder="Enter your name"
        class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
      />

      <router-link v-if="name.length > 0" to="/quiz-test">
        <button
          @click="handleClick"
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Start Quiz
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userpiniaStore } from '../stores/store';
let { login } = userpiniaStore();
let name = ref<string>('');

// This function check input value is not empty,then it will stored name using login function into store.
function handleClick() {
  if (name.value.trim() != '') {
    login(name.value)

  }
}
</script>
