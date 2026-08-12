<template>
<div class="page">
 <div class="page-hero"><div class="container"><span class="eyebrow">B2B • ELMA</span><h1>Hamkor <em>bo‘laylik.</em></h1><p>Distribyutor, chakana savdo, HoReCa yoki korporativ xaridlar uchun biz bilan bog‘laning.</p></div></div>
 <section class="section"><div class="container partnership-grid"><div><span class="eyebrow">Afzalliklar</span><h2>Biznesingiz uchun <em>ko‘proq.</em></h2><div class="benefit"><b>01</b><div><h3>Kafolatlangan sifat</h3><p>Sinovdan o‘tgan va xalqaro standartlarga mos mahsulotlar.</p></div></div><div class="benefit"><b>02</b><div><h3>Yetkazib berish</h3><p>O‘zbekiston bo‘ylab logistika va qo‘llab-quvvatlash.</p></div></div><div class="benefit"><b>03</b><div><h3>Individual shartlar</h3><p>Biznes hajmi va ehtiyojingizga mos taklif.</p></div></div></div><InquiryModal :show="true" @close="goHome"/></div></section>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import InquiryModal from '../components/InquiryModal.vue'
const router=useRouter(); const goHome=()=>router.push('/')
</script>
