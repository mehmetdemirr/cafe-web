<template>
  <div class="bg-gray-900 min-h-screen flex flex-col">
    <header class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center mb-4">
        <h1 class="text-4xl font-serif text-yellow-600 text-center">Raporlar</h1>
      </div>
    </header>

    <main class="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-semibold text-white mb-4">Genel Toplam Görüntülenme</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 class="text-lg text-yellow-500">Günlük</h3>
            <p class="text-3xl text-white">{{ totalViews.daily }}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 class="text-lg text-yellow-500">Haftalık</h3>
            <p class="text-3xl text-white">{{ totalViews.weekly }}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 class="text-lg text-yellow-500">Aylık</h3>
            <p class="text-3xl text-white">{{ totalViews.monthly }}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 class="text-lg text-yellow-500">Toplam</h3>
            <p class="text-3xl text-white">{{ totalViews.total }}</p>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-white mb-4">Kategorilere Göre Görüntülenme</h2>
        <table class="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr class="bg-gray-700">
              <th class="text-left py-2 px-4 text-yellow-500">Kategori</th>
              <th class="text-left py-2 px-4 text-yellow-500">Toplam Görüntülenme</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <td class="py-2 px-4 text-gray-300">{{ category.name }}</td>
              <td class="py-2 px-4 text-gray-300">{{ category.views }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import appAxiosClient from '../utils/axios'

// Total views data
const totalViews = ref({
  daily: 0,
  weekly: 0,
  monthly: 0,
  total: 0
})

// Categories data
const categories = ref([])

// Fetch total views statistics
const fetchTotalViews = async () => {
  try {
    const response = await appAxiosClient.get('/statistics/category-view-stats')
    if (response.data.success) {
      totalViews.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching total views:', error)
  }
}

// Fetch category views statistics
const fetchCategoryViews = async () => {
  try {
    const response = await appAxiosClient.get('/statistics/category-views')
    if (response.data.success) {
      categories.value = response.data.data.map((category) => {
        const name = Object.keys(category)[0] // Kategori ismi
        const views = category[name] // Görüntülenme sayısı
        return { name, views }
      })
    }
  } catch (error) {
    console.error('Error fetching category views:', error)
  }
}

// Fetch data when component is mounted
onMounted(() => {
  fetchTotalViews()
  fetchCategoryViews()
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid #4a5568;
}
</style>
