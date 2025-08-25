<template>
  <div class="bg-gray-300 h-screen">
    <h1 class="text-center text-[40px]  text-violet-500 font-bold bg-amber-40">Welcome to Quiz</h1>
 <div class="flex flex-col justify-center items-center">
  <label for="N" class="ml-2">Name:</label>
    <input id="N" v-model="name" class="border p-2 rounded-xl m-2"  type="text" placeholder="Enter your Name">
    <router-link to="/quiz">
    <button @click="handleClick" v-if="name.length>0" class="border p-2 font-bold bg-blue-300 rounded-xl hover:bg-blue-500 cursor-pointer transition-all duration-100 ease-in-out ">Start Quiz</button>
  </router-link>
  <!-- <ProgressBar/> -->
 </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userpiniaStore } from '../stores/counter';
// import ProgressBar from '@/components/ProgressBar.vue';
// import TimerBar from '../components/TimerBar.vue';
let { user ,login,addscore}=userpiniaStore();
let name=ref<string>('');

  function handleClick(){
    if(name.value.trim()!=''){
      login(name.value)
    
    }
  }
</script>

<style>

</style>