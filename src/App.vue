<template>
  <div :class="['app', {dark: store.isDark}]" v-i18n="store.lang">
    <template v-if="!isAdmin">
      <Header />
      <main><RouterView /></main>
      <Footer />
      <a class="floating-call" href="tel:+998712031515">☎</a>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from './stores/main'
import { i18nDirective } from './i18n'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const store=useMainStore()
const route=useRoute()
const isAdmin=computed(()=>route.path.startsWith('/admin'))
</script>
