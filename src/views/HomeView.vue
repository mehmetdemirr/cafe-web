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
