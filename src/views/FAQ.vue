<template>
<div class="page">
  <div class="page-hero faq-hero"><div class="container"><span class="eyebrow">Savol-javob</span><h1>FAQ</h1><p>ELMA mahsulotlari, narxlar, eksport va buyurtmalar haqida eng ko‘p beriladigan savollar.</p></div></div>
  <section class="section">
    <div class="container faq-layout">
      <div class="faq-side">
        <img src="../assets//elma-logo.png" alt="ELMA" class="faq-logo">
        <h3>Savolingiz bormi?</h3>
        <p>Javobni topa olmasangiz, biz bilan bog‘laning.</p>
        <RouterLink to="/contact" class="btn btn-primary">Bog‘lanish →</RouterLink>
      </div>
      <div class="faq-list">
        <div v-for="(item,i) in items" :key="i" class="faq-item" :class="{open:open===i}">
          <button @click="open=open===i?null:i"><span>{{item.q}}</span><b>{{open===i?'−':'+'}}</b></button>
          <div v-if="open===i" class="faq-answer">{{item.a}}</div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script setup>
import { ref } from 'vue'
const open=ref(0)
const items=[
 {q:"Uyda foydalanish uchun bizdan to‘g‘ridan-to‘g‘ri sotib olsa bo‘ladimi?",a:"Mahsulotlarimizni mamlakatimizdagi savdo nuqtalaridan xarid qilishingiz mumkin."},
 {q:"MDH davlatlari va boshqalarga mahsulot eksport qilamizmi?",a:"Ha. ELMA mahsulotlari Qozog‘iston, Tojikiston, Turkmaniston, Ozarbayjon va boshqa bozorlarga yetkazib beriladi."},
 {q:"Mahsulot narxi qanday?",a:"Narxlar assortiment va buyurtma hajmiga qarab belgilanadi. Aniq narx uchun savdo vakillarimiz yoki call-markaz bilan bog‘laning."},
 {q:"Bizga xizmat ko‘rsatadigan agentning raqami kerak.",a:"HoReCa va hududingiz bo‘yicha savdo vakili raqamini olish uchun +998 71 203 15 15 raqamiga murojaat qilishingiz mumkin."},
 {q:"Biz brendli salfetkalar qilamizmi?",a:"Ha. Brendlangan quruq salfetka, nam salfetka va qutili quruq salfetkalar buyurtma asosida tayyorlanishi mumkin."},
 {q:"Nima uchun hojatxona qog‘ozlari yupqa va yumshoq bo‘lib qoldi?",a:"Yangi texnologiyalar va yuqori sifatli uskunalar yordamida mahsulot yumshoqligi yaxshilandi. Bu sifat pasayganini anglatmaydi."},
 {q:"Elma turk kompaniyasimi?",a:"Yo‘q. ELMA — O‘zbekistonda faoliyat boshlagan mahalliy kompaniya brendi. ELMA nomi turk tilida “olma” ma’nosini anglatadi."}
]
</script>
