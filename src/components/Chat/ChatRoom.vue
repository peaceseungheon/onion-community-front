<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" 
           class="flex flex-col" 
           :class="message.isMine ? 'items-end' : 'items-start'">
        <div class="max-w-[70%] break-words rounded-lg p-3"
             :class="message.isMine ? 'bg-blue-500 text-white' : 'bg-gray-200'">
          <p class="text-sm">{{ message.text }}</p>
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
import { connect, disconnect, chat } from '@/utils/websocket';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Message {
  text: string;
  isMine: boolean;
  timestamp: number;
}

const newMessage = ref<string>('');
const messages = ref<Message[]>([]);
const messageContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
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
  chat(newMessage.value);
  messages.value.push({
    text: newMessage.value,
    isMine: true,
    timestamp: Date.now(),
  });
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