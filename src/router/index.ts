import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SuccessPage.vue'),
    },
  ],
})

export default router
