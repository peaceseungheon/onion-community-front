<script setup>


</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="space-x-4">
          <router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-blue-600">About</router-link>
          <router-link to="/signup" class="text-gray-700 hover:text-blue-600">회원가입</router-link>
        </div>
      </div>
    </nav>
    
    <main class="container mx-auto p-4">
      <router-view></router-view>
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
