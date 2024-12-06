<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <RouterLink to="/" class="text-xl font-bold text-gray-800">Onion</RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink 
              v-for="route in routes" 
              :key="route.path"
              :to="route.path"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              :class="{ 'border-b-2 border-blue-500 text-gray-900': isCurrentRoute(route.path) }"
            >
              {{ route.name }}
            </RouterLink>
          </div>
        </div>
        <div class="flex items-center">
          <RouterLink 
            v-if="!isLoggedIn" 
            to="/login" 
            class="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            로그인
          </RouterLink>
          <button 
            v-else 
            @click="handleLogout" 
            class="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const routes = [
  { path: '/', name: '홈' },
  { path: '/about', name: '소개' }
]

const isLoggedIn = computed(() => authStore.isAuthenticated)

const isCurrentRoute = (path) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
}
</script>
