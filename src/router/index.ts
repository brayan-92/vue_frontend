import { createRouter, createWebHistory } from 'vue-router'
import Writers from '../components/Writers.vue'
import Books from '../components/Books.vue'

const routes = [
  { path: '/', redirect: '/writers' },
  { path: '/writers', component: Writers },
  { path: '/books', component: Books },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
