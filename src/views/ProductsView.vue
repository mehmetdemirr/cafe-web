<template>
  <div class="bg-gray-900 min-h-screen flex flex-col">
    <header class="py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div class="flex-grow text-center">
        <h1 class="text-4xl font-serif text-yellow-600">{{ businessName }}</h1>
      </div>
      <!-- Ürün Ekleme Butonu -->
      <button
        @click="$router.push('/products/add')"
        class="bg-green-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-green-600"
      >
        Ürün Ekle
      </button>
    </header>

    <nav class="mb-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <ul class="flex overflow-x-auto space-x-4 justify-start sm:justify-center pl-4 sm:pl-0">
          <li v-for="category in categories" :key="category.id" class="flex-shrink-0">
            <button
              @click="setActiveCategory(category)"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300',
                activeCategory.id === category.id
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-800 text-yellow-500 hover:bg-gray-700'
              ]"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <main class="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="item in filteredItems" :key="item.id" class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img
              :src="item.image_url || 'https://via.placeholder.com/150'"
              :alt="item.name"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
            />
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center">
              <h3 class="text-xl font-medium text-white">{{ item.name }}</h3>
              <div class="flex-grow mx-4 border-b border-dotted border-gray-600"></div>
              <span class="text-xl font-medium text-yellow-500">₺{{ item.price }}</span>
            </div>
            <p class="text-gray-400 mt-1">{{ item.description }}</p>
            <div class="flex space-x-2 mt-2">
              <!-- Düzenle ve Sil Butonları -->
              <button
                @click="editItem(item)"
                class="bg-yellow-500 text-gray-900 px-2 py-1 rounded transition-colors duration-300 hover:bg-yellow-600"
              >
                Düzenle
              </button>
              <button
                @click="deleteItem(item.id)"
                class="bg-red-500 text-white px-2 py-1 rounded transition-colors duration-300 hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="fixed bottom-4 right-4">
      <button
        @click="scrollToTop"
        class="bg-yellow-500 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import appAxiosClient from '../utils/axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const categories = ref([])
const menuItems = ref([])
const activeCategory = ref(null)
const businessName = ref('')

// API'den kategorileri çek
const fetchCategories = async () => {
  try {
    const response = await appAxiosClient.get(`/menu-categories`)
    categories.value = response.data.data
    if (categories.value.length) {
      activeCategory.value = categories.value[0] // İlk kategoriyi varsayılan seç
    }
  } catch (error) {
    console.error('Kategoriler alınırken hata oluştu:', error)
  }
}

// API'den menü öğelerini çek
const fetchMenuItems = async (categoryId) => {
  try {
    const response = await appAxiosClient.get(`/menu-items/category/${categoryId}`)
    menuItems.value = response.data.data
  } catch (error) {
    console.error('Menü öğeleri alınırken hata oluştu:', error)
  }
}

const setActiveCategory = (category) => {
  activeCategory.value = category
  fetchMenuItems(category.id) // Kategori seçildiğinde menü öğelerini getir
}

const filteredItems = computed(() => {
  return activeCategory.value
    ? menuItems.value.filter((item) => item.menu_category_id === activeCategory.value.id)
    : []
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Ürün düzenleme işlemi
const editItem = (item) => {
  router.push(`/products/edit/${item.id}`)
}

// Ürün silme işlemi
const deleteItem = async (itemId) => {
  // Silme onayı için SweetAlert
  const result = await Swal.fire({
    title: 'Silmek İstediğinize Emin Misiniz?',
    text: 'Bu işlem geri alınamaz!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'Hayır, İptal Et!'
  })

  // Kullanıcı onay verdiyse silme işlemini gerçekleştir
  if (result.isConfirmed) {
    try {
      await appAxiosClient.delete(`/menu-items/${itemId}`)
      menuItems.value = menuItems.value.filter((item) => item.id !== itemId)

      // Silme işlemi başarılı olduğunda kullanıcıya bilgi ver
      Swal.fire({
        title: 'Başarılı!',
        text: 'Ürün başarıyla silindi!',
        icon: 'success',
        confirmButtonText: 'Tamam'
      })
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error)
      Swal.fire({
        title: 'Hata!',
        text: 'Ürün silinemedi. Lütfen tekrar deneyin.',
        icon: 'error',
        confirmButtonText: 'Tamam'
      })
    }
  }
}

onMounted(async () => {
  await fetchCategories()
  if (activeCategory.value) {
    await fetchMenuItems(activeCategory.value.id)
  }
})
</script>

<style scoped>
/* Ek stil düzenlemeleri */
</style>
