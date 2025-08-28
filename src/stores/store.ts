import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface user {
  name: string[],
  result: number[],
}


// Here we stored name inside nameArray[] ,score inside result array
export const userpiniaStore = defineStore('score', () => {

  let user = reactive<user>({
    name: [],
    result: []
  })
  const login = (username: string) => {
    user.name.push(username)
  }
  const addscore = (score: number) => {
    user.result.push(score)
  }
  return { user, login, addscore };
})


