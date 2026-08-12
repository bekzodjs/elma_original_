<template>
<div class="admin-login"><div class="login-card"><RouterLink to="/" class="logo center">ELMA<small>ADMIN</small></RouterLink><span class="eyebrow">CONTROL CENTER</span><h1>Admin panel</h1><p>Mahsulot va murojaatlarni boshqaring.</p><form @submit.prevent="login"><label>Login<input v-model="loginName" required placeholder="admin"></label><label>Parol<input v-model="password" type="password" required placeholder="••••••••"></label><div v-if="error" class="error">{{error}}</div><button class="btn btn-primary wide">Kirish →</button></form><small class="hint">Demo: admin / admin123</small></div></div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router=useRouter(),loginName=ref(''),password=ref(''),error=ref('')
function login(){if(loginName.value==='admin'&&password.value==='admin123'){localStorage.setItem('elma_admin','1');router.push('/admin')}else error.value='Login yoki parol noto‘g‘ri.'}
</script>
