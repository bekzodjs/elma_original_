<template>
  <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">×</button>

      <!-- SUCCESS -->
      <Transition name="success">
        <div v-if="done" class="success-box">
          <div class="success-icon">
            ✓
          </div>

          <div class="success-content">
            <h3>Muvaffaqiyatli!</h3>
            <p>
              Arizangiz qabul qilindi. Tez orada menejerimiz
              siz bilan bog‘lanadi.
            </p>
          </div>
        </div>
      </Transition>

      <!-- FORM -->
      <div v-if="!done">
        <span class="eyebrow">ELMA</span>
        <h2>Hamkorlik uchun ariza</h2>
        <p>
          Ma’lumotlaringizni qoldiring, menejerimiz siz bilan bog‘lanadi.
        </p>

        <form @submit.prevent="submit">
          <input
            v-model="form.name"
            required
            placeholder="Ism *"
          >

          <input
            v-model="form.company"
            placeholder="Kompaniya"
          >

          <input
            v-model="form.phone"
            required
            placeholder="+998 90 123 45 67 *"
          >

          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Xabaringiz"
          ></textarea>

          <button class="btn btn-primary wide">
            Ariza yuborish →
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '../stores/main'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const store = useMainStore()
const done = ref(false)

const form = reactive({
  name: '',
  company: '',
  phone: '',
  message: ''
})

function submit() {
  store.addInquiry({ ...form })

  done.value = true

  setTimeout(() => {
    done.value = false
    emit('close')

    form.name = ''
    form.company = ''
    form.phone = ''
    form.message = ''
  }, 2500)
}
</script>

<style scoped>
.success-box {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px;
  margin-bottom: 25px;
  border-radius: 18px;

  background: linear-gradient(
    135deg,
    #ecfdf5,
    #f0fdf4
  );

  border: 1px solid #bbf7d0;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.12);
}

.success-icon {
  width: 54px;
  height: 54px;
  min-width: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #22c55e;
  color: white;

  font-size: 28px;
  font-weight: 700;

  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
}

.success-content h3 {
  margin: 0 0 5px;
  font-size: 20px;
  font-weight: 700;
  color: #166534;
}

.success-content p {
  margin: 0;
  color: #15803d;
  font-size: 14px;
  line-height: 1.5;
}

/* Animation */
.success-enter-active,
.success-leave-active {
  transition: all 0.35s ease;
}

.success-enter-from,
.success-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.97);
}
</style>