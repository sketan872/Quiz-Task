import Home from '@/pages/Home.vue'
import LeaderBoard from '@/pages/LeaderBoard.vue'
import Quizview from '../pages/Quizview.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: Home,
  }, {
    path: '/quiz',
    component: Quizview,
  },
  {
    path: '/LearderBoard',
    component: LeaderBoard,

  }


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
