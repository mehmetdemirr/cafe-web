import axios from 'axios'

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

// appAxiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API hatası:', error);
//     return Promise.reject(error);
//   }
// );

export default appAxiosClient
