import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ajax from '@/api/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem('onion_token') || null)
  const userNo = ref(0)
  const userName = ref('')

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('onion_token', newToken)
  }

  const setUserNo = (newUserNo) => {
    userNo.value = newUserNo
  }

  const setUserName = (newUserName) => {
    userName.value = newUserName
  }

  const login = async (userId, password) => {
    try {
      const response = await ajax.post('/users/login', {
        userId,
        password
      })
      setToken(response.data.jwt)
      setUserNo(response.data.userNo)
      setUserName(response.data.userName)
      router.push('/')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    ajax.post('/users/logout').then(_res=> {
      token.value = null
      localStorage.removeItem('onion_token')
      router.push('/login')
    })
  }

  return {
    token,
    userNo,
    userName,
    isAuthenticated,
    login,
    logout
  }
})
