<template>
<div class="page contact-page">
  <div class="contact-map">
    <iframe
      title="ELMA manzil xaritasi"
      src="https://www.google.com/maps?q=41.3455,69.2872&z=14&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
    <a class="map-open" href="https://www.google.com/maps/search/?api=1&query=41.3455,69.2872" target="_blank" rel="noopener">Xaritada ochish ↗</a>
  </div>
  <section class="section contact-section">
    <div class="container contact-layout">
      <div class="contact-info-card">
        <span class="eyebrow">Aloqa</span>
        <h1>Biz bilan <em>bog‘laning.</em></h1>
        <p class="contact-lead">Mahsulot, katalog yoki kompaniya haqida savolingiz bo‘lsa, ELMA jamoasi sizga yordam beradi.</p>
        <div class="contact-item"><span>Manzil</span><p>O‘zbekiston, Toshkent shahri,<br>Yunusobod-6, Jumamasjid ko‘chasi</p></div>
        <div class="contact-item"><span>Ish tartibi</span><p>Dushanba — Shanba<br>09:00 — 17:00</p></div>
        <div class="contact-item"><span>ELMA call-center</span><a href="tel:+998712031515">+998 71 203 15 15</a></div>
        <div class="contact-item"><span>Email</span><a :href="`mailto:${store.company.email}`">{{store.company.email}}</a></div>
      </div>
      <div class="contact-form-card">
        <span class="eyebrow">Murojaat</span>
        <h2>Savolingizni <em>yozib qoldiring.</em></h2>
        <form @submit.prevent="submit">
          <div class="form-2"><input v-model="form.name" required placeholder="Ism*"><input v-model="form.company" placeholder="Kompaniya"></div>
          <div class="form-2"><input v-model="form.phone" required placeholder="+998 9* *** ** **"><input v-model="form.email" type="email" placeholder="Email"></div>
          <textarea v-model="form.message" required rows="5" placeholder="Xabar"></textarea>
          <button class="btn btn-dark" :disabled="sent">{{sent?'Yuborildi ✓':'Yuborish →'}}</button>
        </form>
      </div>
    </div>
  </section>
</div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '../stores/main'
const store=useMainStore()
const sent=ref(false)
const form=reactive({name:'',company:'',phone:'',email:'',message:''})
function submit(){
  store.addInquiry({...form})
  sent.value=true
  Object.assign(form,{name:'',company:'',phone:'',email:'',message:''})
  setTimeout(()=>sent.value=false,2500)
}
</script>
