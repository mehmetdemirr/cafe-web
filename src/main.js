import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import appAxiosClient from './utils/axios'
import './index.css'

const app = createApp(App)

app.provide('appAxios', appAxiosClient)

app.use(createPinia())
app.use(router)

app.mount('#app')
