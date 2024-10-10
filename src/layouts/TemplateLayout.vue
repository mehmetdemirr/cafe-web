<template>
  <div class="flex min-h-screen bg-gray-900">
    <!-- Sol Menü -->
    <nav class="w-64 bg-gray-800 p-4">
      <h1 class="text-white text-2xl font-bold mb-6">Fıtı Fıtı</h1>
      <ul>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showProfileMenu = ref(false)

// Menü toggle fonksiyonu
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

// Profil düzenleme işlemi
const editProfile = () => {
  console.log('Profil düzenle')
}

// Çıkış yapma işlemi
const logout = () => {
  localStorage.removeItem('authToken')
  router.push({ name: 'home' })
}

// Sayfanın herhangi bir yerine tıklandığında menüyü kapat
const handleOutsideClick = (event) => {
  // Eğer tıklanan yer menünün kendisi değilse menüyü kapat
  if (!event.target.closest('.relative')) {
    showProfileMenu.value = false
  }
}

// Mounted olduğunda document'e click event'i ekle
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

// Component unmounted olduğunda event listener'ı kaldır
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
/* İsterseniz özel stiller ekleyebilirsiniz */
</style>
