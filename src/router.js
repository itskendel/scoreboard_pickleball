import { createRouter, createWebHistory } from 'vue-router'
import NewMatch from './NewMatch.vue'
import ScoreBoard from './ScoreBoard.vue'
import MatchResult from './MatchResult.vue'

const routes = [
  {
    path: '/',
    name: 'new-match',
    component: NewMatch,
  },
  {
    path: '/score',
    name: 'score',
    component: ScoreBoard,
  },
  {
    path: '/result',
    name: 'result',
    component: MatchResult,
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
