<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto min-h-screen bg-white p-6">
      <div>
        <h2 class="text-center text-2xl font-bold text-gray-900 mb-8">
          홈
        </h2>
      </div>
      <div class="space-y-4">
        <RouterLink to="/login" class="block w-full text-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          로그인
        </RouterLink>
        <RouterLink to="/signup" class="block w-full text-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          회원가입
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
