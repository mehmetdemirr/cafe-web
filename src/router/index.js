import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import TemplateLayout from '@/layouts/TemplateLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: { layout: MainLayout }
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('../views/CategoriesView.vue'),
          meta: { layout: TemplateLayout }
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/ProductsView.vue'),
          meta: { layout: TemplateLayout }
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import('../views/ReportView.vue'),
          meta: { layout: TemplateLayout }
        },
        {
          path: '/products/add',
          name: 'productAdd',
          component: () => import('../views/ProductAddView.vue'),
          meta: { layout: TemplateLayout }
        }
      ]
    },
    {
      path: '/b/:business_name',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
      meta: { layout: MainLayout }
    },
    {
      path: '/auth/b/login', // Giriş sayfası
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/auth/b/register-request', // Giriş sayfası
      name: 'registerRequest',
      component: () => import('../views/RequestRegistrationView.vue')
    }
  ]
})

export default router
