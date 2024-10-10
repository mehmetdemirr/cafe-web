<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <!-- Giriş Formu -->
    <div class="bg-gray-800 rounded-lg shadow-lg p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-white mb-6">Giriş Yap</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-300">E-posta</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-300">Şifre</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-md transition duration-200"
        >
          Giriş Yap
        </button>
      </form>

      <p class="mt-4 text-center text-gray-400">
        Hesabınız yok mu?
        <router-link :to="{ name: 'registerRequest' }" class="text-blue-500 hover:underline"
          >Kayıt Ol</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import appAxiosClient from '../utils/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await appAxiosClient.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    const { success, data, message, errors } = response.data

    if (success && data.roles.includes('business')) {
      // Başarılı giriş
      Swal.fire({
        icon: 'success',
        title: 'Giriş Başarılı',
        text: message,
        timer: 1500,
        showConfirmButton: false
      })

      // Token'ı kaydet
      localStorage.setItem('authToken', data.token)

      // Ana sayfaya yönlendir
      router.push({ name: 'home' })
    } else if (success && data.roles.includes('user')) {
      // Başarısız giriş
      Swal.fire({
        icon: 'error',
        title: 'Giriş Başarısız',
        text: 'Buraya sadece işletmeler giriş yapabilir !'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Giriş Başarısız',
        text: message + errors
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Hata',
      text: 'Bir hata oluştu, lütfen tekrar deneyin.'
    })
    console.error('Login error:', error)
  }
}
</script>

<style scoped>
/* Responsive ve modern bir tasarım için ek stiller */
</style>
