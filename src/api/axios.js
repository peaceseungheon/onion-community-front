import axios from 'axios'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 서버 기본 주소
  timeout: 10000, // 요청 제한시간: 10초
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 보내기 전 수행할 작업
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공
    return response
  },
  (error) => {
    // 오류 응답 처리
    if (error.response) {
      switch (error.response.status) {
        case 401: // 인증 실패
          // 로그인 페이지로 리다이렉트 등의 작업 수행
          break
        case 403: // 권한 없음
          break
        case 404: // 리소스 없음
          break
        default:
          console.error('API 오류:', error.response)
      }
    }
    return Promise.reject(error)
  }
)

export default api
