import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ajax from '@/api/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('onion_token') || null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('onion_token', newToken)
  }

  const login = async (userId, password) => {
    try {
      const response = await ajax.post('/users/login', {
        userId,
        password
      })
      console.log(response)
      setToken(response.data)
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
    isAuthenticated,
    login,
    logout
  }
})
