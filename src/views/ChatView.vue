<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- 채팅방 헤더 -->
        <div class="bg-blue-500 text-white p-4">
          <h1 class="text-xl font-semibold">채팅방</h1>
        </div>
        
        <!-- 채팅 컴포넌트 -->
        <div class="h-[600px]">
          <ChatRoom />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatRoom from '@/components/Chat/ChatRoom.vue';
</script>
