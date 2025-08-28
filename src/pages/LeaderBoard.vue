<template>
  <div class="h-screen border bg-green-200 p-6">
    <h1 class="font-bold text-[40px] text-center mt-3">Leaderboard</h1>

    <router-link to="/" class="flex justify-center mt-4">
      <button class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Play Another
      </button>
    </router-link>

    <div class="m-30">
      <table class="w-full text-left border-collapse mt-6">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 border-b-2 border-gray-300">Rank</th>
            <th class="py-3 px-4 border-b-2 border-gray-300">Name</th>
            <th class="py-3 px-4 border-b-2 border-gray-300">Score</th>
            <th class="py-3 px-4 border-b-2 border-gray-300">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in leaderboard" :key="entry.name">
            <td class="py-2 px-4 border-b font-bold capitalize">{{ index + 1 }}</td>
            <td class="py-2 px-4 border-b capitalize">{{ entry.name }}</td>
            <td class="py-2 px-4 border-b capitalize">{{ entry.score }}/10</td>
            <td class="py-2 px-4 border-b">
              <div class="w-full bg-gray-300 rounded h-5">
                <div class="bg-green-500 h-5 rounded" :style="{ width: (entry.score * 10) + '%' }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-view></router-view>
  </div>
</template>


<script setup lang="ts">
import { userpiniaStore } from '../stores/store';

interface LeaderboardEntry {
  name: string;
  score: number;
}

let leaderboard: LeaderboardEntry[] = [];

const { user } = userpiniaStore();

const nameScoreMap = new Map<string, number>();

if (user.name && user.result && user.name.length === user.result.length) {
  user.name.forEach((name: string, index: number) => {
    const score = user.result[index];

    if (!nameScoreMap.has(name) || score > nameScoreMap.get(name)!) {
      nameScoreMap.set(name, score);
    }

  });

  leaderboard = Array.from(nameScoreMap.entries()).map(([name, score]) => ({
    name,
    score
  }));

  leaderboard.sort((a, b) => b.score - a.score);
}
</script>
