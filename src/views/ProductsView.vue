<template>
  <div class="bg-gray-900 min-h-screen flex flex-col">
    <header class="py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div class="flex-grow text-center">
        <h1 class="text-4xl font-serif text-yellow-600">Olga's Cafe</h1>
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
      <ul class="flex justify-center space-x-4">
        <li v-for="category in categories" :key="category">
          <button
            @click="setActiveCategory(category)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300',
              activeCategory === category
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-gray-800 text-yellow-500 hover:bg-gray-700'
            ]"
          >
            {{ category }}
          </button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="item in filteredItems" :key="item.id" class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
            />
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center">
              <h3 class="text-xl font-medium text-white">{{ item.name }}</h3>
              <div class="flex-grow mx-4 border-b border-dotted border-gray-600"></div>
              <span class="text-xl font-medium text-yellow-500">${{ item.price.toFixed(2) }}</span>
            </div>
            <p class="text-gray-400 mt-1">{{ item.description }}</p>
            <div class="flex space-x-2 mt-2">
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

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const categories = ['Starters', 'Salads', 'Specialty']
    const activeCategory = ref(categories[0])

    const menuItems = ref([
      {
        id: 1,
        name: 'Lobster Bisque',
        price: 5.95,
        category: 'Starters',
        description: 'Lorem, deren, trataro, filede, nerada',
        image: 'https://picsum.photos/seed/lobster/200'
      },
      {
        id: 2,
        name: 'Bread Barrel',
        price: 6.95,
        category: 'Specialty',
        description: 'Lorem, deren, trataro, filede, nerada',
        image: 'https://picsum.photos/seed/bread/200'
      },
      {
        id: 3,
        name: 'Crab Cake',
        price: 7.95,
        category: 'Starters',
        description: 'A delicate crab cake served on a toasted roll with lettuce and tartar sauce',
        image: 'https://picsum.photos/seed/crab/200'
      },
      {
        id: 4,
        name: 'Caesar Selections',
        price: 8.95,
        category: 'Salads',
        description: 'Lorem, deren, trataro, filede, nerada',
        image: 'https://picsum.photos/seed/caesar/200'
      },
      {
        id: 5,
        name: 'Tuscan Grilled',
        price: 9.95,
        category: 'Specialty',
        description: 'Grilled chicken with provolone, artichoke hearts, and roasted red pesto',
        image: 'https://picsum.photos/seed/tuscan/200'
      },
      {
        id: 6,
        name: 'Mozzarella Stick',
        price: 4.95,
        category: 'Starters',
        description: 'Lorem, deren, trataro, filede, nerada',
        image: 'https://picsum.photos/seed/mozzarella/200'
      },
      {
        id: 7,
        name: 'Greek Salad',
        price: 9.95,
        category: 'Salads',
        description: 'Fresh spinach, crisp romaine, tomatoes, and Greek olives',
        image: 'https://picsum.photos/seed/greek/200'
      },
      {
        id: 8,
        name: 'Spinach Salad',
        price: 9.95,
        category: 'Salads',
        description: 'Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette',
        image: 'https://picsum.photos/seed/spinach/200'
      },
      {
        id: 9,
        name: 'Lobster Roll',
        price: 12.95,
        category: 'Specialty',
        description: 'Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll',
        image: 'https://picsum.photos/seed/lobsterroll/200'
      }
    ])

    const filteredItems = computed(() => {
      return activeCategory.value === 'All'
        ? menuItems.value
        : menuItems.value.filter((item) => item.category === activeCategory.value)
    })

    const setActiveCategory = (category) => {
      activeCategory.value = category
    }

    const addItem = () => {
      // Burada yeni ürün ekleme işlemleri yapılacak
      console.log('Yeni ürün ekle')
    }

    const editItem = (item) => {
      // Burada düzenleme işlemleri yapılacak
      console.log('Düzenle:', item)
    }

    const deleteItem = (itemId) => {
      menuItems.value = menuItems.value.filter((item) => item.id !== itemId)
      console.log('Silindi:', itemId)
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
      categories,
      activeCategory,
      filteredItems,
      setActiveCategory,
      addItem,
      editItem,
      deleteItem,
      scrollToTop
    }
  }
}
</script>

<style scoped>
/* İsteğe bağlı: Burada stil ekleyebilirsiniz */
</style>
