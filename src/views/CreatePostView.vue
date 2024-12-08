<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto min-h-screen bg-white p-6">
      <h2 class="text-2xl font-bold mb-6">글쓰기</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            id="title"
            v-model="title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
          <Editor v-model="content" />
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            취소
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor from '@/components/Editor.vue'
import ajax from '@/api/axios'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')

const handleSubmit = async () => {
  try {
    await ajax.post(`/boards/${route.params.boardId}/articles`, {
      title: title.value,
      content: content.value
    })
    router.push(`/board`)
  } catch (error) {
    alert('게시글 작성에 실패했습니다.')
  }
}
</script>
