<template>
  <div class="bg-gray-900 min-h-screen flex flex-col items-center py-8">
    <h1 class="text-4xl font-serif text-yellow-600 mb-4">Ürün Ekle</h1>
    <form @submit.prevent="addProduct" class="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-200 mb-1">Ürün Adı</label>
        <input
          v-model="newProduct.name"
          type="text"
          id="name"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Ürün adını girin"
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-200 mb-1">Fiyat</label>
        <input
          v-model="newProduct.price"
          type="number"
          id="price"
          required
          step="0.01"
          min="0"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Fiyatı girin"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-200 mb-1">Açıklama</label>
        <textarea
          v-model="newProduct.description"
          id="description"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Ürün açıklamasını girin"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-gray-200 mb-1">Kategori</label>
        <select
          v-model="newProduct.category"
          id="category"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
        >
          <option value="" disabled>Sadece bir kategori seçin</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-gray-200 mb-1">Ürün Fotoğraf Yükle</label>
        <input
          type="file"
          id="image"
          @change="handleFileUpload"
          accept="image/*"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
        />
      </div>
      <div v-if="imagePreview" class="mb-4">
        <img :src="imagePreview" alt="Seçilen Resim" class="w-full h-32 object-cover rounded" />
      </div>
      <button
        type="submit"
        class="w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded transition-colors duration-300 hover:bg-yellow-600"
      >
        Ürünü Ekle
      </button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import appAxiosClient from '../utils/axios'

const categories = ref([]) // Kategorileri saklamak için reaktif değişken
const newProduct = ref({
  name: '',
  price: null,
  description: '',
  category: '',
  image: null
})
const successMessage = ref('')
const imagePreview = ref('')

// Kategorileri API'den çekmek için fonksiyon
const fetchCategories = async () => {
  try {
    const response = await appAxiosClient.get('/menu-categories') // Kategorileri çekerken doğru API'yi kullan
    categories.value = response.data.data // Kategorileri ayarla
  } catch (error) {
    console.error('Kategorileri çekerken hata:', error)
    alert('Kategoriler alınırken bir hata oluştu.')
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    newProduct.value.image = file
  } else {
    alert('Lütfen bir resim dosyası seçin.')
  }
}

const addProduct = async () => {
  const formData = new FormData()
  formData.append('name', newProduct.value.name)
  formData.append('price', newProduct.value.price)
  formData.append('description', newProduct.value.description)
  formData.append('menu_category_id', newProduct.value.category)
  formData.append('image', newProduct.value.image)

  try {
    const response = await appAxiosClient.post('/menu-items', formData) // Ortak axios client ile post işlemi
    if (response.data.success) {
      successMessage.value = 'Ürün başarıyla eklendi!'
      newProduct.value = {
        name: '',
        price: null,
        description: '',
        category: '',
        image: null
      }
      imagePreview.value = ''
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      alert(response.data.message || 'Bir hata oluştu.')
    }
  } catch (error) {
    console.error('Ürün eklenirken hata:', error)
    alert('Bir hata oluştu.')
  }
}

// Bileşen yüklendiğinde kategorileri getir
onMounted(fetchCategories)
</script>

<style scoped>
/* İsteğe bağlı stil ayarları eklenebilir */
</style>
