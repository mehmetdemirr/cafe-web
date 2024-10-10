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
          path: '/products/edit/:id',
          name: 'productUpdate',
          component: () => import('../views/ProductUpdateView.vue'),
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
        },
        {
          path: '/profile-edit',
          name: 'profileEdit',
          component: () => import('../views/ProfileEditView.vue'),
          meta: { layout: TemplateLayout }
        }
      ]
    },
    {
      path: '/b/:slug',
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
    },
    {
      path: '/not-found/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// Navigation Guard ile token ve role kontrolü
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  // Eğer token gerekmeyen rotalardaysa, doğrudan geçiş yap
  if (to.name === 'menu' || to.name == 'NotFound') {
    return next()
  }
  // Eğer token yoksa login veya register sayfasına yönlendirme
  if (!token) {
    if (to.name === 'login' || to.name === 'registerRequest' || to.name === 'home') {
      return next()
    }
    return next({ name: 'login' })
  }

  // Eğer token varsa ve login, register veya company-register sayfasındaysak ana sayfaya yönlendir
  if (token && (to.name === 'login' || to.name === 'registerRequest')) {
    return next({ name: 'products' })
  }

  // Ana sayfa yönlendirmesi için token ve rol kontrolü
  if (to.path === '/') {
    if (token) {
      return next({ name: 'products' })
    } else {
      return next({ name: 'home' })
    }
  }

  // Eğer role ve token uyumluysa, yönlendirmeye devam et
  next()
})

export default router
