<template>
<div class="admin-shell">
 <aside class="admin-side"><RouterLink to="/" class="admin-brand">ELMA <small>CONTROL</small></RouterLink><button v-for="x in tabs" :key="x.id" :class="{active:tab===x.id}" @click="tab=x.id">{{x.icon}} {{x.label}}</button><div class="admin-side-bottom"><button @click="store.toggleTheme">◐ {{store.isDark?'Light':'Dark'}} mode</button><button @click="logout">↪ Chiqish</button></div></aside>
 <section class="admin-main">
  <header class="admin-top"><div><span class="eyebrow">Dashboard</span><h1>{{tabs.find(x=>x.id===tab)?.label}}</h1></div><RouterLink to="/" class="btn btn-light">Saytni ko‘rish ↗</RouterLink></header>
  <div v-if="tab==='dashboard'">
   <div class="admin-stats"><div><span>Mahsulotlar</span><b>{{store.products.length}}</b><small>↑ katalog</small></div><div><span>Kategoriyalar</span><b>4</b><small>faol</small></div><div><span>Murojaatlar</span><b>{{store.inquiries.length}}</b><small>jami</small></div><div><span>Yangiliklar</span><b>{{store.news.length}}</b><small>published</small></div></div>
   <div class="admin-panels"><div class="panel"><h3>So‘nggi murojaatlar</h3><div v-if="store.inquiries.length" class="admin-list"><div v-for="i in store.inquiries.slice(0,5)" :key="i.id"><b>{{i.name}}</b><span>{{i.phone}} · {{i.company||'Kompaniya ko‘rsatilmagan'}}</span></div></div><div v-else class="empty-mini">Hozircha murojaatlar yo‘q.</div></div><div class="panel"><h3>Tezkor amallar</h3><button class="quick" @click="tab='products'">＋ Mahsulot qo‘shish</button><button class="quick" @click="tab='news'">＋ Yangilik qo‘shish</button><RouterLink to="/catalog" class="quick">↗ Katalogni ko‘rish</RouterLink></div></div>
  </div>
  <div v-if="tab==='products'" class="panel"><div class="panel-head"><h3>Mahsulotlar</h3><button class="btn btn-primary" @click="newProduct">＋ Qo‘shish</button></div><div class="admin-table"><div class="tr th"><span>Mahsulot</span><span>Artikul</span><span>Kategoriya</span><span>Amal</span></div><div v-for="p in store.products" :key="p.id" class="tr"><span><b>{{p.name}}</b><small>{{p.qty}} · {{p.size}}</small></span><span>#{{p.id}}</span><span>{{categoryName(p.category)}}</span><span class="row-actions"><button @click="editProduct(p)">Tahrir</button><button @click="store.deleteProduct(p.id)" class="danger">O‘chir</button></span></div></div></div>
  <div v-if="tab==='news'" class="panel"><div class="panel-head"><h3>Yangiliklar</h3><button class="btn btn-primary" @click="addNews">＋ Qo‘shish</button></div><div class="admin-table"><div v-for="n in store.news" :key="n.id" class="tr"><span><b>{{n.title}}</b><small>{{n.date}}</small></span><span class="row-actions"><button @click="store.deleteNews(n.id)" class="danger">O‘chir</button></span></div></div></div>
  <div v-if="tab==='inquiries'" class="panel"><div class="panel-head"><h3>Murojaatlar</h3></div><div class="admin-table"><div v-for="i in store.inquiries" :key="i.id" class="tr"><span><b>{{i.name}}</b><small>{{i.message||'Xabar yo‘q'}}</small></span><span>{{i.company||'—'}}</span><span><a :href="`tel:${i.phone}`">{{i.phone}}</a></span></div><div v-if="!store.inquiries.length" class="empty-mini">Murojaatlar yo‘q.</div></div></div>
  <div v-if="tab==='settings'" class="panel settings">
   <h3>Kompaniya va sayt sozlamalari</h3>
   <div class="settings-section"><h4>Frontend aloqa ma’lumotlari</h4>
     <label>Kompaniya emaili<input v-model="store.company.email" type="email" placeholder="sales@elma.uz"></label>
     <label>Call-center<input v-model="store.company.phone" placeholder="+998 71 203 15 15"></label>
     <label>Manzil<textarea v-model="store.company.address" rows="3"></textarea></label>
     <label>Ish vaqti<input v-model="store.company.worktime" placeholder="Dushanba — Shanba, 09:00 — 17:00"></label>
     <button class="btn btn-primary" @click="store.saveCompany();savedSettings=true">Saqlash ✓</button>
     <span v-if="savedSettings" class="save-ok">Saqlandi</span>
   </div>
   <div class="settings-section"><h4>Interfeys</h4>
     <label>Til <select :value="store.lang" @change="store.setLang($event.target.value)"><option value="uz">O‘zbekcha</option><option value="ru">Русский</option></select></label>
     <label>Tema <button class="btn btn-light" @click="store.toggleTheme">{{store.isDark?'Dark':'Light'}} mode</button></label>
   </div>
   <p class="admin-note">Kompaniya emaili va aloqa ma’lumotlari frontenddagi Aloqa sahifasida ham ishlatiladi. Demo versiyada ma’lumotlar browser localStorage’da saqlanadi.</p>
 </div>
 </section>
 <div v-if="modal" class="modal-backdrop" @click.self="modal=null"><div class="modal admin-modal"><button class="modal-close" @click="modal=null">×</button><span class="eyebrow">ADMIN CRUD</span><h2>{{editing?'Mahsulotni tahrirlash':'Yangi mahsulot'}}</h2><form @submit.prevent="saveProduct"><input v-model="form.name" required placeholder="Mahsulot nomi"><select v-model="form.category"><option value="paper">Qog‘oz mahsulotlari</option><option value="wet">Nam salfetkalar</option><option value="universal">Universal salfetkalar</option><option value="dispensers">Dispenserlar</option></select><div class="form-2"><input v-model="form.qty" placeholder="Miqdor"><input v-model="form.size" placeholder="O‘lcham"></div><div class="form-2"><input v-model="form.material" placeholder="Tarkibi"><input v-model="form.layers" placeholder="Qatlam"></div><input v-model="form.badge" placeholder="Badge"><button class="btn btn-primary wide">Saqlash</button></form></div></div>
