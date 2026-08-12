<template>
<div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
  <div class="modal">
    <button class="modal-close" @click="$emit('close')">×</button>
    <span class="eyebrow">ELMA</span><h2>Hamkorlik uchun ariza</h2><p>Ma’lumotlaringizni qoldiring, menejerimiz siz bilan bog‘lanadi.</p>
    <form @submit.prevent="submit">
      <input v-model="form.name" required placeholder="Ism *">
      <input v-model="form.company" placeholder="Kompaniya">
      <input v-model="form.phone" required placeholder="+998 90 123 45 67 *">
      <textarea v-model="form.message" rows="4" placeholder="Xabaringiz"></textarea>
      <button class="btn btn-primary wide">Ariza yuborish →</button>
    </form>
    <div v-if="done" class="success">✓ Arizangiz qabul qilindi. Tez orada bog‘lanamiz.</div>
  </div>
</div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '../stores/main'
defineProps({show:Boolean}); const emit=defineEmits(['close'])
const store=useMainStore(); const done=ref(false)
const form=reactive({name:'',company:'',phone:'',message:''})
function submit(){store.addInquiry({...form}); done.value=true; setTimeout(()=>{done.value=false; emit('close')},1800)}
</script>
