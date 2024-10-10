<template>
  <div class="bg-gray-900 min-h-screen flex flex-col items-center py-8">
    <h1 class="text-4xl font-serif text-yellow-600 mb-4">Ürün Güncelle</h1>
    <form @submit.prevent="updateProduct" class="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-200 mb-1">Ürün Adı</label>
        <input
          v-model="product.name"
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
          v-model="product.price"
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
          v-model="product.description"
          id="description"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Ürün açıklamasını girin"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-gray-200 mb-1">Kategori</label>
        <select
          v-model="product.menu_category_id"
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
        Ürünü Güncelle
      </button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import appAxiosClient from '../utils/axios'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const categories = ref([]) // Kategorileri saklamak için reaktif değişken
const product = ref({
  name: '',
  price: null,
  description: '',
  menu_category_id: '',
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

// Mevcut ürünü API'den çekmek için fonksiyon
const fetchProduct = async () => {
  const productId = route.params.id // URL parametrelerinden ürün ID'sini al
  try {
    const response = await appAxiosClient.get(`/menu-items/${productId}`)
    product.value = response.data.data // Ürün verisini ayarla
    imagePreview.value = product.value.image_url // Ürün fotoğrafını önizle
  } catch (error) {
    console.error('Ürün alınırken hata:', error)
    alert('Ürün alınırken bir hata oluştu.')
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (file && file.size > 2048 * 1024) {
    alert("Resim dosyası 2MB'yi geçemez.")
    product.value.image = null // Geçersiz dosya seçildiğinde sıfırla
    return
  }

  if (
    file &&
    (file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif')
  ) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    product.value.image = file
  } else {
    alert('Lütfen jpeg, png, jpg veya gif formatında bir resim dosyası seçin.')
    product.value.image = null
  }
}

const updateProduct = async () => {
  const formData = new FormData()
  formData.append('name', product.value.name)
  formData.append('price', product.value.price)
  formData.append('description', product.value.description)
  formData.append('menu_category_id', product.value.menu_category_id)

  // Dosyayı doğru alan adıyla eklediğimizden emin olalım
  if (product.value.image) {
    formData.append('image_url', product.value.image) // Dosya ekleme
  }

  try {
    const productId = route.params.id // URL parametrelerinden ürün ID'sini al
    const response = await appAxiosClient.post(`/menu-items/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      successMessage.value = 'Ürün başarıyla güncellendi!'
      Swal.fire({
        title: 'Başarılı!',
        text: 'Ürün başarıyla güncellendi!',
        icon: 'success',
        confirmButtonText: 'Tamam'
      })
      router.push({ name: 'products' }) // 'products' sayfasına yönlendir (gerekirse route adını güncelleyin)
    } else {
      alert(response.data.message || 'Bir hata oluştu.')
    }
  } catch (error) {
    console.error('Ürün güncellenirken hata:', error)
    alert('Bir hata oluştu.')
  }
}

// Bileşen yüklendiğinde kategorileri ve ürünü getir
onMounted(() => {
  fetchCategories()
  fetchProduct()
})
</script>

<style scoped>
/* İsteğe bağlı stil ayarları eklenebilir */
</style>
