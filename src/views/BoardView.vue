<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ajax from '@/api/axios'
import { useAuthStore } from '../stores/auth';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore();

const boards = ref([])
const selectedBoard = ref(null)
const articles = ref([])

const isAuthor = (article) => {
  return authStore.userNo === article.authorNo
}

const fetchBoards = async () => {
  try {
    const response = await ajax.get('/boards')
    boards.value = response.data
    // 첫 번째 게시판을 기본값으로 선택
    if (boards.value.length > 0 && !selectedBoard.value) {
      selectBoard(boards.value[0])
    }
  } catch (error) {
    console.error('Failed to fetch boards:', error)
  }
}

const fetchArticles = async (boardId) => {
  try {
    const response = await ajax.get(`/boards/${boardId}/articles`)
    articles.value = response.data
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  }
}

const selectBoard = (board) => {
  selectedBoard.value = board
  router.push({
    name: 'board',
    query: { boardId: board.id }
  })
  fetchArticles(board.id)
}

onMounted(() => {
  fetchBoards()
})
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto min-h-screen bg-white p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">게시판</h2>
        <button @click="$router.push({ name: 'createPost', params: { boardId: selectedBoard?.id } })"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          글쓰기
        </button>
      </div>

      <!-- 게시판 탭 -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex -mb-px">
          <button v-for="board in boards" :key="board.id" @click="selectBoard(board)"
            class="py-4 px-6 border-b-2 font-medium text-sm" :class="[
              selectedBoard?.id === board.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]">
            {{ board.title }}
          </button>
        </nav>
      </div>

      <!-- 게시글 목록 -->
      <div v-if="articles.length > 0" class="space-y-4">
        <div v-for="article in articles" :key="article.id" class="border-b border-gray-200 pb-4">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium">{{ article.title }}</h3>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" v-if="isAuthor(article)"
              @click="$router.push({ name: 'editPost', params: { boardId: selectedBoard?.id, articleId: article.id } })">수정</button>
          </div>

          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <span>작성자: {{ article.authorName }}</span>
            <span>{{ article.createDate }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-8">
        게시글이 없습니다.
      </div>
    </div>
  </div>
</template>
