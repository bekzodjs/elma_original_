import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products as seedProducts, news as seedNews } from '../data/data'

export const useMainStore = defineStore('main', () => {
  const lang = ref(localStorage.getItem('elma_lang') || 'uz')
  const theme = ref(localStorage.getItem('elma_theme') || 'light')
  const storedProducts = JSON.parse(localStorage.getItem('elma_products') || 'null')
  const products = ref(storedProducts && storedProducts.length >= seedProducts.length ? storedProducts : seedProducts)
  const news = ref(JSON.parse(localStorage.getItem('elma_news') || 'null') || seedNews)
  const inquiries = ref(JSON.parse(localStorage.getItem('elma_inquiries') || '[]'))
  const search = ref('')
  const company = ref(JSON.parse(localStorage.getItem('elma_company') || 'null') || {
    email: 'sales@elma.uz',
    phone: '+998 71 203 15 15',
    address: 'Toshkent shahri, Yunusobod-6, Jumamasjid ko‘chasi',
    worktime: 'Dushanba — Shanba, 09:00 — 17:00'
  })

  const isDark = computed(() => theme.value === 'dark')
  function setLang(v){ lang.value=v; localStorage.setItem('elma_lang',v); document.documentElement.lang=v }
  function toggleTheme(){ theme.value=isDark.value?'light':'dark'; localStorage.setItem('elma_theme',theme.value) }
  function saveProducts(){ localStorage.setItem('elma_products', JSON.stringify(products.value)) }
  function saveNews(){ localStorage.setItem('elma_news', JSON.stringify(news.value)) }
  function saveCompany(){ localStorage.setItem('elma_company', JSON.stringify(company.value)) }
  function addProduct(p){ products.value.unshift({...p,id:String(Date.now()).slice(-5)}); saveProducts() }
  function updateProduct(p){ const i=products.value.findIndex(x=>x.id===p.id); if(i>-1) products.value[i]=p; saveProducts() }
  function deleteProduct(id){ products.value=products.value.filter(x=>x.id!==id); saveProducts() }
  function addNews(n){ news.value.unshift({...n,id:Date.now()}); saveNews() }
  function deleteNews(id){ news.value=news.value.filter(x=>x.id!==id); saveNews() }
  function addInquiry(form){ inquiries.value.unshift({...form,id:Date.now(),createdAt:new Date().toISOString()}); localStorage.setItem('elma_inquiries',JSON.stringify(inquiries.value)) }
  return {lang,theme,isDark,products,news,inquiries,search,company,setLang,toggleTheme,addProduct,updateProduct,deleteProduct,addNews,deleteNews,addInquiry,saveCompany}
})
