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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
            <h3 class="text-lg text-yellow-500">Yıllık</h3>
            <p class="text-3xl text-white">{{ totalViews.yearly }}</p>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-white mb-4">Kategorilere Göre Görüntülenme</h2>
        <table class="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr class="bg-gray-700">
              <th class="text-left py-2 px-4 text-yellow-500">Kategori</th>
              <th class="text-left py-2 px-4 text-yellow-500">Günlük Görüntülenme</th>
              <th class="text-left py-2 px-4 text-yellow-500">Haftalık Görüntülenme</th>
              <th class="text-left py-2 px-4 text-yellow-500">Aylık Görüntülenme</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.name">
              <td class="py-2 px-4 text-gray-300">{{ category.name }}</td>
              <td class="py-2 px-4 text-gray-300">{{ category.dailyViews }}</td>
              <td class="py-2 px-4 text-gray-300">{{ category.weeklyViews }}</td>
              <td class="py-2 px-4 text-gray-300">{{ category.monthlyViews }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  setup() {
    const totalViews = {
      daily: 50,
      weekly: 300,
      monthly: 1200,
      yearly: 14400
    }

    const categories = [
      {
        name: 'Starters',
        dailyViews: 15,
        weeklyViews: 90,
        monthlyViews: 360
      },
      {
        name: 'Salads',
        dailyViews: 10,
        weeklyViews: 60,
        monthlyViews: 240
      },
      {
        name: 'Specialty',
        dailyViews: 20,
        weeklyViews: 120,
        monthlyViews: 480
      },
      {
        name: 'Desserts',
        dailyViews: 5,
        weeklyViews: 30,
        monthlyViews: 120
      }
    ]

    return {
      totalViews,
      categories
    }
  }
}
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
