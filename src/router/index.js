import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('../views/BoardView.vue')
    },
    {
      path: '/post/create',
      name: 'createPost',
      component: () => import('../views/CreatePostView.vue')
    },
    {
      path: '/board/:boardId/create',
      name: 'createPost',
      component: () => import('@/views/CreatePostView.vue'),
      props: true
    }
  ]
})

export default router
