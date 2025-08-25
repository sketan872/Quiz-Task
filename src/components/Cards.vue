<template>
    <div class="flex justify-center bg-green-200 h-screen ">
        <div class="w-[800px]  h-[500px] m-[80px]">
            <div v-for="q in question.questions" :key="q.questionId">
                <div v-if="q.questionId == count">
                    <TimerBar v-slot="{ value }">
                        <div v-if="value === 'Time Up!!'">
                            {{ handleTimeout() }}
                        </div>
                    </TimerBar>
                    <div>
                    </div>
                    <h1 class="font-bold relative top-[60px] left-[70px]">Question No : {{ String(Number(q.questionId)
                        +1)}}</h1>
                    <h3 class="relative top-[36px] left-[230px]">{{ q.questionText }}</h3>
                    <h4 class=" relative top-[40px] left-[70px]"><span class="font-bold">QuestionType:</span> {{
                        q.questionType }}</h4>
                </div>
                <div v-for="option in q.options" class="relative top-[110px] left-[70px] gap-2.5" :key="option">
                    <div v-if="q.questionId == count" class="flex items-center gap-3 ">
                        <input type="radio" v-model="answer" :name="option.text" :value="option.optionId">
                        <p>{{ option.optionId }}. </p>
                        <p> {{ option.text }}</p>

                    </div>

                </div>
               
            </div>

        </div>
        <button :disabled="count == 9 ? true : false" v-if="count < 9" @click="Loophandle"
            class="border h-[40px] p-2  top-[480px] relative left-[-200px] cursor-pointer text-white bg-violet-400 hover:bg-violet-500  ">
            Next
        </button>
        <button @click="storedvalue" v-if="count == 9"
            class="bg-red-300 rounded cursor-pointer h-[50px] top-[450px] right-[250px] p-3 relative">Submit</button>


        <div v-if="count == 10" class=" flex flex-col mr-90 pt-30">
            <h1 class="font-bold text-[50px] ">
                {{ display }}
            </h1>
            <div class="w-40px">
                <router-link to="/LearderBoard">
                    <button class="bg-gray-500 border rounded cursor-pointer transition-all hover:text-[15px] duration-200 hover:bg-gray-700 text-white  ml-70 mt-22 p-2 ">LeaderBoard</button>
                </router-link>
                
            </div>


        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TimerBar from '../components/TimerBar.vue';
import { userpiniaStore } from '../stores/counter';

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


const props = defineProps<{ question: QuestionProp }>();


const count = ref<number>(0);
let score = 0;
const answer = ref<string>('');
const i = ref<number>(0);
const display = ref<string>('');


const Loophandle = () => {
  if (count.value < 10) {
    i.value += 1;
    count.value += 1;
  }

  const currentQuestion = props.question.questions[i.value - 1];
  if (currentQuestion && answer.value === currentQuestion.correctOptionId) {
    score += 1;
  }

  answer.value = '';
};


function handleTimeout() {
  count.value++;
}

function storedvalue() {
  addscore(score);

  if (count.value < 10) {
    count.value += 1;
  }

  display.value = 'Completed! Your Score is ' + String(score);
}
</script>
