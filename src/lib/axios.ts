import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const ajax = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 서버 기본 주소
  timeout: 10000, // 요청 제한시간: 10초
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// 요청 인터셉터 추가
ajax.interceptors.request.use(
  (config) => {
    const token = cookies.get('onion_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
ajax.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      localStorage.removeItem('onion_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default ajax
