<template>
<header class="header">
  <div class="topbar">
    <div class="container top-inner">
      <span>{{ t('delivery') }}</span>
      <span>{{ t('call') }}: <a href="tel:+998712031515">+998 71 203 15 15</a></span>
    </div>
  </div>

  <div class="container nav">
    <RouterLink to="/" class="logo">
      <img src="../assets//elma-logo.png" alt="ELMA" class="header-logo-img">
      <small>{{ t('tagline') }}</small>
    </RouterLink>

    <button class="mobile-btn" @click="open=!open">☰</button>

    <nav :class="{open}">
      <RouterLink to="/catalog">{{ t('catalog') }}</RouterLink>
      <RouterLink to="/about">{{ t('company') }}</RouterLink>
      <RouterLink to="/horeca">HoReCa</RouterLink>
      <RouterLink to="/news">{{ t('news') }}</RouterLink>
      <RouterLink to="/partnership">{{ t('partnership') }}</RouterLink>
      <RouterLink to="/faq">{{ t('faq') }}</RouterLink>
      <RouterLink to="/contact">{{ t('contact') }}</RouterLink>
    </nav>

    <div class="nav-actions">
      <button class="lang-switch" @click="changeLang">
        <span>{{ store.lang.toUpperCase() }}</span>
        <span class="chevron">⌄</span>
      </button>
      <RouterLink to="/catalog" class="search-btn" aria-label="Search">⌕</RouterLink>
    </div>
  </div>
</header>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from '../stores/main'

const store = useMainStore()
const open = ref(false)

const labels = {
  uz: {
    delivery: "O‘zbekiston bo‘ylab yetkazib berish",
    call: "Call-center",
    tagline: "HAR KUN UCHUN",
    catalog: "Katalog",
    company: "Kompaniya",
    news: "Yangiliklar",
    partnership: "Hamkorlik",
    faq: "FAQ",
    contact: "Aloqa"
  },
  ru: {
    delivery: "Доставка по всему Узбекистану",
    call: "Call-center",
    tagline: "НА КАЖДЫЙ ДЕНЬ",
    catalog: "Каталог",
    company: "Компания",
    news: "Новости",
    partnership: "Партнёрство",
    faq: "FAQ",
    contact: "Контакты"
  }
}

function t(key) {
  return labels[store.lang]?.[key] || labels.uz[key]
}

function changeLang() {
  store.setLang(store.lang === 'uz' ? 'ru' : 'uz')
}
</script>

<style scoped>
.lang-switch{
  border:1px solid var(--line);
  background:#fff;
  border-radius:12px;
  height:40px;
  min-width:72px;
  padding:0 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  color:var(--ink);
  font-weight:800;
  font-size:12px;
}
.lang-switch:hover{
  border-color:#acd5c2;
  color:var(--green);
  transform:translateY(-1px);
}
.chevron{font-size:15px;line-height:1}
.dark .lang-switch{background:#18211e;color:#edf5f0;border-color:#2a3932}
</style>

<style scoped>
.header-logo-img{width:108px;height:48px;object-fit:contain;object-position:center;background:#fff;border-radius:10px}
.logo{gap:0}
@media(max-width:900px){.header-logo-img{width:92px;height:42px}.nav nav{gap:18px}}
</style>
