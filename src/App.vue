<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <NavigationBar />
    <main class="container mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>
