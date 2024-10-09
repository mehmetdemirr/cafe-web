<template>
  <div class="flex min-h-screen bg-gray-900">
    <!-- Sol Menü -->
    <nav class="w-64 bg-gray-800 p-4">
      <h1 class="text-white text-2xl font-bold mb-6">Fıtı Fıtı</h1>
      <ul>
        <!-- Aktif bağlantının rengini değiştirmek için "exact-active-class" kullanıyoruz -->
        <li class="mt-4">
          <router-link
            to="/categories"
            class="text-gray-400 hover:text-white"
            active-class="font-bold text-white"
          >
            Kategoriler
          </router-link>
        </li>
        <li class="mt-4">
          <router-link
            to="/products"
            class="text-gray-400 hover:text-white"
            active-class="font-bold text-white"
          >
            Ürünler
          </router-link>
        </li>
        <li class="mt-4">
          <router-link
            to="/reports"
            class="text-gray-400 hover:text-white"
            active-class="font-bold text-white"
          >
            Raporlar
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Ana İçerik -->
    <div class="flex-1">
      <!-- Navbar -->
      <header class="bg-gray-800 p-4 flex justify-between items-center">
        <h1 class="text-white text-xl font-bold">İşletme Yönetimi</h1>
        <div class="relative">
          <button @click="toggleProfileMenu" class="flex items-center text-white">
            <img src="https://picsum.photos/200/300" alt="Profile" class="w-8 h-8 rounded-full" />
          </button>
          <div
            v-if="showProfileMenu"
            class="absolute right-0 bg-gray-700 text-white rounded-lg shadow-lg mt-2"
          >
            <ul class="p-2">
              <li class="p-2 hover:bg-gray-600 cursor-pointer" @click="editProfile">
                Profil Düzenle
              </li>
              <li class="p-2 hover:bg-gray-600 cursor-pointer" @click="logout">Çıkış Yap</li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Ana İçerik Alanı -->
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showProfileMenu = ref(false)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const editProfile = () => {
  // Profil düzenleme işlemleri
  console.log('Profil düzenle')
}

const logout = () => {
  // Çıkış yapma işlemleri
  console.log('Çıkış yap')
}
</script>

<style scoped>
/* İsterseniz özel stiller ekleyebilirsiniz */
</style>
