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
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
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

<script>
import { ref } from 'vue'

export default {
  setup() {
    const categories = ['Starters', 'Salads', 'Specialty']
    const newProduct = ref({
      name: '',
      price: null,
      description: '',
      category: '',
      image: ''
    })
    const successMessage = ref('')
    const imagePreview = ref('')

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
        newProduct.value.image = file.name // veya dosya ile ilgili başka bir işlem yapabilirsiniz
      } else {
        alert('Lütfen bir resim dosyası seçin.')
      }
    }

    const addProduct = () => {
      console.log('Yeni Ürün Eklendi:', newProduct.value)
      successMessage.value = 'Ürün başarıyla eklendi!'
      newProduct.value = {
        name: '',
        price: null,
        description: '',
        category: '',
        image: ''
      }
      imagePreview.value = ''
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    return {
      categories,
      newProduct,
      addProduct,
      successMessage,
      imagePreview,
      handleFileUpload
    }
  }
}
</script>

<style scoped>
/* İsteğe bağlı stil ayarları eklenebilir */
</style>
