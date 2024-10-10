import axios from 'axios'
import router from '@/router'

const appAxiosClient = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// token ekleme
appAxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Hata yönetimi (401 için logout ve yönlendirme)
appAxiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Kullanıcıyı çıkış yap ve anasayfaya yönlendir
      localStorage.removeItem('authToken') // Token'ı sil
      router.push({ name: 'home' }) // Ana sayfaya yönlendir
    }
    return Promise.reject(error)
  }
)

export default appAxiosClient
