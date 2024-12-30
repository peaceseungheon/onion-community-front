<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto min-h-screen bg-white p-6">
      <h2 class="text-2xl font-bold mb-6">글 수정</h2>
      
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
            수정
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor from '@/components/Editor.vue'
import ajax from '@/api/axios'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')

// 기존 게시글 데이터 불러오기
const fetchArticle = async () => {
  try {
    const response = await ajax.get(`/boards/${route.params.boardId}/articles/${route.params.articleId}`)
    title.value = response.data.title
    content.value = response.data.content
  } catch (error) {
    alert('게시글을 불러오는데 실패했습니다.')
    router.back()
  }
}

const handleSubmit = async () => {
  try {
    await ajax.put(`/boards/${route.params.boardId}/articles/${route.params.articleId}`, {
      title: title.value,
      content: content.value
    })
    router.push(`/board/${route.params.boardId}/article/${route.params.articleId}`)
  } catch (error) {
    alert('게시글 수정에 실패했습니다.')
  }
}

onMounted(() => {
  fetchArticle()
})
</script>
