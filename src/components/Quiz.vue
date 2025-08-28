  <template>
    <div class="relative">
      <h1 v-if="question.length > 0" class="text-center text-amber-600 bg-amber-100 text-xl">
        {{ question[0]?.quizTitle }}
      </h1>

      <p v-if="question.length" class="text-center text-[20px] m-4">
        Description: {{ question[0].description }}
      </p>

      <h4 class="font-bold text-[20px] text-center ">Welcome</h4>
      <div v-for="ques in question" :key="ques.quizTitle">
        <!-- Here the dynamic ques pass every loop -->
        <Cards :question="ques" />
      </div>
      <router-view></router-view>
    </div>
  </template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import Cards from './Cards.vue';
import { userpiniaStore } from '../stores/store';

let { user } = userpiniaStore();

interface Question {
  quizTitle: string;
  description: string;
 
}

const question = ref<Question[]>([]);


// In this async fetchdata() function it is used to fetch the response from the db.json and we have to start json first and after that insert res.json inside question . 
async function fetchdata() {
  const res = await fetch('http://localhost:3000/posts');
  question.value = await res.json() as Question[];
}

// it will call when page mount
onBeforeMount(fetchdata);
</script>
