import { defineStore } from 'pinia'
import ajax from '@/api/axios.js'

export const useAuthStore = defineStore('auth', {
  state: ()=> ({
    user: localStorage.getItem('onion_user') ? JSON.parse(localStorage.getItem('onion_user') as string) : {} as any, 
    token: localStorage.getItem('onion_token') || '' as string,
    isAuthenticated: localStorage.getItem('onion_token') ? true : false
  }),

  actions: {
    setToken(newToken:string) {
      this.token = newToken
      localStorage.setItem('onion_token', newToken)
    },
    setUser(user: any){
      this.user = user
      localStorage.setItem('onion_user', JSON.stringify(user))
    },
    async login (userId:string, password:string) {
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
      ajax.post('/users/logout').then((_res: any)=> {
        this.token = ''
        localStorage.removeItem('onion_token')
      })
    }
  }
})
