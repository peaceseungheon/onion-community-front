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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.router-link-active {
  color: #2563eb;
  font-weight: bold;
}
</style>
