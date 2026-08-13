<template>
  <article class="product-card reference-card">

    <RouterLink
      :to="`/product/${product.id}`"
      class="product-image"
    >

      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="real-product-image"
      />

      <div v-else class="no-image">
        Rasm mavjud emas
      </div>

      <span class="badge">
        {{ product.badge }}
      </span>
  
      <div class="product-hover-mask">
        <div class="hover-content">
          <span>ELMA PRODUCT</span>
          <strong>Batafsil ko‘rish</strong>
          <i>↗</i>
        </div>
      </div>

    </RouterLink>


    <div class="product-body">
      <small>{{ categoryName }}</small>
      <h3>{{ product.name }}</h3>
      <div class="spec-mini">
        <span>{{ product.size }}</span>
        <span>{{ product.layers }}</span>
      </div>
      <RouterLink
        :to="`/product/${product.id}`"
        class="product-link"
      >
        Batafsil <b>↗</b>
      </RouterLink>
    </div>
  </article>
</template>


<script setup>

import { computed } from 'vue'
import { categories } from '../data/data'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const categoryName = computed(() => {

  return (
    categories.find(
      c => c.id === props.product.category
    )?.title || 'ELMA'
  )

})

</script>


<style scoped>

.product-image {
  position: relative;
  display: block;

  width: 100%;
  height: 330px;

  overflow: hidden;

  border-radius: 20px;

  background: #f5f6f4;
}


.real-product-image {

  width: 100%;
  height: 100%;

  display: block;

  object-fit: contain;

  padding: 20px;

  transition: transform 0.5s ease;

}


.product-card:hover .real-product-image {

  transform: scale(1.05);

}


.no-image {

  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #f3f5f3;

  color: #16805a;

  font-size: 20px;
  font-weight: 800;

}


/* BADGE */

.badge {

  position: absolute;

  top: 16px;
  left: 16px;

  z-index: 3;

}


/* HOVER MASK */

.product-hover-mask {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(130, 20, 30, 0.72);
  opacity: 0;
  transition: opacity 0.3s ease;

}

.product-image:hover .product-hover-mask {
  opacity: 1;
}

.hover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  text-align: center;
}


.hover-content span {
  font-size: 12px;
  letter-spacing: 2px;
  opacity: .8;
}

.hover-content strong {
  font-size: 20px;

}


.hover-content i {

  font-size: 28px;

  font-style: normal;

}


/* BODY */

.product-body {

  padding: 18px 4px;

}


.product-body h3 {

  margin: 7px 0 12px;

}


.spec-mini {

  display: flex;

  gap: 8px;

}


</style>