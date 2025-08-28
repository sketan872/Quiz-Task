<template>
  <div class="flex justify-center items-center bg-green-200 min-h-screen px-4 py-6">
    <div class="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
      <div v-for="q in question.questions" :key="q.questionId">
        <div v-if="q.questionId == count">
          <!-- Timer -->
          <TimerBar v-slot="{ value }">
            <div v-if="value === 'Time Up!!'">
              {{ handleTimeout() }}
            </div>
          </TimerBar>

          <!-- Question -->
          <div class="mb-6 space-y-3">
            <h1 class="text-xl font-bold">Question No: {{ String(Number(q.questionId) + 1) }}</h1>
            <h3 class="text-lg">{{ q.questionText }}</h3>
            <h4><span class="font-semibold">Question Type:</span> {{ q.questionType }}</h4>
          </div>
        </div>

        <!-- Options -->
        <div
          v-for="option in q.options"
          :key="option.optionId"
          v-if="q.questionId == count"
          class="mb-3 flex items-center gap-3"
        >
          <input
            type="radio"
            v-model="answer"
            :id="option.optionId"
            name="option"
            :value="option.optionId"
            class="accent-violet-500"
          />
          <label :for="option.optionId" class="font-medium">
            {{ option.optionId }}. {{ option.text }}
          </label>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex justify-between">
        <button
          :disabled="count == 9"
          v-if="count < 9"
          @click="Loophandle"
          class="bg-violet-500 text-white px-6 py-2 rounded-md hover:bg-violet-600 transition disabled:opacity-50"
        >
          Next
        </button>

        <button
          @click="storedvalue"
          v-if="count == 9"
          class="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-500 transition"
        >
          Submit
        </button>
      </div>

      <!-- Result & Leaderboard -->
      <div v-if="count == 10" class="mt-10 text-center space-y-6">
        <h1 class="text-4xl font-bold">{{ display }}</h1>
        <router-link to="/LearderBoard">
          <button
            class="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
          >
            LeaderBoard
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TimerBar from '@/components/TimerBar.vue';
import { userpiniaStore } from '../stores/store';

const { user, addscore } = userpiniaStore();

interface Option {
  optionId: string;
  text: string;
}

interface QuizQuestion {
  questionId: number;
  questionText: string;
  questionType: string;
  options: Option[];
  correctOptionId: string;
}

interface QuestionProp {
  questions: QuizQuestion[];
}

// question props from quiz.vue
const props = defineProps<{ question: QuestionProp }>();

const count = ref<number>(0);
let score = 0;
const answer = ref<string>('');
const i = ref<number>(0);
const display = ref<string>('');

// it will go to next question 
const Loophandle = () => {
  if (count.value < 10) {
    i.value += 1;
    count.value += 1;
  }
// here I am checking user answer is equal to correctOptionId
  const currentQuestion = props.question.questions[i.value - 1];
  if (currentQuestion && answer.value === currentQuestion.correctOptionId) {
    score += 1;
  }

  answer.value = '';
};

// when timebar value is time-up then question will change 
function handleTimeout() {
  count.value++;
}

// when click to submit score will store into pinia store.
function storedvalue() {
  addscore(score);

  if (count.value < 10) {
    count.value += 1;
  }
  display.value = 'Completed! Your Score is ' + String(score);
}
</script>
