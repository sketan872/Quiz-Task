<template>
    <div>

        <slot :value="count">

        </slot>
        <h2 v-if="typeof count == 'number'" class="font-bold text-[20px]">Timer:{{ count }}</h2>
        <h2 v-if="typeof count == 'string'"
            class="absolute left-[1070px] top-[130px] bg-red-400 font-bold  w-[150px] h-[150px] text-center pt-11 text-2xl rounded-full">
            {{ count }}</h2> 
    </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
let count = ref<number | string>(15);

// when page mount intially count will 15 after that it will decrease by 1 second 
// and when count value will 0 it shows time up

onMounted(() => {
    const interval = setInterval(() => {
        if (count.value > '0' && typeof count.value == 'number') {
            count.value -= 1

        }
        else {
            count.value = 'Time Up!!'
            clearInterval(interval)
        }
    }, 1000)

})
</script>