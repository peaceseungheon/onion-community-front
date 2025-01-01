import { defineStore } from 'pinia'
import ajax from '@/lib/axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: cookies.get('onion_user') || {} as any,
    token: cookies.get('onion_token') || '' as string,
    isAuthenticated: cookies.get('onion_token') ? true : false
  }),

  actions: {
    setToken(newToken: string) {
      this.token = newToken
      cookies.set('onion_token', newToken)
    },
    setUser(user: any) {
      this.user = user
      cookies.set('onion_user', JSON.stringify(user))
    },
    async login(userId: string, password: string) {
      try {
        const response = await ajax.post('/users/login', {
          userId,
          password
        })
        this.setToken(response.data.jwt)
        this.setUser({
          userNo: response.data.userNo,
          userName: response.data.userName
        })
        this.isAuthenticated = true
      } catch (error) {
        throw error
      }
    },
    logout() {
      ajax.post('/users/logout').then((_res: any) => {
        this.token = ''
        this.user = {}
        cookies.remove('onion_token')
        cookies.remove('onion_user')
        this.isAuthenticated = false
      })
    }
  }
})
