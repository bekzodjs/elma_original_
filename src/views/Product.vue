<template>
  <div class="page">

    <div v-if="product" class="container product-detail">

      <!-- Breadcrumb -->
      <div class="breadcrumbs">
        <RouterLink to="/catalog">Katalog</RouterLink>
        /
        <span>{{ product.name }}</span>
      </div>

      <div class="detail-grid">

        <!-- PRODUCT IMAGE -->
        <div class="detail-visual">

          <div class="detail-image-box">

            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="detail-product-image"
            />

            <div v-else class="detail-no-image">
              ELMA
            </div>

            <span class="detail-badge">
              {{ product.badge }}
            </span>

          </div>

        </div>


        <!-- PRODUCT INFORMATION -->
        <div class="detail-copy">

          <span class="badge">
            {{ product.badge }}
          </span>

          <span class="eyebrow">
            Artikul {{ product.id }}
          </span>

          <h1>
            {{ product.name }}
          </h1>

          <!-- PRODUCT DESCRIPTION -->
          <p class="detail-description">
            {{ product.description || defaultDescription }}
          </p>


          <!-- SPECS -->
          <div class="spec-table">

            <div>
              <span>Miqdor</span>
              <b>{{ product.qty }}</b>
            </div>

            <div>
              <span>O‘lcham</span>
              <b>{{ product.size }}</b>
            </div>

            <div>
              <span>Tarkibi</span>
              <b>{{ product.material }}</b>
            </div>

            <div>
              <span>Qatlam</span>
              <b>{{ product.layers }}</b>
            </div>

          </div>


          <!-- BUTTON -->
          <RouterLink
            to="/contact"
            class="btn btn-primary"
          >
            Narx va aloqa →
          </RouterLink>

        </div>

      </div>


      <!-- PRODUCT DESCRIPTION -->
      <section class="product-about">

        <div class="eyebrow">
          Mahsulot haqida
        </div>

        <h2>
          {{ product.name }}
        </h2>

        <p>
          {{ product.description || defaultDescription }}
        </p>

      </section>


      <!-- RELATED PRODUCTS -->
      <section class="section related">

        <div class="section-head">

          <div>
            <span class="eyebrow">
              Sizga yoqishi mumkin
            </span>

            <h2>
              O‘xshash <em>mahsulotlar.</em>
            </h2>
          </div>

        </div>

        <div class="product-grid">

          <ProductCard
            v-for="p in related"
            :key="p.id"
            :product="p"
          />

        </div>

      </section>

    </div>


    <!-- PRODUCT NOT FOUND -->
    <div
      v-else
      class="container empty"
    >
      <h2>Mahsulot topilmadi</h2>

      <RouterLink
        to="/catalog"
        class="btn btn-primary"
      >
        Katalogga qaytish
      </RouterLink>
    </div>

  </div>
</template>


<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useMainStore } from '../stores/main'
import ProductCard from '../components/ProductCard.vue'


const store = useMainStore()
const route = useRoute()


/*
|--------------------------------------------------------------------------
| PRODUCT
|--------------------------------------------------------------------------
*/

const product = computed(() => {

  return store.products.find(
    p => String(p.id) === String(route.params.id)
  )

})


/*
|--------------------------------------------------------------------------
| RELATED PRODUCTS
|--------------------------------------------------------------------------
*/

const related = computed(() => {

  if (!product.value) {
    return []
  }

  return store.products
    .filter(
      p =>
        p.category === product.value.category &&
        String(p.id) !== String(product.value.id)
    )
    .slice(0, 4)

})


/*
|--------------------------------------------------------------------------
| DEFAULT DESCRIPTION
|--------------------------------------------------------------------------
*/

const defaultDescription =
  'ELMA sifat standartlariga mos, kundalik foydalanish uchun ishlab chiqilgan professional mahsulot. Qulay, ishonchli va gigiyenik.'

</script>


<style scoped>

.detail-image-box {

  position: relative;

  width: 100%;
  min-height: 560px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f7f8f6;

  border-radius: 28px;

  overflow: hidden;

}


.detail-product-image {

  width: 100%;
  height: 560px;

  object-fit: contain;

  padding: 45px;

  display: block;

  transition: transform .5s ease;

}


.detail-image-box:hover
.detail-product-image {

  transform: scale(1.04);

}


.detail-badge {

  position: absolute;

  top: 24px;
  left: 24px;

  padding: 9px 15px;

  border-radius: 30px;

  background: #ffffff;

  color: #18825b;

  font-size: 12px;

  font-weight: 800;

  box-shadow: 0 8px 25px rgba(0,0,0,.08);

}


.detail-no-image {

  width: 100%;
  height: 560px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #f0f2ef;

  color: #17835a;

  font-size: 60px;

  font-weight: 900;

}


.product-about {

  margin-top: 90px;

  padding: 55px;

  background: #f7f8f6;

  border-radius: 28px;

  max-width: 1000px;

}


.product-about h2 {

  margin: 10px 0 18px;

  font-size: 36px;

}


.product-about p {

  max-width: 800px;

  color: #59645e;

  font-size: 17px;

  line-height: 1.8;

}


.detail-description {

  font-size: 17px;

  line-height: 1.8;

  color: #59645e;

}


@media (max-width: 800px) {

  .detail-image-box {

    min-height: 400px;

  }

  .detail-product-image {

    height: 400px;

    padding: 25px;

  }

  .product-about {

    padding: 30px;

    margin-top: 50px;

  }

}

</style>