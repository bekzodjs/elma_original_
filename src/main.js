import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import { i18nDirective } from './i18n'

import Home from './views/Home.vue'
import Catalog from './views/Catalog.vue'
import Product from './views/Product.vue'
import About from './views/About.vue'
import Horeca from './views/Horeca.vue'
import News from './views/News.vue'
import Partnership from './views/Partnership.vue'
import Contact from './views/Contact.vue'
import FAQ from './views/FAQ.vue'
import AdminLogin from './views/AdminLogin.vue'
import Admin from './views/Admin.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/catalog', component: Catalog },
    { path: '/product/:id', component: Product },
    { path: '/about', component: About },
    { path: '/horeca', component: Horeca },
    { path: '/news', component: News },
    { path: '/partnership', component: Partnership },
    { path: '/contact', component: Contact },
    { path: '/faq', component: FAQ },
    { path: '/admin/login', component: AdminLogin },
    { path: '/admin', component: Admin, meta: { admin: true } },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach((to) => {
  if (to.meta.admin && localStorage.getItem('elma_admin') !== '1') return '/admin/login'
})

createApp(App).use(createPinia()).use(router).directive('i18n', i18nDirective).mount('#app')
