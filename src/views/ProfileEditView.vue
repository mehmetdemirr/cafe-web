<template>
  <div class="bg-gray-900 min-h-screen flex flex-col items-center py-8">
    <h1 class="text-4xl font-serif text-yellow-600 mb-4">İşletme Profilini Düzenle</h1>
    <form @submit.prevent="updateProfile" class="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-200 mb-1">İşletme Adı</label>
        <input
          v-model="profile.name"
          type="text"
          id="name"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="İşletme adını girin"
        />
      </div>
      <div class="mb-4">
        <label for="slug" class="block text-gray-200 mb-1">Slug</label>
        <input
          v-model="profile.slug"
          type="text"
          id="slug"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Slug girin"
        />
      </div>
      <div class="mb-4">
        <label for="address" class="block text-gray-200 mb-1">Adres</label>
        <input
          v-model="profile.address"
          type="text"
          id="address"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Adresinizi girin"
        />
      </div>
      <div class="mb-4">
        <label for="phone_number" class="block text-gray-200 mb-1">Telefon Numarası</label>
        <input
          v-model="profile.phone_number"
          type="tel"
          id="phone_number"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Telefon numaranızı girin"
        />
      </div>
      <div class="mb-4">
        <label for="website_url" class="block text-gray-200 mb-1"
          >Web Sitesi <span class="text-red-500">*</span></label
        >
        <input
          v-model="profile.website_url"
          type="url"
          id="website_url"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Web site URL'sini girin"
          required
        />
        <!-- Hata mesajı için basit bir kontrol -->
        <p v-if="!profile.website_url && isSubmitted" class="text-red-500 mt-1">
          Web sitesi adresi zorunludur.
        </p>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-200 mb-1">Açıklama</label>
        <textarea
          v-model="profile.description"
          id="description"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="İşletme açıklamasını girin"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="location_latitude" class="block text-gray-200 mb-1">Konum (Enlem)</label>
        <input
          v-model="profile.location_latitude"
          type="number"
          step="any"
          id="location_latitude"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Enlem girin"
        />
      </div>
      <div class="mb-4">
        <label for="location_longitude" class="block text-gray-200 mb-1">Konum (Boylam)</label>
        <input
          v-model="profile.location_longitude"
          type="number"
          step="any"
          id="location_longitude"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Boylam girin"
        />
      </div>
      <div class="mb-4">
        <label for="opening_time" class="block text-gray-200 mb-1">Açılış Saati</label>
        <input
          v-model="profile.opening_time"
          type="time"
          id="opening_time"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Açılış saatini girin"
        />
      </div>
      <div class="mb-4">
        <label for="closing_time" class="block text-gray-200 mb-1">Kapanış Saati</label>
        <input
          v-model="profile.closing_time"
          type="time"
          id="closing_time"
          required
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
          placeholder="Kapanış saatini girin"
        />
      </div>
      <!-- <div class="mb-4">
        <label for="image_url" class="block text-gray-200 mb-1">Profil Resmi Yükle</label>
        <input
          type="file"
          id="image_url"
          @change="handleFileUpload"
          accept="image/*"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-300"
        />
      </div>
      <div v-if="imagePreview" class="mb-4">
        <img :src="imagePreview" alt="Profil Resmi" class="w-full h-32 object-cover rounded" />
      </div> -->
      <button
        type="submit"
        class="w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded transition-colors duration-300 hover:bg-yellow-600"
      >
        Profili Güncelle
      </button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import appAxiosClient from '../utils/axios'
import Swal from 'sweetalert2'

const profile = ref({
  name: '',
  slug: '',
  address: '',
  phone_number: '',
  website_url: '',
  description: '',
  location_latitude: '',
  location_longitude: '',
  opening_time: '',
  closing_time: '',
  image_url: null
})
const successMessage = ref('')
const imagePreview = ref('')

// const handleFileUpload = (event) => {
//   const file = event.target.files[0]

//   if (file && file.size > 2048 * 1024) {
//     alert("Resim dosyası 2MB'yi geçemez.")
//     profile.value.image_url = null
//     return
//   }

//   if (
//     file &&
//     (file.type === 'image/jpeg' ||
//       file.type === 'image/png' ||
//       file.type === 'image/jpg' ||
//       file.type === 'image/gif')
//   ) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       imagePreview.value = e.target.result
//     }
//     reader.readAsDataURL(file)
//     profile.value.image_url = file
//   } else {
//     alert('Lütfen jpeg, png, jpg veya gif formatında bir resim dosyası seçin.')
//     profile.value.image_url = null
//   }
// }

const updateProfile = async () => {
  const formData = new FormData()
  formData.append('name', profile.value.name)
  formData.append('slug', profile.value.slug)
  formData.append('address', profile.value.address)
  formData.append('phone_number', profile.value.phone_number)
  formData.append('website_url', profile.value.website_url)
  formData.append('description', profile.value.description)
  formData.append('location_latitude', profile.value.location_latitude)
  formData.append('location_longitude', profile.value.location_longitude)
  formData.append('opening_time', profile.value.opening_time)
  formData.append('closing_time', profile.value.closing_time)

  //   if (profile.value.image_url) {
  //     formData.append('image_url', profile.value.image_url)
  //   }

  try {
    const response = await appAxiosClient.put('/business', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
    })

    if (response.data.success) {
      successMessage.value = 'Profil başarıyla güncellendi!'
      Swal.fire({
        title: 'Başarılı!',
        text: 'Profil başarıyla güncellendi!',
        icon: 'success',
        confirmButtonText: 'Tamam'
      })
    } else {
      alert(response.data.message || 'Bir hata oluştu.')
    }
  } catch (error) {
    console.error('Profil güncellenirken hata:', error)
    alert('Bir hata oluştu.')
  }
}

onMounted(async () => {
  try {
    const response = await appAxiosClient.get('/business')
    console.log(response)

    if (response.data) {
      profile.value = response.data.data
      if (response.data.image_url) {
        imagePreview.value = response.data.image_url
      }
    } else {
      console.error('Profil bilgileri alınamadı.')
    }
  } catch (error) {
    console.error('Profil bilgileri alınırken hata:', error)
  }
})
</script>
