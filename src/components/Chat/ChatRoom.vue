<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" 
           class="flex flex-col" 
           :class="message.userNo === authStore.user.userNo ? 'items-end' : 'items-start'">
        <div class="max-w-[70%] break-words rounded-lg p-3"
             :class="message.userNo === authStore.user.userNo ? 'bg-blue-500 text-white' : 'bg-gray-200'">
          <p class="text-sm">{{ message.message }}</p>
          <span class="text-xs mt-1 opacity-70">{{ formatTime(message.timestamp) }}</span>
        </div>
      </div>
    </div>

    <div class="border-t p-4">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="메시지를 입력하세요..."
          class="flex-1 rounded-lg border p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          전송
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useChatStore } from '@/stores/chat';
import { useAuthStore } from '@/stores/auth'
import type { IChatMessage } from '@/interface/chat';

const authStore = useAuthStore();
const chatStore = useChatStore();
const newMessage = ref<string>('');
const messages = chatStore.messages
const messageContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  chatStore.connect();
});

onUnmounted(() => {
  chatStore.disconnect();
});

watch(messages, () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
}, { deep: true });

const sendMessage = (): void => {
  if (!newMessage.value.trim()) return;
  const message: IChatMessage = {
    message: newMessage.value,
    userNo: authStore.user.userNo,
    timestamp: Date.now(),
  };
  chatStore.chat(message);
  newMessage.value = '';
};

const formatTime = (timestamp: number): string => {
  return format(new Date(timestamp), 'a h:mm', { locale: ko });
};
</script>

<style scoped>
.message-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.message-container::-webkit-scrollbar {
  width: 6px;
}

.message-container::-webkit-scrollbar-track {
  background: transparent;
}

.message-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>