</div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../data/data'
import { useMainStore } from '../stores/main'
const store=useMainStore(),router=useRouter()
const tabs=[{id:'dashboard',label:'Dashboard',icon:'▦'},{id:'products',label:'Mahsulotlar',icon:'□'},{id:'news',label:'Yangiliklar',icon:'✦'},{id:'inquiries',label:'Murojaatlar',icon:'✉'},{id:'settings',label:'Sozlamalar',icon:'⚙'}]
const tab=ref('dashboard'),modal=ref(null),editing=ref(false),savedSettings=ref(false)
const blank=()=>({id:'',name:'',category:'paper',qty:'100 dona',size:'19 × 18 sm',material:'100% sellyuloza',layers:'2 qatlam',badge:'Yangi',color:'mint'})
const form=reactive(blank())
const categoryName=id=>categories.find(c=>c.id===id)?.title||id
function newProduct(){Object.assign(form,blank());editing.value=false;modal.value=true}
function editProduct(p){Object.assign(form,p);editing.value=true;modal.value=true}
function saveProduct(){editing.value?store.updateProduct({...form}):store.addProduct({...form});modal.value=null}
function addNews(){store.addNews({title:'Yangi ELMA yangiligi',date:new Date().toISOString().slice(0,10),text:'Yangilik matnini admin paneldan tahrirlash mumkin.'})}
function logout(){localStorage.removeItem('elma_admin');router.push('/admin/login')}
</script>
