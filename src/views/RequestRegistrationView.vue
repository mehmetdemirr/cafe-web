<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <!-- Kayıt Talep Formu -->
    <div class="bg-gray-800 rounded-lg shadow-lg p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-white mb-6">Kayıt Talebi</h2>

      <form @submit.prevent="handleRequest">
        <div class="mb-4">
          <label for="business_name" class="block text-sm font-medium text-gray-300"
            >İşletme Adı</label
          >
          <input
            type="text"
            id="business_name"
            v-model="businessName"
            required
            class="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div class="mb-4">
          <label for="contact_name" class="block text-sm font-medium text-gray-300"
            >Yetkili Adı</label
          >
          <input
            type="text"
            id="contact_name"
            v-model="contactName"
            required
            class="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-md transition duration-200"
        >
          Başvur
        </button>
      </form>

      <p class="mt-4 text-center text-gray-400">
        Zaten bir hesabınız var mı?
        <router-link :to="{ name: 'login' }" class="text-blue-500 hover:underline"
          >Giriş</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const businessName = ref('')
const contactName = ref('')
const email = ref('')

const handleRequest = () => {
  // Kayıt talebi işlemleri burada yapılacak
  console.log('Request submitted:', {
    businessName: businessName.value,
    contactName: contactName.value,
    email: email.value
  })
}
</script>

<style scoped>
/* Responsive ve modern bir tasarım için ek stiller */
</style>
