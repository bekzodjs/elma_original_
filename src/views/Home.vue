<template>
<div>
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">ELMA • 2000 — 2026</span>
      <h1>Har kuni uchun<br><em>tozalik.</em></h1>
      <p>Uy, biznes va HoReCa uchun sifatli gigiyena mahsulotlari. Kundalik qulaylikni professional sifat bilan birlashtiramiz.</p>
      <div class="hero-actions"><RouterLink to="/catalog" class="btn btn-primary">Katalogni ko‘rish →</RouterLink><RouterLink to="/about" class="btn btn-light">Biz haqimizda</RouterLink></div>
      <div class="hero-stats"><div><b>25+</b><span>yil tajriba</span></div><div><b>50+</b><span>mahsulot</span></div><div><b>6</b><span>mamlakat</span></div></div>
    </div>
    <div class="hero-visual">
      <div class="orb"></div><div class="hero-pack"><div class="pack-brand">ELMA</div><div class="pack-big">V</div><div class="pack-hero-text">PREMIUM<br>NAPKINS</div></div>
      <div class="floating-card"><b>100%</b><span>sifat nazorati</span></div>
    </div>
  </div>
</section>

<section class="section">
 <div class="container">
  <div class="section-head"><div><span class="eyebrow">Mahsulotlar</span><h2>Sizga kerak bo‘lgan<br><em>hamma narsa.</em></h2></div><RouterLink to="/catalog" class="text-link">Barcha katalog →</RouterLink></div>
  <div class="category-grid"><RouterLink v-for="c in categories" :key="c.id" :to="`/catalog?cat=${c.id}`" class="category-card"><span class="category-icon">{{c.icon}}</span><div><h3>{{c.title}}</h3><p>{{c.text}}</p></div><span class="arrow">↗</span></RouterLink></div>
 </div>
</section>

<section class="section soft">
 <div class="container">
  <div class="section-head"><div><span class="eyebrow">Tanlangan</span><h2>Ommabop <em>mahsulotlar</em></h2></div><RouterLink to="/catalog" class="text-link">Barchasini ko‘rish →</RouterLink></div>
  <div class="product-grid"><ProductCard v-for="p in store.products.slice(0,4)" :key="p.id" :product="p"/></div>
 </div>
</section>

<section class="split-section">
 <div class="split-image horeca-visual"><div class="mini-logo">ELMA</div><span>HoReCa</span></div>
 <div class="split-copy"><span class="eyebrow">Biznes uchun</span><h2>Brendingizni <em>stolda</em> namoyish qiling.</h2><p>Restoran, mehmonxona va kafelar uchun logotip tushirilgan nam va quruq salfetkalar. Sifatli mahsulot — kuchli taassurot.</p><RouterLink to="/horeca" class="btn btn-dark">HoReCa yechimlari →</RouterLink></div>
</section>

<section class="section">
 <div class="container"><div class="trust-grid">
  <div class="trust-item"><span>◈</span><h3>Sifat kafolati</h3><p>Yuqori sifatli xomashyo va nazorat.</p></div>
  <div class="trust-item"><span>⌁</span><h3>Yetkazib berish</h3><p>O‘zbekiston bo‘ylab qulay logistika.</p></div>
  <div class="trust-item"><span>◉</span><h3>Qo‘llab-quvvatlash</h3><p>Mutaxassislarimiz sizga yordam beradi.</p></div>
  <div class="trust-item"><span>✦</span><h3>Professional yechim</h3><p>Uy va biznes uchun mos assortiment.</p></div>
 </div></div>
</section>

<section class="numbers"><div class="container numbers-grid"><div><b>25+</b><span>yil bozorda</span></div><div><b>50+</b><span>mahsulot</span></div><div><b>1000+</b><span>savdo nuqtasi</span></div><div><b>6</b><span>hamkor mamlakat</span></div></div></section>

<section class="section">
 <div class="container"><div class="section-head"><div><span class="eyebrow">Yangiliklar</span><h2>ELMA <em>yangiliklari</em></h2></div><RouterLink to="/news" class="text-link">Barcha yangiliklar →</RouterLink></div>
 <div class="news-grid"><article v-for="n in store.news.slice(0,3)" :key="n.id" class="news-card"><div class="news-date">{{formatDate(n.date)}}</div><h3>{{n.title}}</h3><p>{{n.text}}</p><RouterLink to="/news">O‘qish →</RouterLink></article></div></div>
</section>

<section class="cta"><div class="container cta-inner"><div><span class="eyebrow">Hamkorlik</span><h2>Birga <em>o‘saylik.</em></h2><p>ELMA bilan biznesingiz uchun ishonchli gigiyena hamkorini tanlang.</p></div><RouterLink to="/partnership" class="btn btn-primary">Hamkor bo‘lish →</RouterLink></div></section>
</div>
</template>
<script setup>
import { useMainStore } from '../stores/main'
import { categories } from '../data/data'
import ProductCard from '../components/ProductCard.vue'
const store=useMainStore()
const formatDate=(d)=>new Date(d).toLocaleDateString('uz-UZ',{day:'2-digit',month:'long',year:'numeric'})
</script>
