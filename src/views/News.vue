<template>
<div class="page"><div class="page-hero"><div class="container"><span class="eyebrow">Media</span><h1>ELMA <em>yangiliklari.</em></h1><p>Mahsulotlar, kompaniya va gigiyena olamidagi yangiliklar.</p></div></div>
<section class="section"><div class="container news-list"><article v-for="n in store.news" :key="n.id" class="news-large"><div class="news-number">0{{n.id}}</div><div><div class="news-date">{{formatDate(n.date)}}</div><h2>{{n.title}}</h2><p>{{n.text}}</p><a href="#" @click.prevent>To‘liq o‘qish →</a></div></article></div></section></div>
</template>
<script setup>
import { useMainStore } from '../stores/main'
const store=useMainStore()
const formatDate=(d)=>new Date(d).toLocaleDateString('uz-UZ',{day:'2-digit',month:'long',year:'numeric'})
</script>
