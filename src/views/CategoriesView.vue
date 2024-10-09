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
          v-for="(category, index) in categories"
          :key="index"
          class="flex items-center justify-between bg-gray-800 p-2 rounded-md"
        >
          <span class="text-white">{{ category }}</span>
          <div>
            <button @click="editCategory(index)" class="text-yellow-400 hover:text-yellow-300 mr-4">
              Düzenle
            </button>
            <button @click="deleteCategory(index)" class="text-red-500 hover:text-red-400">
              Sil
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newCategory = ref('')
const categories = ref([]) // Kategoriler listesini tutacak

const addCategory = () => {
  if (newCategory.value.trim()) {
    categories.value.push(newCategory.value.trim())
    newCategory.value = '' // Formu temizle
  }
}

const editCategory = (index) => {
  const updatedCategory = prompt('Yeni kategori adını girin:', categories.value[index])
  if (updatedCategory) {
    categories.value[index] = updatedCategory
  }
}

const deleteCategory = (index) => {
  if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
    categories.value.splice(index, 1)
  }
}
</script>

<style scoped>
/* İsterseniz özel stiller ekleyebilirsiniz */
</style>
