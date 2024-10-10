<template>
  <div class="bg-gray-900 p-6 rounded-lg">
    <h2 class="text-2xl font-bold text-white mb-4">Kategoriler</h2>

    <!-- Yeni Kategori Ekleme Formu -->
    <form @submit.prevent="addCategory" class="mb-6">
      <div class="flex items-center">
        <input
          type="text"
          v-model="newCategory"
          placeholder="Yeni kategori adı"
          required
          class="flex-1 px-4 py-2 rounded-l-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-r-md transition duration-200"
        >
          Ekle
        </button>
      </div>
    </form>

    <!-- Kategori Listesi -->
    <div>
      <h3 class="text-xl font-semibold text-gray-300 mb-2">Mevcut Kategoriler</h3>
      <ul class="space-y-2">
        <li
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between bg-gray-800 p-2 rounded-md"
        >
          <span class="text-white">{{ category.name }}</span>
          <div>
            <button
              @click="editCategory(category)"
              class="text-yellow-400 hover:text-yellow-300 mr-4"
            >
              Düzenle
            </button>
            <button @click="deleteCategory(category.id)" class="text-red-500 hover:text-red-400">
              Sil
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import appAxiosClient from '../utils/axios'
import Swal from 'sweetalert2'

const newCategory = ref('')
const categories = ref([])

// Kategorileri API'den al
const fetchCategories = async () => {
  try {
    const response = await appAxiosClient.get('/menu-categories')
    categories.value = response.data.data
  } catch (error) {
    console.error('Kategoriler alınamadı:', error)
  }
}

// Yeni kategori ekle
const addCategory = async () => {
  try {
    const response = await appAxiosClient.post('/menu-categories', {
      name: newCategory.value.trim()
    })
    categories.value.push(response.data.data) // Eklenen kategoriyi listeye ekle
    newCategory.value = '' // Formu temizle
  } catch (error) {
    console.error('Kategori eklenemedi:', error)
  }
}

// Kategori silme işlemi
const deleteCategory = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Bu kategoriyi silmek istediğinize emin misiniz?',
      text: 'Kategoriye eklediğiniz ürünlerin hepsi silinir ve bu işlem geri alınamaz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal'
    })

    if (result.isConfirmed) {
      await appAxiosClient.delete(`/menu-categories/${id}`)
      categories.value = categories.value.filter((category) => category.id !== id)
      Swal.fire('Silindi!', 'Kategori başarıyla silindi.', 'success')
    }
  } catch (error) {
    console.error('Kategori silinemedi:', error)
    Swal.fire('Hata!', 'Kategori silinirken bir hata oluştu.', 'error')
  }
}

// Kategori düzenleme işlemi
const editCategory = async (category) => {
  const { value: updatedCategoryName } = await Swal.fire({
    title: 'Kategoriyi Düzenle',
    input: 'text',
    inputLabel: 'Kategori Adı',
    inputValue: category.name,
    showCancelButton: true,
    confirmButtonText: 'Kaydet',
    cancelButtonText: 'İptal',
    inputValidator: (value) => {
      if (!value) {
        return 'Kategori adı boş olamaz!'
      }
    }
  })

  if (updatedCategoryName) {
    try {
      await appAxiosClient.put(`/menu-categories/${category.id}`, {
        name: updatedCategoryName
      })
      category.name = updatedCategoryName // Listeyi güncelle
      Swal.fire('Başarılı!', 'Kategori başarıyla güncellendi.', 'success')
    } catch (error) {
      console.error('Kategori güncellenemedi:', error)
      Swal.fire('Hata!', 'Kategori güncellenirken bir hata oluştu.', 'error')
    }
  }
}

// Sayfa yüklendiğinde kategorileri al
onMounted(fetchCategories)
</script>

<style scoped>
/* İsterseniz özel stiller ekleyebilirsiniz */
</style>
