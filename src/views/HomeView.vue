<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black relative">
    <!-- Giriş Butonu -->
    <router-link
      to="/auth/b/login"
      class="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
    >
      İşletme Girişi
    </router-link>

    <!-- İçerik Alanı -->
    <div class="flex-grow flex flex-col items-center justify-center text-center p-4">
      <!-- Uygulama İsmi -->
      <h1 class="text-4xl md:text-7xl text-white font-bold tracking-wide font-sans uppercase">
        {{ title }}
      </h1>

      <!-- Alt Başlık: Kafe Buluşmaları -->
      <p class="mt-4 text-2xl md:text-4xl text-gray-400 font-light tracking-wide">
        {{ subtitle }}
      </p>

      <!-- Uygulama Açıklaması -->
      <p class="mt-6 text-lg md:text-2xl text-gray-400 font-light tracking-wide max-w-3xl">
        {{ description }}
      </p>

      <!-- İkonlu Özellikler -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div class="flex flex-col items-center">
          <div class="bg-gray-800 p-4 rounded-full">
            <span class="text-white text-4xl">☕</span>
          </div>
          <p class="mt-4 text-lg md:text-xl text-white font-medium">Kafeni Favorilere Ekle</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="bg-gray-800 p-4 rounded-full">
            <span class="text-white text-4xl">❤️</span>
          </div>
          <p class="mt-4 text-lg md:text-xl text-white font-medium">Favori Kafelerde Eşleş</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="bg-gray-800 p-4 rounded-full">
            <span class="text-white text-4xl">📱</span>
          </div>
          <p class="mt-4 text-lg md:text-xl text-white font-medium">QR Kodu ile Hızlı Menü</p>
        </div>
      </div>

      <!-- Yeni İndirme Butonları -->
      <div
        class="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          class="flex items-center px-6 py-3 bg-white bg-opacity-10 text-white border border-white border-opacity-50 rounded-lg transition duration-300 hover:bg-opacity-20"
        >
          <svg class="h-8 w-8 mr-3" viewBox="0 0 384 512" fill="currentColor">
            <path
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            />
          </svg>
          <div class="flex flex-col items-start">
            <span class="text-xs">Download on the</span>
            <span class="text-lg font-semibold">App Store</span>
          </div>
        </a>

        <a
          href="https://play.google.com/store/apps"
          target="_blank"
          class="flex items-center px-6 py-3 bg-white bg-opacity-10 text-white border border-white border-opacity-50 rounded-lg transition duration-300 hover:bg-opacity-20"
        >
          <svg class="h-8 w-8 mr-3" viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
            />
          </svg>
          <div class="flex flex-col items-start">
            <span class="text-xs">GET IT ON</span>
            <span class="text-lg font-semibold">Google Play</span>
          </div>
        </a>
      </div>
    </div>

    <!-- Alt metin (footer) -->
    <div class="mt-auto text-gray-500 text-sm py-4 text-center">
      {{ footerText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dinamik veriler
const title = ref('Fıtı Fıtı App')
const subtitle = ref('Kafe Buluşmaları')
const description = ref(
  'Favori kafeni seç, arkadaşlarını bul ve birlikte kafenin tadını çıkar. QR kod ile menüye göz at, hemen sipariş ver.'
)
const footerText = ref('© 2024 Fıtı Fıtı App - Kafe Arkadaşlığını Keşfet!')
</script>

<style scoped>
/* Modern ve estetik fontlar için */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&family=Playfair+Display:wght@400;600&display=swap');

h1 {
  font-family: 'Roboto', sans-serif;
}

p,
.text-lg,
.text-xl {
  font-family: 'Playfair Display', serif;
}
</style>
